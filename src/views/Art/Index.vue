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
                        :isAuction="isAuction"
                        :isWaiting="isWaiting"
                        :countdown="countdown"
                    />
                </div>
                <ArtInfo :art="art" :signatureList="signatureList" />
            </div>
            <Transaction :transactionList="transactionList" />
            <BidHistory :auctionList="auctionList" />
            <SignatureList :signatureList="signatureList" />
            <Author :authorInfo="author" />
            <Information :art="art" />
            <Comment :art="art" />
            <Detail :art="art" />
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
    },
    data() {
        return {
            isLoading: false,

            author: {},
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
        isSending(value) {
            if (!value) this.subInfo();
        },
        auctionInfo(value) {
            if (value) {
                this.initTimeWork(value);
            }
        },
    },
    created() {
        this.requestData();
    },
    beforeDestroy() {
        this.$store.dispatch("art/ResetSubQueue");
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
        isAuction() {
            return (
                this.$store.getters["art/artStatus"] ==
                    this.$store.state.art.ART_ON_AUCTION ||
                this.$store.getters["art/artStatus"] ==
                    this.$store.state.art.ART_WAITING_AUCTION
            );
        },
        isWaiting() {
            return (
                this.$store.getters["art/artStatus"] ==
                this.$store.state.art.ART_WAITING_AUCTION
            );
        },
        auctionInfo() {
            return this.$store.state.art.auctionInfo;
        },
        auctionList() {
            return this.$store.state.art.auctionList;
        },
        transactionList() {
            return this.$store.state.art.transactionList;
        },
        signatureList() {
            return this.$store.state.art.signatureList;
        },
    },
    methods: {
        requestData(isSub = true) {
            this.isLoading = true;
            if (isSub) {
                this.$store.dispatch("art/ResetSubQueue");
                this.$store.dispatch("art/ResetInfo");
                this.$store.dispatch("art/SetArtInfo", {
                    img_detail_file1: {},
                    img_detail_file2: {},
                    img_detail_file3: {},
                    img_detail_file4: {},
                    img_detail_file5: {},
                });
            }
            this.$http
                .globalGetArtById(
                    {},
                    {
                        id: this.currentArtId,
                    }
                )
                .then(async (res) => {
                    this.author = res.author;
                    await this.$store.dispatch("art/SetArtInfo", res);
                    if (res.item_id) {
                        isSub ? await this.subInfo() : "";
                    }

                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.$notify.error(err.head ? err.head.msg : err);
                    this.isLoading = false;
                });
        },
        async subInfo() {
            this.requestData(false);
            await this.$store.dispatch("art/GetTransactionList");
            await this.$store.dispatch("art/GetSignatureList");
            await this.$store.dispatch("art/GetAuctionInfo");
            await this.$store.dispatch("art/GetSaleInfo");
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
            clearInterval(this.timeWorkId);
            this.timeWorkId = "";
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
    },
};
</script>

<style lang="scss" scoped>
.art {
    padding-top: 80px;
}

.art-info {
    overflow: hidden;
    margin-bottom: 100px;
    width: 100%;

    .adaptive-view-wrapper {
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
