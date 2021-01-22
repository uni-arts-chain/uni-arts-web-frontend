/** * Created by Lay Hunt on 2020-11-17 18:22:12. */
<template>
    <nav>
        <div class="container">
            <div class="logo" @click="goHome">Uniarts</div>
            <ul class="link-group">
                <li>
                    <router-link to="/" :class="{ active: activeTab == 'Home' }"
                        >Homepage</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/market"
                        :class="{ active: activeTab == 'Market' }"
                        >Market</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/artist"
                        :class="{ active: activeTab == 'Artist' }"
                        >Artist</router-link
                    >
                </li>
                <li v-if="user.token" class="li-info">
                    <router-link
                        to="/account"
                        class="info"
                        :class="{ active: activeTab == 'Account' }"
                        >{{ user.address }}</router-link
                    >
                </li>
                <li class="li-login" v-if="!user.token">
                    <router-link to="/login" class="login">Login</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "navbar",
    computed: {
        user() {
            return this.$store.state.user.info;
        },
        activeTab() {
            let routeName = "";
            switch (this.$route.name) {
                case "Home":
                    routeName = "Home";
                    break;
                case "Market":
                    routeName = "Market";
                    break;
                case "ArtDetail":
                    routeName = "Art";
                    break;
                case "ArtistDetail":
                case "Artist":
                    routeName = "Artist";
                    break;
                case "AccountUpload":
                case "AccountProfile":
                case "AccountPurchase":
                case "AccountSold":
                case "Account":
                    routeName = "Account";
                    break;
            }

            return routeName;
        },
    },
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
        .active {
            font-weight: 600;
            color: black;
        }
        > a {
            color: #4d4d4d;
        }
    }
    li:last-child {
        padding-right: 0px;
    }
}

.login,
.register {
    color: white;
    background-color: #c61e1e;
    border: 1px solid rgba(194, 96, 96, 0.537);
    cursor: pointer;
    padding: 4px 8px;
    font-size: 0.875rem;
    box-shadow: 0 0 10px 0px rgba(194, 96, 96, 0.07);
    border-radius: 15px;
    text-transform: uppercase;
}

.register {
    background-color: #c61e1e;
    color: white;
}

.li-login {
    padding-right: 10px;
}
.li-register {
    padding-left: 10px;
}
.li-info .info {
    width: 200px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid rgba(194, 96, 96, 0.537);
    border-radius: 15px;
    color: #c61e1e;
    padding: 4px 10px;
    transition: all 0.3s ease;
}
.li-info .info:hover {
    border-color: #c61e1e;
}
</style>
