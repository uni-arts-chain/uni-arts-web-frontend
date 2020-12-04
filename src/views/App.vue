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
                this.getInfo();
            })
            .catch(() => {
                console.log(1);
            });
    },
    methods: {
        getInfo() {
            if (this.$store.state.user.info.token) {
                this.$store.dispatch("user/GetInfo");
            }
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
