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
        return {
            aa: 1,
        };
    },
    created() {
        this.$rpc.api.isReady.then(() => {
            this.initChainInfo();
        });
        this.$extension
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
            this.$store.dispatch("art/GetCategories");
            this.$store.dispatch("art/GetThemes");
            this.$store.dispatch("art/GetMaterials");
        },
        async initChainInfo() {
            let specVersion = await this.$rpc.api.runtimeVersion.specVersion;
            let properties = await this.$rpc.api.rpc.system.properties();
            let object = {};
            [...properties].forEach((v) => {
                let key_value = v.toString().split(",");
                object[key_value[0]] = key_value[1];
            });
            this.$store.dispatch("global/SetChain", {
                specVersion: specVersion.toString(),
                ...object,
            });
            let result = await this.$rpc.api.query.system.account(
                this.$store.state.user.info.address
            );
            console.log(this.$store.state.user.info.address);
            console.log(result.data.free.toString());
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
