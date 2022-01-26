/** * Created by Lay Hunt on 2020-11-17 18:22:12. */
<template>
    <footer>
        <div class="container">
            <div class="bottom-logo">
                <span class="logo"></span>
                <span class="desc">@2019-2021 uniarts.network</span>
            </div>
            <div class="bottom-community">
                <div class="text">Community</div>
                <div class="icons">
                    <a
                        href="https://t.me/uniarts"
                        style="margin-left: 0"
                        target="_blank"
                    >
                        <icon-svg icon-class="telegram"></icon-svg>
                    </a>
                    <a
                        href="https://twitter.com/UniartsNetwork"
                        target="_blank"
                    >
                        <icon-svg icon-class="twitter"></icon-svg>
                    </a>
                    <a href="https://discord.gg/ynKCwp5c" target="_blank">
                        <icon-svg icon-class="discord"></icon-svg>
                    </a>
                    <a
                        href="https://medium.com/@UniartsNetwork"
                        target="_blank"
                    >
                        <icon-svg icon-class="medium"></icon-svg>
                    </a>
                    <a href="https://github.com/uni-arts-chain" target="_blank">
                        <icon-svg icon-class="github"></icon-svg>
                    </a>
                </div>
            </div>
            <div class="bottom-nav">
                <ul>
                    <span class="title">For Artists</span>
                    <li><a to="#">Apply as an artist</a></li>
                </ul>
                <ul>
                    <span class="title">Legal</span>
                    <li><a to="#">Terms of Service</a></li>
                    <li><a to="#">Privacy Policy</a></li>
                </ul>
                <ul>
                    <span class="title">Products</span>
                    <li>
                        <a
                            href="http://explorer.uniarts.me/#/explorer"
                            target="_blank"
                            >Chain Explorer</a
                        >
                    </li>
                    <li>
                        <a
                            target="_blank"
                            href="https://telemetry.polkadot.io/#list/Uni-Arts%20Staging%20network"
                            >Chain Network</a
                        >
                    </li>
                    <li v-if="!isProd">
                        <router-link to="/faucet"
                            >Authenticated Faucet</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
import { NODE_ENV } from "@/config";
export default {
    name: "footerbar",
    computed: {
        isProd() {
            return (
                NODE_ENV === "production" &&
                window.NODE_CONFIG.env !== "development"
            );
        },
    },
};
</script>

<style lang="scss" scoped>
footer {
    background: linear-gradient(#380302 0%, #020202 100%);
}
.container {
    min-height: 283px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    @media screen and (max-width: 970px) {
        flex-direction: column-reverse;
        min-height: unset;
    }
}
.bottom-logo {
    width: 28%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid white;
    @media screen and (max-width: 970px) {
        border-right: none;
        width: 100%;
    }
    .logo {
        font-family: "Broadway";
        font-size: 33px;
        font-weight: 400;
        width: 302px;
        height: 160px;
        background-image: url(~@/assets/images/bottom-logo.png);
        background-repeat: no-repeat;
        background-size: 100%;
        @media screen and (max-width: 970px) {
            background-position: center;
            background-size: 60%;
            width: 100%;
            height: 40px;
        }
    }
    .desc {
        font-size: 17px;
        line-height: 30px;
        @media screen and (max-width: 970px) {
            font-size: 11px;
        }
    }
}
.bottom-community {
    @media screen and (max-width: 970px) {
        padding-top: 20px;
        width: 100%;
        margin-left: 0;
    }
    margin-left: 23px;
    .text {
        font-size: 23px;
        text-align: left;
        font-weight: 500;
        margin-bottom: 30px;
        @media screen and (max-width: 970px) {
            display: none;
        }
    }
    .icons {
        display: flex;
        align-items: center;
        @media screen and (max-width: 970px) {
            justify-content: space-evenly;
        }
        a {
            @media screen and (max-width: 970px) {
                font-size: 30px;
                margin: 0 !important;
            }
            display: block;
            font-size: 50px;
            margin: 0 7px;
            line-height: 50px;
        }
    }
}
.bottom-nav {
    @media screen and (max-width: 970px) {
        display: none;
        padding-top: 20px;
        width: 90%;
        text-align: center;
    }
    width: 66%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    ul {
        overflow: hidden;
        width: 33%;
        display: block;
        text-align: right;
        @media screen and (max-width: 970px) {
            text-align: center;
        }
        .title {
            display: inline-block;
            font-size: 18px;
            text-align: right;
            font-weight: 600;
            line-height: 30px;
            padding-bottom: 23px;
            @media screen and (max-width: 970px) {
                border-bottom: none;
                min-width: unset;
                text-align: center;
            }
            border-bottom: 1px solid #cfb9b9;
            min-width: 137px;
        }
        li {
            @media screen and (max-width: 970px) {
                text-align: center;
            }
            display: block;
            margin-top: 23px;
            text-align: right;
            font-size: 14px;
        }
    }
}
</style>
