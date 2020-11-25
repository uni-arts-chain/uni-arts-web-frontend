import { CHAIN_DEFAULT_CONFIG, RPC_DEFAULT_CONFIG } from "@/config";
import { ApiPromise, WsProvider } from "@polkadot/api";
class Rpc {
    constructor({ url, port }) {
        this.api = new ApiPromise({
            provider: new WsProvider(`ws://${url}:${port}`),
            ...RPC_DEFAULT_CONFIG,
        });
        this.apiConnectedListener = () => {};
        this.apiReadyListener = () => {};
        this.apiDisconnectedListener = () => {};
        this.apiErrorListener = () => {};
        this.setListener();
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
