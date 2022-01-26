/** * Created by Lay Hunt on 2020-11-17 18:30:48. */
<template>
    <div class="art">
        <div class="container">
            <div class="art-info" v-loading="isLoading">
                <div class="adaptive-view-wrapper">
                    <AdaptiveView
                        :nft="art"
                        width="100%"
                        height="100%"
                        :isResponsive="false"
                        preload="auto"
                        :isAuction="isAuction"
                        :isWaiting="isWaiting"
                        :countdown="countdown"
                    />
                </div>
                <ArtInfo />
            </div>
            <OrderList />
            <Transaction />
            <BidHistory />
            <SignatureList />
            <Author />
            <Information />
            <Comment />
            <Detail />
            <Similar />
        </div>
    </div>
</template>
<script>
import { ComputeBlockTimestamp } from "@/utils";

import Similar from "./Similar";
import Author from "./Author";
import Information from "./Information";
import Comment from "./Comment";
import Detail from "./Detail";
import Transaction from "./Transaction";
import OrderList from "./OrderList";
import BidHistory from "./BidHistory";
import SignatureList from "./SignatureList";
import ArtInfo from "./ArtInfo";
import AdaptiveView from "@/components/AdaptiveView";

export default {
    name: "art",
    components: {
        AdaptiveView,
        Similar,
        Author,
        Information,
        Comment,
        Detail,
        Transaction,
        BidHistory,
        SignatureList,
        ArtInfo,
        OrderList,
    },
    data() {
        return {
            isLoading: false,

            countdown: "",
            currentArtId: this.$route.params.id,

            timeWorkId: "",

            subAuctionInfo: "",
            subAuctionList: "",
            subSaleOrderList: "",
        };
    },
    watch: {
        "$route.params.id"(value) {
            this.currentArtId = value;
            this.requestData();
        },
        "auctionInfo.id"(value) {
            if (value > 0) {
                this.initTimeWork(this.auctionInfo);
            } else {
                this.removeTimeWork();
            }
        },
        isSending(value) {
            if (!value) {
                this.requestData();
            }
        },
    },
    created() {
        this.requestData();
    },
    beforeDestroy() {
        this.$store.dispatch("art/unSubArtInfo");
        this.$store.dispatch("art/SetArtInfo", {
            img_detail_file1: {},
            img_detail_file2: {},
            img_detail_file3: {},
            img_detail_file4: {},
            img_detail_file5: {},
        });
        clearInterval(this.timeWorkId);
    },
    computed: {
        art() {
            return this.$store.state.art.art;
        },
        auctionInfo() {
            return this.$store.state.art.auctionInfo;
        },
        isAuction() {
            return (
                this.$store.getters["art/artStatus"] ==
                    this.$store.state.art.ART_ON_AUCTION ||
                this.$store.getters["art/artStatus"] ==
                    this.$store.state.art.ART_WAITING_AUCTION ||
                this.$store.getters["art/artStatus"] ==
                    this.$store.state.art.ART_AUCTIONED
            );
        },
        isSending() {
            return this.$store.state.art.isSending;
        },
        isWaiting() {
            return (
                this.$store.getters["art/artStatus"] ==
                this.$store.state.art.ART_WAITING_AUCTION
            );
        },
    },
    methods: {
        requestData() {
            this.isLoading = true;
            this.$store.dispatch("art/unSubArtInfo");
            this.$store.dispatch("art/ResetInfo");
            this.$store.dispatch("art/SetArtInfo", {
                img_detail_file1: {},
                img_detail_file2: {},
                img_detail_file3: {},
                img_detail_file4: {},
                img_detail_file5: {},
            });
            this.$http
                .globalGetArtById(
                    {},
                    {
                        id: this.currentArtId,
                    }
                )
                .then(async (res) => {
                    await this.$store.dispatch("art/SetArtInfo", res);
                    if (res.item_id) {
                        this.$store.dispatch("art/SubArtInfo");
                    }
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.$notify.error(err.head ? err.head.msg : err);
                    this.isLoading = false;
                });
        },

        countdownFormat(time) {
            time = parseInt(time) * 1000;
            let jetLag = Math.abs(new Date().getTime() - time) / 1000;
            let second = parseInt(jetLag % 60),
                minute = parseInt((jetLag / 60) % 60),
                hour = parseInt((jetLag / 3600) % 24),
                day = parseInt(jetLag / 3600 / 24);
            if (second == 0 && minute == 0 && hour == 0 && day == 0) {
                return -1;
            } else {
                return `${day}d : ${hour < 10 ? "0" + hour : hour}h : ${
                    minute < 10 ? "0" + minute : minute
                }m : ${second < 10 ? "0" + second : second}s`;
            }
        },
        initTimeWork(item) {
            let timeWorkId = "";
            let curTime = new Date().getTime() / 1000;
            let time = "";
            if (curTime < this.formatBlockNumber(item.start_time)) {
                time = this.formatBlockNumber(item.start_time);
                timeWorkId = setInterval(() => {
                    let result = this.countdownFormat(time);
                    if (result == -1) {
                        this.resetTimeWork(item);
                    } else {
                        this.countdown = result;
                    }
                }, 1000);
                this.timeWorkId = timeWorkId;
            } else if (
                curTime >= this.formatBlockNumber(item.start_time) &&
                curTime <= this.formatBlockNumber(item.end_time)
            ) {
                time = this.formatBlockNumber(item.end_time);
                timeWorkId = setInterval(() => {
                    let result = this.countdownFormat(time);
                    if (result == -1) {
                        this.resetTimeWork(item);
                    } else {
                        this.countdown = result;
                    }
                }, 1000);
                this.timeWorkId = timeWorkId;
            }
        },
        resetTimeWork(item) {
            this.removeTimeWork();
            this.initTimeWork(item);
        },
        formatBlockNumber(blockNumber) {
            let timestamp = ComputeBlockTimestamp(
                blockNumber,
                this.$store.state.global.chain.timestamp,
                this.$store.state.global.chain.blockHeight
            );
            return timestamp;
        },
        removeTimeWork() {
            clearInterval(this.timeWorkId);
            this.timeWorkId = "";
            this.countdown = "";
        },
    },
};
</script>

<style lang="scss" scoped>
.art {
    @media screen and (max-width: 970px) {
        padding-top: 0px;
    }
    padding-top: 80px;
}

.art-info {
    @media screen and (max-width: 970px) {
        margin-bottom: 25px;
    }
    overflow: hidden;
    margin-bottom: 100px;
    width: 100%;

    .adaptive-view-wrapper {
        @media screen and (max-width: 970px) {
            float: unset;
            width: 100%;
            margin-right: 0;
            //margin-bottom: 50%;
            height: 30vh;
        }
        float: left;
        width: 620px;
        height: 580px;
        margin-right: 25px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
    }
}
</style>
