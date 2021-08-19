/** * Created by Lay Hunt on 2020-11-17 18:22:12. */
<template>
    <nav :class="theme">
        <div class="container">
            <div class="menuList mobile" @click="() => (leftMenu = true)">
                <div class="menuListIcon"></div>
                <div class="menuListIcon"></div>
                <div class="menuListIcon"></div>
            </div>
            <div
                v-if="user.token"
                class="mobile menuItem"
                @click="() => (rightMenu = true)"
            >
                <img
                    v-if="user.avatar && user.avatar.url"
                    :src="user.avatar ? user.avatar.url : ''"
                    style="width: 24px; height: 24px; border-radius: 50%"
                />
                <img
                    v-else
                    src="@/assets/images/yin@2x.png"
                    style="
                        width: 24px;
                        height: 24px;
                        border: 1px solid black;
                        border-radius: 50%;
                    "
                />
            </div>
            <div v-if="!user.token" class="li-login mobile menuItem">
                <router-link class="login" to="/login">
                    <img
                        v-if="theme === 'light'"
                        src="@/assets/images/profile@2x.png"
                    />
                    <img v-else src="@/assets/images/profile1@2x.png" />
                </router-link>
            </div>
            <div class="li-search mobile menuItem2">
                <router-link class="market" to="/market">
                    <img
                        v-if="theme === 'light'"
                        src="@/assets/images/search@2x.png"
                    />
                    <img v-else src="@/assets/images/search1@2x.png" />
                </router-link>
            </div>
            <div class="logo" @click="goHome"></div>
            <ul class="link-group">
                <li>
                    <router-link :class="{ active: activeTab == 'Home' }" to="/"
                        >Homepage
                    </router-link>
                </li>
                <li>
                    <router-link
                        :class="{ active: activeTab == 'Market' }"
                        to="/market"
                        >Market
                    </router-link>
                </li>
                <li>
                    <router-link
                        :class="{ active: activeTab == 'BlindBox' }"
                        to="/blindbox"
                        >Mystery Box
                    </router-link>
                </li>
                <li>
                    <router-link
                        :class="{ active: activeTab == 'Artist' }"
                        to="/artist"
                        >Artist
                    </router-link>
                </li>
                <li>
                    <router-link
                        :class="{ active: activeTab == 'Authority' }"
                        to="/authority"
                        >Authority
                    </router-link>
                </li>
                <li class="li-search">
                    <router-link class="market" to="/market">
                        <img
                            v-if="theme == 'light'"
                            src="@/assets/images/search@2x.png"
                        />
                        <img v-else src="@/assets/images/search1@2x.png" />
                    </router-link>
                </li>
                <li v-if="user.token">
                    <router-link
                        :class="{ active: activeTab == 'Account' }"
                        class="info"
                        to="/account"
                    >
                        <img
                            v-if="user.avatar && user.avatar.url"
                            :src="user.avatar ? user.avatar.url : ''"
                            style="
                                width: 24px;
                                height: 24px;
                                border-radius: 50%;
                            "
                        />
                        <img
                            v-else
                            src="@/assets/images/yin@2x.png"
                            style="
                                width: 24px;
                                height: 24px;
                                border: 1px solid black;
                                border-radius: 50%;
                            "
                        />
                    </router-link>
                </li>
                <li v-if="!user.token" class="li-login">
                    <router-link class="login" to="/login">
                        <img
                            v-if="theme === 'light'"
                            src="@/assets/images/profile@2x.png"
                        />
                        <img v-else src="@/assets/images/profile1@2x.png" />
                    </router-link>
                </li>
            </ul>
        </div>
        <el-drawer
            size="50%"
            title="MENU"
            :visible.sync="leftMenu"
            direction="ltr"
        >
            <div class="mobile-menu">
                <router-link
                    :class="{ active: activeTab === 'Home' }"
                    to="/"
                    @click="closeMenu"
                    >Homepage
                </router-link>
            </div>
            <div class="mobile-menu">
                <router-link
                    @click="closeMenu"
                    :class="{ active: activeTab === 'Market' }"
                    to="/market"
                    >Market
                </router-link>
            </div>
            <div class="mobile-menu">
                <router-link
                    @click="closeMenu"
                    :class="{ active: activeTab === 'BlindBox' }"
                    to="/blindbox"
                    >Mystery Box
                </router-link>
            </div>
            <div class="mobile-menu">
                <router-link
                    @click="closeMenu"
                    :class="{ active: activeTab === 'Artist' }"
                    to="/artist"
                    >Artist
                </router-link>
            </div>
            <div class="mobile-menu">
                <router-link
                    @click="closeMenu"
                    :class="{ active: activeTab === 'Authority' }"
                    to="/authority"
                    >Authority
                </router-link>
            </div>
        </el-drawer>
        <el-drawer
            size="60%"
            title="MINE"
            :visible.sync="rightMenu"
            direction="rtl"
        >
            <div class="mobile-menu">
                <router-link to="/account">My</router-link>
            </div>
            <div class="mobile-menu">
                <router-link to="/account/profile"
                    >Personal account</router-link
                >
            </div>
            <div class="mobile-menu">
                <router-link to="/account/following">Following</router-link>
            </div>
            <div class="mobile-menu">
                <router-link to="/account/followers">Followers</router-link>
            </div>
            <div class="mobile-menu">
                <router-link to="/account/collection">Collection</router-link>
            </div>
            <div class="mobile-menu">
                <router-link to="/account/purchase">Purchase Order</router-link>
            </div>
            <div class="mobile-menu">
                <router-link to="/account/sold">Sold Order</router-link>
            </div>
            <div class="mobile-menu">
                <router-link to="/account">Receiving Address</router-link>
            </div>
            <div class="mobile-menu">
                <router-link to="/certificate/apply"
                    >Certificate Authority</router-link
                >
            </div>
            <div
                style="
                    border-radius: 25px;
                    background-color: black;
                    color: white;
                    padding: 7px;
                    margin: 0 15px;
                "
                class="mobile-menu"
            >
                <router-link to="/account/upload"> Upload Works </router-link>
            </div>
        </el-drawer>
    </nav>
