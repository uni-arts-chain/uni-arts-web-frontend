import {
    web3Enable,
    web3Accounts,
    web3FromAddress,
    web3UseRpcProvider,
    web3ListRpcProviders,
    web3FromSource,
    web3EnablePromise,
    web3AccountsSubscribe,
} from "@polkadot/extension-dapp";
import { stringToHex } from "@polkadot/util";
import { Notification } from "element-ui";
import Alert from "@/components/Alert";
import store from "@/store";
import { CHAIN_DEFAULT_CONFIG } from "@/config";

class Extension {
    constructor() {
        this.web3 = {};
        this.isConnect = false;
        this.web3FromAddress = () => {};
        this.web3FromSource = () => {};
        this.web3UseRpcProvider = {};
        this.web3ListRpcProviders = [];
    }
    async isReady() {
        if (web3EnablePromise && store.state.user.info.token) {
            this.web3 = (await web3EnablePromise)[0];
            this.isConnect = true;
        } else {
            let result = await web3Enable(CHAIN_DEFAULT_CONFIG.dappName);
            if (result.length <= 0) {
                Alert.show("NeedPlugin");
                store.dispatch("user/Quit");
                this.isConnect = false;
                return;
            } else {
                console.log("扩展初始化完成");
                this.isConnect = true;
                this.web3 = result[0];
                this.web3Accounts = web3Accounts;
                this.web3FromAddress = web3FromAddress;
                this.web3UseRpcProvider = web3UseRpcProvider;
                this.web3ListRpcProviders = web3ListRpcProviders;
                this.web3FromSource = web3FromSource;
                this.web3AccountsSubscribe = web3AccountsSubscribe;
                return;
            }
        }
    }
    async accounts() {
        await this.isReady();
        return await web3Accounts();
    }
    async sign(account, message) {
        const injector = await this.web3FromSource(account.meta.source);
        const signRaw = injector
            ? injector.signer
                ? injector.signer.signRaw
                : ""
            : "";
        // eslint-disable-next-line no-extra-boolean-cast
        if (!!signRaw) {
            console.log("address: ", account.address);
            console.log("data: ", message, stringToHex(message));
            console.log("type: ", "bytes");
            const { signature } = await signRaw({
                address: account.address,
                data: stringToHex(message),
                type: "bytes",
            });
            return signature;
        }
    }
    async signAndSend(address, extrinsic, cb, done, err) {
        let notifyIns = "";
        let isDone = false;
        const injector = await this.web3FromAddress(address);
        const unsub = await extrinsic
            .signAndSend(
                address,
                { signer: injector.signer },
                async ({ events = [], status }) => {
                    if (isDone) return;
                    if (status.isInBlock) {
                        console.log(
                            `Completed at block hash #${status.asInBlock.toString()}`
                        );
                        cb && (await cb());
                        notifyIns = Notification({
                            title: "Inbock",
                            message: "Waiting for confirmation",
                            duration: 0,
                            iconClass: "el-icon-loading",
                            showClose: false,
                        });
                    } else {
                        console.log(`Current status: ${status.type}`);
                        if (status.type == "Invalid") {
                            err && (await err());
                        }
                        // Loop through Vec<EventRecord> to display all events
                        if (status.isFinalized) {
                            events.forEach(
                                ({
                                    phase,
                                    event: { data, method, section },
                                }) => {
                                    console.log(
                                        `\t' ${phase}: ${section}.${method}:: ${data}`
                                    );
                                    if (method === "ExtrinsicSuccess") {
                                        notifyIns.close();
                                        done && done();
                                    } else if (method === "ExtrinsicFailed") {
                                        notifyIns.close();
                                        err && err();
                                    }
                                }
                            );
                            unsub();
                        }
                    }
                }
            )
            .catch(() => err && err());
        return () => {
            isDone = true;
            notifyIns && notifyIns.close();
            done && done();
        };
    }
}

export default new Extension();
