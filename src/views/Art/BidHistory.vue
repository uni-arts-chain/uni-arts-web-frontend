/** * Created by Lay Hunt on 2021-01-13 18:35:33. */
<template>
    <div class="bid-history" v-if="auctionInfo.id">
        <div class="title">Bid History</div>
        <div class="content">
            <div class="table">
                <div class="no-data" v-if="auctionList.length == 0">
                    No Auction Data
                </div>
                <div class="tr" v-for="(v, i) in auctionList" :key="i">
                    <div class="td date">
                        {{ formatBlockNumber(v.bid_time) | dateFormat }}

                        <icon-svg
                            v-if="i == 0"
                            class="new-bid-label"
                            icon-class="new"
                        ></icon-svg>
                    </div>
                    <div class="td price">
                        Lead {{ v.bid_price | priceFormat }}
                        {{ $store.state.global.chain.tokenSymbol }}
                    </div>
                    <div class="td address">
                        {{ v.bidder }}
                    </div>
                </div>
            </div>
            <div class="bid-info">
                <div class="item">
                    <span class="label">Starting Price</span>
                    <span class="value"
                        >{{ auctionInfo.current_price | priceFormat }}
                        {{ $store.state.global.chain.tokenSymbol }}</span
                    >
                </div>
                <div class="item">
                    <span class="label">Price Increase Range</span>
                    <span class="value"
                        >{{ auctionInfo.increment | priceFormat }}
                        {{ $store.state.global.chain.tokenSymbol }}</span
                    >
                </div>
                <div class="item">
                    <span class="label">Start Time</span>
                    <span class="value">{{
                        formatBlockNumber(auctionInfo.start_time) | dateFormat
                    }}</span>
                </div>
                <div class="item">
                    <span class="label">End Time</span>
                    <span class="value">{{
                        formatBlockNumber(auctionInfo.end_time) | dateFormat
                    }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ComputeBlockTimestamp } from "@/utils";
export default {
    name: "bid-history",
    props: {
        auctionInfo: {
            type: Object,
            default: () => {},
        },
        auctionList: {
            type: Array,
            default: () => [],
        },
        collection_id: {
            type: Number,
            default: 0,
        },
        item_id: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            subAuctionInfo: () => {},
            subAuctionList: () => {},
        };
    },
    watch: {
        auctionInfo(newValue, oldValue) {
            if (!oldValue.id && newValue) {
                this.getAuctionList();
            }
        },
        collection_id(value) {
            if (value) {
                this.getAuctionInfo();
            }
        },
    },
    created() {
        if (this.collection_id) {
            this.getAuctionInfo();
        }
    },
    beforeDestroy() {
        this.subAuctionInfo();
        this.subAuctionList();
    },
    methods: {
        formatBlockNumber(blockNumber) {
            let timestamp = ComputeBlockTimestamp(
                blockNumber,
                this.$store.state.global.chain.timestamp,
                this.$store.state.global.chain.blockHeight
            );
            return timestamp;
        },
        async getAuctionInfo() {
            await this.$rpc.api.isReady;
            this.subAuctionInfo = await this.$rpc.api.query.nft.auctionList(
                this.collection_id,
                this.item_id,
                (item) => {
                    console.log(item.isEmpty ? {} : item.toJSON());
                    this.$emit(
                        "update:auctionInfo",
                        item.isEmpty ? {} : item.toJSON()
                    );
                }
            );
        },

        async getAuctionList() {
            if (!this.auctionInfo.id) return;
            await this.$rpc.api.isReady;
            this.subAuctionList = await this.$rpc.api.query.nft.bidHistoryList(
                this.auctionInfo.id,
                (item) => {
                    this.$emit(
                        "update:auctionList",
                        item.isEmpty ? [] : item.toJSON().reverse()
                    );
                }
            );
        },
    },
};
</script>
<style lang="scss" scoped>
.bid-history {
    margin-bottom: 180px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
}

.bid-history {
    .content {
        .table {
            display: flex;
            flex-direction: column;
            margin-bottom: 80px;
        }
        .tr {
            width: 100%;
            border-bottom: 1px solid #020202;
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 400;
            text-align: center;
            letter-spacing: 0px;
            padding: 30px 16px;
        }
        .tr:last-child {
            border-bottom: none;
        }
        .address {
            width: 30%;
        }
        .price {
            width: 45%;
        }
        .date {
            width: 25%;
            text-align: left;
            display: flex;
            align-items: center;
        }
        .new-bid-label {
            font-size: 30px;
            margin-left: 5px;
            color: #c61e1e;
        }
        .address {
            max-width: 240px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .bid-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .item {
                background-color: #eee;
                padding: 16px 0px;
                width: 540px;
                font-size: 18px;
                font-weight: 400;
                text-align: center;
                letter-spacing: 0px;
                margin-bottom: 37px;
                overflow: hidden;
                .label {
                    float: left;
                    display: block;
                    width: 60%;
                    text-align: center;
                }
                .value {
                    float: left;
                    display: block;
                    width: 40%;
                    text-align: left;
                }
            }
        }
    }
}
</style>
