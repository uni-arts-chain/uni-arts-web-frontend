/** * Created by Lay Hunt on 2020-11-18 09:55:47. */
<template>
    <div class="index">
        <div class="container">
            <div class="header">
                <div class="profile">
                    <img src="@/assets/images/yin@2x.png" alt="" />
                    <div class="profile-info">
                        <span class="name">{{ user.address }}</span>
                        <div class="score">
                            Score:
                            <span class="score-number">0</span>
                            <span class="help">?</span>
                            <div class="quit" @click="quit">
                                <icon-svg icon-class="quit"></icon-svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="option">
                    <div
                        class="option-title"
                        @click="optionActive = '1'"
                        :class="{ active: optionActive == '1' }"
                    >
                        Own Arts
                    </div>
                    <div
                        class="option-title"
                        @click="optionActive = '2'"
                        :class="{ active: optionActive == '2' }"
                    >
                        Upload Works
                    </div>
                    <div
                        class="option-title"
                        @click="optionActive = '3'"
                        :class="{ active: optionActive == '3' }"
                    >
                        Launch An Auction
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="menu-container">
                    <ul class="menu">
                        <li>
                            <router-link to="/account"
                                >Purchase Order</router-link
                            >
                        </li>
                        <li>
                            <router-link to="/account">Sales Order</router-link>
                        </li>
                        <li>
                            <router-link to="/account"
                                >Receiving Address</router-link
                            >
                        </li>
                    </ul>
                    <ul
                        class="menu"
                        style="padding-top: 25px; margin-bottom: 70px"
                    >
                        <li>
                            <router-link to="/account"
                                >Account Setting</router-link
                            >
                        </li>
                        <li>
                            <router-link to="/account"
                                >Message Center</router-link
                            >
                        </li>
                        <li>
                            <router-link to="/account"
                                >Customer Service</router-link
                            >
                        </li>
                    </ul>
                </div>
                <div class="content">
                    <!-- <div class="homepage">
                        Born in Nanjing <br /><br />
                        Studying in Nanjing University of the Arts <br /><br />
                        Learning from famous contemporary masters such as Li
                        Xiaoxuan and Li Jin <br /><br />
                        Member of Nanjing fine brushwork Heavy Color Painting
                        Association
                        <i class="update"></i>
                        <button class="more-button">My Work</button>
                    </div> -->
                    <OwnArts v-if="optionActive == '1'" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "@/store";
import OwnArts from "./OwnArts";
export default {
    name: "index",
    data() {
        return {
            optionActive: "1",
            menuActive: "0",
            list: [],
        };
    },
    components: {
        OwnArts,
    },
    computed: {
        user() {
            return this.$store.state.user.info;
        },
    },
    beforeRouteEnter(to, from, next) {
        if (!store.state.user.info.token) {
            next({
                path: "/login",
            });
        } else {
            next();
        }
    },
    created() {},
    methods: {
        quit() {
            this.$store.dispatch("user/Quit");
            this.$router.push("/");
        },
    },
};
</script>

<style lang="scss" scoped>
.index {
    padding-top: 80px;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .profile {
        display: flex;
        align-items: center;
        > img {
            overflow: hidden;
            border-radius: 50%;
            border: 4px solid #020202;
            width: 109px;
            height: 109px;
            margin-right: 40px;
            margin-left: 30px;
        }
        .profile-info {
            display: flex;
            flex-direction: column;
            .name {
                font-size: 22px;
                font-weight: 600;
                letter-spacing: 0px;
                margin-bottom: 20px;
                max-width: 300px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .score {
                font-size: 22px;
                font-weight: 400;
                letter-spacing: 0px;
                display: flex;
                align-items: center;
            }
            .score-number {
                margin-left: 15px;
                font-weight: 600;
            }
            .help {
                display: block;
                margin-left: 15px;
                width: 19px;
                height: 19px;
                font-size: 16px;
                line-height: 18px;
                color: #1a7fc6;
                border: 1px solid #1a7fc6;
                border-radius: 50%;
                cursor: pointer;
            }
            .quit {
                margin-left: 15px;
                display: flex;
                font-size: 20px;
                cursor: pointer;
            }
        }
    }
    .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .option-title {
            font-size: 20px;
            font-weight: 400;
            letter-spacing: 0px;
            color: #999999;
            margin: 0 45px;
            cursor: pointer;
            position: relative;
        }
        .option-title.active {
            color: #020202;
        }
        .option-title.active::after {
            content: "";
            position: absolute;
            height: 4px;
            background: #020202;
            width: 83px;
            bottom: -13px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}

.body {
    display: flex;
    justify-content: space-between;
    .menu {
        width: 170px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-top: 103px;
        li {
            font-size: 18px;
            font-weight: 400;
            letter-spacing: 0px;
            margin-bottom: 51px;
        }
    }
    .content {
        width: calc(100% - 170px);
        .homepage {
            padding-top: 78px;
            font-size: 18px;
            font-weight: 400;
            letter-spacing: 0px;
            .update {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url("~@/assets/images/xie@2x.png") no-repeat;
                background-size: 20px;
                cursor: pointer;
            }
            .more-button {
                display: block;
                padding: 17px 80px;
                margin: 0 auto;
                color: black;
                font-size: 22px;
                font-weight: 600;
                background: transparent;
                border: 3px solid black;
                text-transform: uppercase;
                margin-top: 93px;
                cursor: pointer;
            }
        }
    }
}
</style>