</template>

<script>
export default {
    name: "navbar",
    data() {
        return {
            leftMenu: false,
            rightMenu: false,
        };
    },
    computed: {
        theme() {
            return this.$store.state.global.theme;
        },
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
                case "BlindBox":
                    routeName = "BlindBox";
                    break;
                case "Authority":
                    routeName = "Authority";
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
        closeMenu() {
            this.leftMenu = false;
            this.rightMenu = false;
        },
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
    @media screen and (max-width: 970px) {
        min-height: 51px;
    }
    min-height: 91px;
}

nav.dark {
    background-color: black;

    ul li > a {
        color: white;
    }
}

.menuList {
    @media screen and (min-width: 970px) {
        display: none;
    }
    position: absolute;
    width: 50px;
    height: 50px;
    display: flex;
    flex-direction: column;
    padding: 13px;

    .menuListIcon {
        flex: 1;
        margin-top: 10%;
        margin-bottom: 10%;
        background-color: #000000;
    }
}

.logo {
    @media screen and (max-width: 970px) {
        width: 100%;
        background-position: center;
        height: 100%;
        background-size: 55% auto;
    }
    font-family: "Broadway";
    font-size: 34px;
    font-weight: 400;
    width: 302px;
    height: 170px;
    cursor: pointer;
    background-image: url(~@/assets/images/logo.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
}

.container {
    @media screen and (max-width: 970px) {
        padding-top: 13px;
        padding-bottom: 13px;
        height: 51px;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 33px;
    padding-bottom: 33px;
    height: 91px;
}

ul {
    @media screen and (max-width: 970px) {
        display: none;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
        padding-left: 18px;
        padding-right: 18px;
        font-size: 16px;

        .active {
            font-weight: 600;
            color: black;
        }

        > a {
            color: #4d4d4d;
            display: block;
            min-width: 70px;
        }

        > a.info,
        > a.market {
            width: 24px;
            height: 24px;
        }
    }

    li:last-child {
        padding-right: 0px;
    }
}

.login,
.market,
.register {
    display: block;
    color: white;
    /* background-color: #c61e1e; */
    /* border: 1px solid rgba(194, 96, 96, 0.537); */
    height: 22px;
    cursor: pointer;
    font-size: 0.875rem;
    box-shadow: 0 0 10px 0px rgba(194, 96, 96, 0.07);
    border-radius: 15px;
    text-transform: uppercase;

    img {
        height: 22px;
    }
}

.register {
    /* background-color: #c61e1e; */
    color: white;
}

.li-search {
    width: 68px;
    height: 21px;

    .market > img {
        width: 21px;
        height: 21px;
    }
}

.li-login,
.li-search {
    padding-right: 10px;
}

.li-register {
    padding-left: 10px;
}

.li-info .info {
    width: 24px;
    height: 24px;
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
.menuItem {
    position: absolute;
    right: 13px;
}
.menuItem2 {
    position: absolute;
    right: 40px;
}
.mobile-menu {
    font-size: 20px;
    margin-bottom: 30px;
}
</style>
