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

export default {
    components: { Navbar, Footer },
    name: "App",
    data() {
        return {};
    },
    created() {
        this.$rpc.api.isReady.then((res) => {
            console.log(res.genesisHash.toHex());
        });
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
