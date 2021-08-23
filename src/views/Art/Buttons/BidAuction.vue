/** * Created by Lay Hunt on 2021-04-16 14:41:44. */
<template>
    <div class="bid-auction">
        <button
            :disabled="isOffline || isOnSale || !isStarted || isFinished"
            @click="showDialog"
        >
            BID AUCTION
        </button>
        <Dialog
            :visible.sync="dialogVisible"
            type="medium"
            :close="handleClose"
            @closed="handleClosed"
        >
            <div class="dialog-content">
                <div class="title">FIRM AUCTION</div>
                <div class="price">
                    Current Price:
                    <span class="number"
                        >{{
                            auction.current_price ||
                            auction.start_price | priceFormat
                        }}
                        {{
                            $store.getters["art/currencyCode"].toUpperCase()
                        }}</span
                    >
                </div>
                <div class="desc">
                    You have bid
                    <span
                        >{{
                            auction.current_price ||
                            auction.start_price | priceFormat
                        }}
                        {{ chainInfo.tokenSymbol }}</span
                    >, at least you need to increase the price by
                    <span
                        >{{ auction.increment | priceFormat }}
                        {{ chainInfo.tokenSymbol }}</span
                    >.
                </div>
                <div class="input-body">
                    <input
                        disabled
                        type="number"
                        :value="currentPrice | priceFormat"
                    />
                    <span class="code">{{ chainInfo.tokenSymbol }}</span>
                </div>
                <div class="note">
                    If the auction is not successful, the bid amount will be
                    returned after the auction
                </div>
                <button
                    @click="bidAuction"
                    v-loading="isSubmiting"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    BID NOW
                </button>
            </div>
        </Dialog>
    </div>
</template>
<script>
import { BigNumber } from "bignumber.js";
import Dialog from "@/components/Dialog/Dialog";

export default {
    name: "bid-auction-button",
    components: {
        Dialog,
    },
    data() {
        return {
            dialogVisible: false,
            isSubmiting: false,
            form: {
                price: "",
            },
        };
    },
    computed: {
        art() {
            return this.$store.state.art.art;
        },
        auction() {
            return this.$store.state.art.auctionInfo;
        },
        chainInfo() {
            return this.$store.state.global.chain;
        },
        currentPrice() {
            return new BigNumber(
                this.auction.current_price || this.auction.start_price
            )
                .plus(this.auction.increment)
                .toString();
        },
        isOffline() {
            return !this.art.item_id;
        },
        isOnSale() {
            return (
                this.$store.getters["art/artStatus"] ==
                this.$store.state.art.ART_ON_SALE
            );
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
        isStarted() {
            return (
                this.$store.getters["art/artStatus"] ==
                this.$store.state.art.ART_ON_AUCTION
            );
        },
        isFinished() {
            return (
                this.$store.getters["art/artStatus"] ==
                this.$store.state.art.ART_AUCTIONED
            );
        },
    },
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
        async bidAuction() {
            await this.$rpc.api.isReady;
            if (this.isSubmiting) {
                return;
            }
            this.isSubmiting = true;
            let extrinsic = this.$rpc.api.tx.nft.bid(
                this.art.collection_id,
                this.art.item_id
            );
            this.$store.dispatch("art/SendExtrinsic", {
                address: this.$store.state.user.info.address,
                extrinsic,
                cb: () => {
                    this.isSubmiting = false;
                    this.$notify.info("Submitted");
                    this.dialogVisible = false;
                },
                done: () => {
                    this.$notify.success("Success");
                },
                err: () => {
                    this.isSubmiting = false;
                    this.$notify.error("Submission Failed");
                },
            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleClosed() {},
    },
};
</script>
<style lang="scss" scoped>
.bid-auction {
    @media screen and (max-width: 970px) {
        margin-right: 5px;
        flex: 1;
    }
    > button {
        @media screen and (max-width: 970px) {
            font-size: 15px;
            padding: 4px;
            border: 2px solid #020202;
            margin-bottom: 5px;
            width: 100%;
        }
        cursor: pointer;
        border: 3px solid #020202;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #020202;
        letter-spacing: 0;
        padding: 17px 0;
        width: 260px;
        background: transparent;
    }
    > button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
.dialog ::v-deep .el-dialog {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 10px;
}
.dialog-content {
    @media screen and (max-width: 970px) {
        font-size: 20px;
    }
    font-size: 26px;
    text-align: left;
    letter-spacing: 0px;
    text-align: center;
    color: #020202;
    .title {
        font-weight: 600;
        margin-bottom: 30px;
    }
    .price {
        @media screen and (max-width: 970px) {
            font-size: 16px;
        }
        font-size: 20px;
        font-weight: 400;
        min-height: 30px;
        margin-bottom: 25px;
    }
    .number {
        @media screen and (max-width: 970px) {
            font-size: 20px;
        }
        font-size: 24px;
        color: #c61e1e;
    }
    .desc {
        @media screen and (max-width: 970px) {
            font-size: 15px;
            margin-bottom: 20px;
            min-height: unset;
        }
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 37px;
        min-height: 30px;
    }
    .input-body {
        position: relative;
        margin-bottom: 37px;
        @media screen and (max-width: 970px) {
            margin-bottom: 20px;
            height: 30px;
            width: 90%;
        }
        input {
            @media screen and (max-width: 970px) {
                height: 100%;
                font-size: 20px;
                padding: 0;
            }
            width: 100%;
            height: 75px;
            font-size: 26px;
            border: 2px solid #020202;
            padding: 14px 34px;
            text-align: center;
        }
        .code {
            @media screen and (max-width: 970px) {
                height: 100%;
                font-size: 20px;
                padding: 0;
                right: 5%;
                top: 2px;
            }
            font-size: 26px;
            font-weight: 600;
            text-align: left;
            letter-spacing: 0px;
            position: absolute;
            right: 34px;
            top: 19px;
        }
    }
    .note {
        font-size: 20px;
        margin-bottom: 25px;
    }
    > button {
        @media screen and (max-width: 970px) {
            font-size: 16px;
            height: 30px;
            width: 90%;
        }
        background: #020202;
        width: 307px;
        height: 75px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        letter-spacing: 0px;
        cursor: pointer;
    }
}
</style>
