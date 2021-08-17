/** * Created by Lay Hunt on 2020-12-23 15:39:28. */
<template>
    <div class="addsign" v-if="list.length > 0">
        <div class="item" v-for="(v, i) in list" :key="i">
            <div class="img">
                <AdaptiveImage :url="v.value.img_file || img"></AdaptiveImage>
            </div>
            <div class="content">
                <div class="content-top">
                    <div class="left">
                        <div class="title">
                            {{ v.name }}
                            <span class="mine-org" v-if="isOwner(v.owner)"
                                >OWN</span
                            >
                        </div>
                        <div class="cost">
                            Cost:
                            <span style="color: #c61e1e">{{
                                v.value.fee || 0
                            }}</span>
                            {{ $store.state.global.symbol.toUpperCase() }}/time
                        </div>
                    </div>
                    <div class="right">
                        <button @click="apply(v)">Apply Now</button>
                    </div>
                </div>
                <div class="content-bottom">
                    <!-- <div class="signed-time">Signed: 168 times</div> -->
                    <div class="signed-time" style="height: 30px"></div>
                    <div class="desc">Introductions：{{ v.value.desc }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "@/components/AdaptiveImage";
import img from "@/assets/images/temp/home-page1.jpeg";
export default {
    name: "organization",
    components: {
        AdaptiveImage,
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            img,
        };
    },
    methods: {
        apply(item) {
            if (this.$store.state.user.info.address) {
                this.$router.push("/certificate/orgsign/" + item.hash);
            } else {
                this.$router.push("/login");
            }
        },
        isOwner(v) {
            return v === this.$store.state.user.info.address;
        },
    },
};
</script>
<style lang="scss" scoped>
.item {
    @media screen and (max-width: 970px) {
        margin-bottom: 40px;
        width: 100%;
    }
    overflow: hidden;
    margin-bottom: 100px;
    .img {
        @media screen and (max-width: 970px) {
            float: unset;
            width: 100%;
        }
        float: left;
        width: 360px;
        height: 270px;
    }
    .content {
        @media screen and (max-width: 970px) {
            float: unset;
            width: 90%;
            padding: 0 5%;
            display: flex;
            flex-direction: column-reverse;
        }
        float: right;
        width: calc(100% - 360px);
        padding-left: 43px;
    }
    .content-top {
        @media screen and (max-width: 970px) {
            width: 100%;
        }
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .left {
            .title {
                @media screen and (max-width: 970px) {
                    font-size: 17px;
                }
                font-size: 22px;
                font-weight: 600;
                text-align: left;
                color: #020202;
                letter-spacing: 0px;
                margin-bottom: 18px;
                max-width: 500px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: flex;
                align-items: center;
            }
            .mine-org {
                @media screen and (max-width: 970px) {
                    font-size: 14px;
                }
                border: 1px solid #c61e1e;
                padding-top: 1px;
                padding-bottom: 1px;
                padding-left: 4px;
                padding-right: 4px;
                color: #c61e1e;
                margin-left: 12px;
                border-radius: 4px;
                font-size: 16px;
            }
            .cost {
                @media screen and (max-width: 970px) {
                    font-size: 16px;
                }
                font-size: 18px;
                font-weight: 600;
                text-align: left;
                color: #020202;
                line-height: 30px;
                letter-spacing: 0px;
            }
        }
        .right {
            button {
                @media screen and (max-width: 970px) {
                    font-size: 19px;
                    border-width: 2px;
                    min-width: 150px;
                    padding-top: 7px;
                    padding-bottom: 7px;
                }
                cursor: pointer;
                border: 3px solid black;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                min-width: 193px;
                padding-top: 10px;
                padding-bottom: 10px;
                letter-spacing: 0px;
                background-color: white;
            }
            @media screen and (max-width: 970px) {
                text-align: left;
            }
        }
    }
    .content-bottom {
        .signed-time {
            @media screen and (max-width: 970px) {
                display: none;
                margin-top: 15px;
            }
            font-size: 18px;
            font-weight: 400;
            text-align: left;
            color: #020202;
            line-height: 30px;
            letter-spacing: 0px;
            margin-top: 30px;
        }
        .desc {
            @media screen and (max-width: 970px) {
                margin-top: 10px;
            }
            height: 112px;
            overflow: hidden;
            margin-top: 23px;
            font-size: 18px;
            font-weight: 400;
            text-align: left;
            color: #020202;
            line-height: 28px;
            letter-spacing: 0px;
            /* display: flex; */
            /* align-items: flex-end; */
        }
    }
}
</style>
