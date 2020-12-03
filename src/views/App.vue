<template>
    <div id="app">
        <Navbar class="navbar" />
        <main class="main">
            <router-view />
        </main>
        <Footer class="footer" />
    </div>
</template>

<script>
import Navbar from "@/views/Layout/Navbar.vue";
import Footer from "@/views/Layout/Footer.vue";
import extension from "@/plugins/extension";
// import { stringToHex } from '@polkadot/util';

export default {
    components: { Navbar, Footer },
    name: "App",
    data() {
        return {
            aa: 1,
        };
    },
    created() {
        this.$rpc.api.isReady.then(() => {
            console.log(this.$rpc.api.genesisHash.toHex());
        });
        extension
            .isReady()
            .then(() => {
                this.getAccounts();
            })
            .catch(() => {
                console.log(1);
            });
        // this.$http.globalGetCurrencies({}).then((res) => {
        //     console.log(res);
        // });
    },
    methods: {
        getAccounts() {
            // extension.web3Accounts().then((res) => {
            //     this.register(res[2]);
            // });
        },
    },
};
</script>

<style lang="scss">
@import "@/assets/styles/index.scss";

#app {
    text-align: center;
    color: #020202;
    min-height: 100%;
    display: flex;
    flex-direction: column;
}

.navbar,
.footer {
    flex: 0 0 auto;
}

.main {
    flex: 1 0 auto;
}
</style>
