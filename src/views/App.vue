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
import { web3Enable } from "@polkadot/extension-dapp";

export default {
    components: { Navbar, Footer },
    name: "App",
    data() {
        return { visible: false };
    },
    created() {
        this.author();
    },
    methods: {
        author() {
            web3Enable("Uniarts").then((res) => {
                if (res.length <= 0) {
                    this.$uniAlert.show("NeedPlugin");
                }
            });
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
