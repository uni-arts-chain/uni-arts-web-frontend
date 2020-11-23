/** * Created by Lay Hunt on 2020-11-17 18:22:12. */
<template>
    <nav>
        <div class="container">
            <div class="logo" @click="goHome">Uniarts</div>
            <ul class="link-group">
                <li><router-link to="/">Homepage</router-link></li>
                <li><router-link to="/market">Market</router-link></li>
                <li><router-link to="/artist">Artist</router-link></li>
                <li><router-link to="/account">Account</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "navbar",
    methods: {
        goHome() {
            if (this.$route.path !== "/") {
                this.$router.push("/");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
nav {
    min-height: 91px;
}
.logo {
    font-family: "Broadway";
    font-size: 34px;
    font-weight: 400;
    cursor: pointer;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 33px;
    padding-bottom: 33px;
    height: 91px;
}

ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
        padding-left: 23px;
        padding-right: 23px;
        font-size: 16px;
    }
    li:last-child {
        padding-right: 0px;
    }
}
</style>
