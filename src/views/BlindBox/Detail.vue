/** * Created by Lay Hunt on 2021-04-22 15:30:15. */
<template>
    <div class="detail">
        <div class="title-img" :style="`background-image: url(${bg2})`" />
        <div class="container">
            <div class="title">Harry Potter and the Order of the Phoenix</div>
            <div class="desc">
                A total of 59 heroes participate in this game. Once opened, one
                NFT owner will be randomly obtained, which can be used for
                collection and resale
            </div>
            <div class="button-group">
                <button class="open">Open 1 time</button>
                <button class="open10">Open 10 times</button>
            </div>
            <div class="open-record">
                <div class="record" @click="openRecord">
                    <img src="@/assets/images/record@2x.png" />
                    <span>Open records</span>
                </div>
            </div>
            <div class="list">
                <div class="title">Possible access</div>
                <div class="nft-list">
                    <div class="item" v-for="(v, i) in list" :key="i">
                        <div class="img-wrapper">
                            <AdaptiveImage
                                width="100%"
                                height="100%"
                                :url="HomePage1"
                            />
                        </div>
                        <div class="label rare">
                            <img
                                class="icon"
                                src="@/assets/images/rare@2x.png"
                            />
                            <span>Rare</span>
                        </div>
                        <!-- <div class="label own">
                            <span>Own</span>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="rule">
                <div class="title">Rule description</div>
                <p>
                    1.A total of 59 heroes participate in this game. Once
                    opened, one NFT owner will be randomly obtained, which can
                    be used for collection and resale
                </p>
                <p>
                    2.A total of 59 heroes participate in this game. Once
                    opened, one NFT owner will be randomly obtained, which can
                    be used for collection and resale
                </p>
                <p>
                    3.A total of 59 heroes participate in this game. Once
                    opened, one NFT owner will be randomly obtained, which can
                    be used for collection and resale
                </p>
                <p>
                    4.A total of 59 heroes participate in this game. Once
                    opened, one NFT owner will be randomly obtained, which can
                    be used for collection and resale
                </p>
            </div>
            <img src="@/assets/images/di@2x.png" class="di" />
        </div>
    </div>
</template>
<script>
import HomePage1 from "@/assets/images/temp/home-page1.jpg";
import AdaptiveImage from "@/components/AdaptiveImage";
import bg2 from "@/assets/images/blind-box-bg2@2x.png";
export default {
    name: "detail",
    components: {
        AdaptiveImage,
    },
    data() {
        return {
            bg2,
            HomePage1,
            list: [1, 2, 3, 4, 5, 6],
        };
    },
    mounted() {
        this.$store.dispatch("global/SetTheme", "dark");
    },
    destroyed() {
        this.$store.dispatch("global/SetTheme", "light");
    },
    methods: {
        openRecord() {
            this.$router.push("/blindbox/history");
        },
    },
};
</script>
<style lang="scss" scoped>
.detail {
    background-color: black;
    overflow: hidden;
    .title-img {
        width: 100%;
        height: 961px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        margin-bottom: 80px;
    }
    .container {
        position: relative;
        padding-bottom: 140px;
        .title {
            opacity: 1;
            font-size: 34px;
            font-family: Broadway;
            font-weight: 400;
            text-align: center;
            color: white;
            margin-bottom: 74px;
        }
        .desc {
            font-size: 24px;
            font-weight: 400;
            text-align: center;
            color: #f1f1f1;
            line-height: 36px;
            letter-spacing: 0px;
            margin-bottom: 79px;
        }
    }
    .button-group {
        margin: 0 auto;
        width: 750px;
        margin-bottom: 34px;
        display: flex;
        justify-content: space-between;
        .open {
            text-align: center;
            cursor: pointer;
            width: 321px;
            height: 88px;
            background: url(~@/assets/images/button-open@2x.png) no-repeat;
            background-position: center;
            background-size: 321px 88px;
            font-size: 30px;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
        }
        .open10 {
            text-align: center;
            cursor: pointer;
            width: 321px;
            height: 86px;
            background: url(~@/assets/images/button-open10@2x.png) no-repeat;
            background-position: center;
            background-size: 321px 86px;
            font-size: 30px;
            font-weight: 500;
            text-align: center;
            color: #ffffff;
        }
    }
    .open-record {
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        padding-right: 15px;
        width: 750px;
        margin-bottom: 57px;
        .record {
            width: 170px;
            cursor: pointer;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .record img {
            width: 19px;
            margin-right: 14px;
        }
        .record span {
            font-size: 22px;
            font-weight: 500;
            text-align: center;
            color: #2f8ccc;
        }
    }
    .list {
        .title {
            font-size: 30px;
            font-family: Broadway;
            font-weight: 400;
            text-align: left;
            color: #f1f1f1;
            line-height: 34px;
            letter-spacing: 1px;
            margin-bottom: 79px;
        }
        .nft-list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 36px;
            .item {
                width: 360px;
                height: 270px;
                cursor: pointer;
                margin-bottom: 70px;
                position: relative;
                .img-wrapper {
                    width: 100%;
                    height: 100%;
                }
                .label {
                    background-color: black;
                    height: 30px;
                    min-width: 73px;
                    position: absolute;
                    display: flex;
                    align-items: center;
                }
                .label .icon {
                    width: 17px;
                    height: 16px;
                    margin-right: 7px;
                }
                .label.rare {
                    left: 0px;
                    top: 35px;
                    font-size: 18px;
                    font-weight: 600;
                    text-align: left;
                    color: #ffcc5e;
                    line-height: 60px;
                    letter-spacing: 1px;
                }
                .label.own {
                    left: 0px;
                    top: 35px;
                    font-size: 18px;
                    font-weight: 600;
                    text-align: left;
                    color: #00debc;
                    line-height: 60px;
                    letter-spacing: 1px;
                }
            }
        }
    }
    .rule {
        margin-bottom: 59px;
        .title {
            font-size: 30px;
            font-family: Broadway;
            font-weight: 400;
            text-align: left;
            color: #f1f1f1;
            line-height: 34px;
            letter-spacing: 1px;
            margin-bottom: 59px;
        }
        > p {
            font-size: 26px;
            font-weight: 400;
            text-align: left;
            color: #f1f1f1;
            line-height: 40px;
            letter-spacing: 1px;
        }
    }
    .di {
        width: 100%;
        position: absolute;
        bottom: -30px;
        left: 0;
    }
}
</style>
