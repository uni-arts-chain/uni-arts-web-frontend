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
import Alert from "@/components/Alert";
import { CHAIN_DEFAULT_CONFIG } from "@/config";

class Extension {
    constructor() {
        this.web3 = {};
        this.web3Accounts = {};
        this.web3FromAddress = () => {};
        this.web3FromSource = () => {};
        this.web3UseRpcProvider = {};
        this.web3ListRpcProviders = [];
    }
    async isReady() {
        if (web3EnablePromise) {
            this.web3 = (await web3EnablePromise)[0];
        } else {
            let result = await web3Enable(CHAIN_DEFAULT_CONFIG.dappName);
            if (result.length <= 0) {
                Alert.show("NeedPlugin");
                return;
            } else {
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
    async signAndSend(account, extrinsic, cb) {
        const injector = await this.web3FromSource(account.meta.source);
        extrinsic
            .signAndSend(
                account.address,
                { signer: injector.signer },
                ({ events = [], status }) => {
                    if (status.isInBlock) {
                        console.log(
                            `Completed at block hash #${status.asInBlock.toString()}`
                        );
                        cb && cb();
                    } else {
                        console.log(`Current status: ${status.type}`);
                        // Loop through Vec<EventRecord> to display all events
                        events.forEach(
                            ({ phase, event: { data, method, section } }) => {
                                console.log(
                                    `\t' ${phase}: ${section}.${method}:: ${data}`
                                );
                            }
                        );
                    }
                }
            )
            .catch((error) => {
                console.log(":( transaction failed", error);
            });
    }
}

export default new Extension();
