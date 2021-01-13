/** * Created by Lay Hunt on 2021-01-13 18:35:33. */
<template>
    <div class="bid-history">
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
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            type: Object,
            default: () => {},
        },
        collection_id: {
            type: Number,
            default: 0,
        },
        item_id: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            default: "prepare",
        },
    },
    data() {
        return {
            auctionInfo: {},
            auctionList: [],
        };
    },
    created() {
        this.getAuctionInfo();
    },
    watch: {
        collection_id() {
            this.getAuctionInfo();
        },
        auctionInfo() {
            this.$emit("change", this.auctionInfo);
        },
        status() {
            this.getAuctionInfo();
        },
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
            if (
                !this.collection_id ||
                !this.item_id ||
                this.status == "prepare"
            )
                return;
            await this.$rpc.api.isReady;
            let currentAuction = await this.$rpc.api.query.nft.auctionList(
                this.collection_id,
                this.item_id
            );
            this.auctionInfo = currentAuction.toJSON();

            let list = await this.$rpc.api.query.nft.bidHistoryList(
                this.auctionInfo.id
            );
            this.auctionList = list.toJSON();
            this.auctionList.reverse();
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
