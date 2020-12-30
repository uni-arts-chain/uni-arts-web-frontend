import { RPC_DEFAULT_CONFIG } from "@/config";
import { CHAIN_DEFAULT_CONFIG } from "@/config";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { TypeRegistry } from "@polkadot/types";

import Detect from "@/plugins/detect";
import Alert from "@/components/Alert";
class Rpc {
    constructor({ url, port, protocol }) {
        const { types, typesBundle, typesChain, typesSpec } = {
            ...RPC_DEFAULT_CONFIG,
        };
        this.registry = new TypeRegistry();
        this.ss58Format = 42;
        this.api = new ApiPromise({
            provider: new WsProvider(
                `${protocol}://${url}${port ? ":" + port : ""}`
            ),
            registry: this.registry,
            types,
            typesBundle,
            typesChain,
            typesSpec,
        });
        this.apiConnectedListener = () => {};
        this.apiReadyListener = () => {};
        this.apiDisconnectedListener = () => {};
        this.apiErrorListener = () => {};
        this.setListener();
        this.initDetect();
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
            this.registry.setChainProperties(
                this.registry.createType("ChainProperties", {
                    ss58Format: this.ss58Format,
                })
            );
            this.apiDisconnectedListener();
        });
        this.api.on("error", () => {
            console.log("RPC连接出错");
            this.apiErrorListener();
        });
    }
    initDetect() {
        if (
            Detect.browser.name !== "Chrome" &&
            Detect.browser.name !== "Firefox"
        ) {
            Alert.show("NeedBrowser");
            return;
        }
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
