import { CHAIN_DEFAULT_CONFIG, RPC_DEFAULT_CONFIG } from "@/config";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Enable } from "@polkadot/extension-dapp";
import Detect from "@/plugins/detect";
import Alert from "@/components/Alert";
class Rpc {
    constructor({ url, port }) {
        this.api = new ApiPromise({
            provider: new WsProvider(`ws://${url}:${port}`),
            ...RPC_DEFAULT_CONFIG,
        });
        this.web3Extension = {
            web3: {},
            isReady: false,
        };
        this.apiConnectedListener = () => {};
        this.apiReadyListener = () => {};
        this.apiDisconnectedListener = () => {};
        this.apiErrorListener = () => {};
        this.setListener();
        this.initExtension();
    }
    setListener() {
        this.api.on("connected", () => {
            console.log("RPC已连接");
            this.apiConnectedListener();
        });
        this.api.on("disconnected", () => {
            console.log("RPC已断开");

            this.apiReadyListener();
        });
        this.api.on("ready", () => {
            console.log("RPC初始化完成");
            this.apiDisconnectedListener();
        });
        this.api.on("error", () => {
            console.log("RPC连接出错");
            this.apiErrorListener();
        });
    }
    initExtension() {
        if (
            Detect.browser.name !== "Chrome" &&
            Detect.browser.name !== "Firefox"
        ) {
            Alert.show("NeedBrowser");
            this.web3Extension.isReady = false;
            return;
        }
        web3Enable(CHAIN_DEFAULT_CONFIG.dappName).then((res) => {
            if (res.length <= 0) {
                this.web3Extension.isReady = false;
                Alert.show("NeedPlugin");
                return;
            }
            this.web3Extension.isReady = true;
        });
    }
    setConnectedListener(callback) {
        this.apiConnectedListener = callback;
    }
    setReadyListener(callback) {
        this.apiReadyListener = callback;
    }
    setDisconnectedListener(callback) {
        this.apiDisconnectedListener = callback;
    }
    setErrorListener(callback) {
        this.apiErrorListener = callback;
    }
}

export default new Rpc(CHAIN_DEFAULT_CONFIG);
