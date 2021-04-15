/** * Created by Lay Hunt on 2021-04-15 20:06:36. */
<template>
    <div class="info">
        <div class="title">{{ art.name }}</div>
        <div class="price">{{ art.price }} UART</div>
        <p class="intro">
            {{ getMaterial(art.material_id).title }}，{{ art.size_width }} x
            {{ art.size_length }}
        </p>
        <div class="block-title" style="min-height: 37px">
            BLOCK INFORMATION
        </div>
        <div class="address" style="min-height: 28px">
            Certificate Address:
            <span
                class="address-value"
                @click="
                    showCertificate(
                        art.collection_id,
                        art.item_id,
                        art.item_hash
                    )
                "
                >{{ art.item_hash }}</span
            >
            <el-tooltip
                effect="dark"
                :content="!copyStatus ? 'Copy' : 'Copied'"
                placement="top"
            >
                <i
                    class="copy"
                    @mouseleave="copyLeave"
                    @click="copy(art.item_hash)"
                ></i>
            </el-tooltip>
            <el-tooltip
                popper-class="qrcode-tooltip"
                effect="light"
                placement="bottom"
            >
                <div slot="content">
                    <Qrcode
                        style="border: none"
                        :scale="5"
                        :data="art.item_hash ? art.item_hash : ''"
                        :typeNumber="8"
                    ></Qrcode>
                </div>
                <i class="qr"></i>
            </el-tooltip>
        </div>
        <div class="signature" style="min-height: 28px">
            Number of signatures: {{ signatureList.length }}
        </div>
        <div class="royalty">
            <span v-if="art.has_royalty"
                >Royalty: {{ percentFormat(art.royalty) }}%</span
            >
            <span v-if="art.has_royalty"
                >Royalty Date:
                {{ art.royalty_expired_at | dateDayFormat }}</span
            >
        </div>
        <div class="function">
            <div class="action-item">
                <img
                    src="@/assets/images/zan@2x.png"
                    v-if="!art.liked_by_me"
                    @click="artLike(true)"
                />
                <img
                    src="@/assets/images/zan1@2x.png"
                    @click="artLike(false)"
                    v-else
                />
                <span class="action-text">{{ art.liked_count }}</span>
            </div>
            <div class="action-item">
                <img
                    @click="artDislike(true)"
                    src="@/assets/images/cai@2x.png"
                    v-if="!art.disliked_by_me"
                />
                <img
                    @click="artDislike(false)"
                    src="@/assets/images/cai1@2x.png"
                    v-else
                />
                <span class="action-text">{{ art.dislike_count }}</span>
            </div>
            <div class="action-item">
                <img
                    @click="artFavorite(true)"
                    src="@/assets/images/shoucang@2x.png"
                    v-if="!art.favorite_by_me"
                />
                <img
                    @click="artFavorite(false)"
                    src="@/assets/images/shoucang1@2x.png"
                    v-else
                />
                <span class="action-text">{{ art.favorite_count }}</span>
            </div>
            <div class="action-item">
                <img @click="shareLink" src="@/assets/images/share@2x.png" />
                <span class="action-text">Share</span>
            </div>
        </div>
        <div class="button-group">
            <button
                :disabled="isOffline || isAuction"
                v-if="isOwner"
                class="buy"
                @click="confirm"
            >
                {{ isOwnerOrder ? "CANCEL NOW" : "SELL NOW" }}
            </button>
            <button
                v-if="!isOwner"
                :disabled="isOffline || isAuction || !isOnSale"
                class="buy"
                @click="confirm"
            >
                BUY NOW
            </button>
            <button
                :disabled="isOffline || isOnSale || !isStarted || isFinished"
                v-if="!isOwner && isAuction"
                class="auction"
                @click="createAuction()"
            >
                BID NOW
            </button>
            <button
                :disabled="isOffline || isOnSale"
                v-if="isOwner && !isAuction"
                class="auction"
                @click="createAuction()"
            >
                CREATE AUCTION
            </button>
            <button
                :disabled="isOffline || isOnSale || isFollowed"
                v-if="isOwner && !isFinished && isAuction"
                class="auction"
                @click="cancelAuction()"
            >
                CANCEL AUCTION
            </button>
            <button
                :disabled="isOffline || isOnSale"
                v-if="isOwner && isFinished && isAuction"
                class="auction"
                @click="cancelAuction()"
            >
                FINISH AUCTION
            </button>
        </div>
        <Dialog :visible.sync="dialogShareVisible" type="medium">
            <div class="dialog-content">
                <ShareDialog
                    :url="shareUrl"
                    :art="shareArt"
                    :content="shareContent"
                    type="art"
                />
            </div>
        </Dialog>
        <Dialog
            :visible.sync="dialogVisible"
            :type="dialogType"
            :close="handleClose"
            @closed="handleClosed"
        >
            <div class="dialog-content" v-if="dialogAuctionVisible">
                <Auction
                    @finishAuction="finishAuction"
                    @cancelAuction="finishAuction"
                    :isFinished="isFinished"
                    :isStarted="isStarted"
                    :isWaiting="isWaiting"
                />
            </div>
            <div class="dialog-content" v-else-if="isOwnerOrder">
                <div class="title">FIRM CANCEL</div>
                <div class="price">
                    Current Price:
                    <span class="number">{{ art.price }} UART</span>
                </div>
                <button
                    @click="cancelOrder"
                    v-loading="isSubmiting"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    CANCEL NOW
                </button>
            </div>
            <div class="dialog-content" v-else-if="isOwner">
                <div class="title">FIRM SELL</div>
                <div class="price">
                    Current Price:
                    <span class="number">{{ art.price }} UART</span>
                </div>
                <div class="desc">
                    <p>Please enter the selling price</p>
                </div>
                <div class="input-body">
                    <input type="number" v-model="form.price" />
                    <span class="code">UART</span>
                </div>
                <div class="note" style="min-height: 56px"></div>
                <button
                    @click="submitSell"
                    v-loading="isSubmiting"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    SELL NOW
                </button>
            </div>
            <div class="dialog-content" v-else>
                <div class="title">FIRM BUY</div>
                <div class="price">
                    Current Price:
                    <span class="number">{{ art.price }} UART</span>
                </div>
                <button
                    @click="submitBuy"
                    v-loading="isSubmiting"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    BUY NOW
                </button>
            </div>
        </Dialog>
    </div>
</template>
<script>
import { BigNumber } from "bignumber.js";
import { ComputeBlockTimestamp } from "@/utils";
import Dialog from "@/components/Dialog/Dialog";
import ShareDialog from "@/components/ShareDialog";
import Qrcode from "@/components/Qrcode";
import Auction from "./Auction";
import { Tooltip } from "element-ui";

export default {
    name: "art-info",
    components: {
        Qrcode,
        Dialog,
        ShareDialog,
        Auction,
        [Tooltip.name]: Tooltip,
    },
    props: {
        art: {
            type: Object,
            default: () => {},
        },
        signatureList: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            dialogShareVisible: false,
            copyStatus: false,

            form: {
                price: "",
            },

            dialogVisible: false,
            isDialogPreview: false,
            isSubmiting: false,
            dialogAuctionVisible: false,

            shareUrl: "",
            shareArt: "",
            shareContent: "",
        };
    },
    computed: {
        isFollowed() {
            return this.$store.state.art.auctionList.length > 0;
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
        isSending() {
            return this.$store.state.art.isSending;
        },
        isOwner() {
            return this.art.is_owner;
        },
        isOwnerOrder() {
            return (
                this.art.is_owner &&
                this.$store.getters["art/artStatus"] ==
                    this.$store.state.art.ART_ON_SALE
            );
        },
        isAuction() {
            return (
                this.$store.getters["art/artStatus"] ==
                    this.$store.state.art.ART_ON_AUCTION ||
                this.$store.getters["art/artStatus"] ==
                    this.$store.state.art.ART_WAITING_AUCTION
            );
        },
        dialogType() {
            return this.isDialogPreview
                ? "fullscreen"
                : this.isOwner
                ? this.isAuction
                    ? "small"
                    : this.isOwnerOrder
                    ? "small"
                    : "medium"
                : this.isAuction
                ? "medium"
                : "small";
        },
        isFinished() {
            return (
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
        isWaiting() {
            return (
                this.$store.getters["art/artStatus"] ==
                this.$store.state.art.ART_WAITING_AUCTION
            );
        },
    },
    methods: {
        getMaterial(id) {
            let item = this.$store.state.art.materials.find((v) => v.id == id);
            return item ? item : {};
        },
        copyLeave() {
            setTimeout(() => (this.copyStatus = false), 500);
        },
        copy(value) {
            this.copyStatus = true;
            this.$copy(value);
        },
        shareLink() {
            this.dialogShareVisible = true;
            this.shareUrl =
                location.protocol +
                "//" +
                location.hostname +
                (location.port ? `:${location.port}` : "") +
                "/art/" +
                this.currentArtId;
            this.shareArt = this.art.name;
            this.shareContent = `Uniarts chain - Art encryption Tour \n\nArt：${this.art.name} \n\nView the homepage：${this.url}
            `;
        },
        showCertificate(collection_id, item_id, item_hash) {
            this.$uniCerDialog.show(
                collection_id,
                item_id,
                item_hash,
                this.$store.state.global.chain.blockHeight,
                this.$store.state.global.chain.timestamp
            );
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleClosed() {
            this.dialogAuctionVisible = false;
        },
        confirm() {
            this.dialogVisible = true;
        },
        submit() {
            this.dialogVisible = false;
        },

        finishAuction() {
            this.dialogVisible = false;
        },
        formatBlockNumber(blockNumber) {
            let timestamp = ComputeBlockTimestamp(
                blockNumber,
                this.$store.state.global.chain.timestamp,
                this.$store.state.global.chain.blockHeight
            );
            return timestamp;
        },
        createAuction() {
            if (!this.$store.state.user.info.address) {
                this.$router.push("/login");
                return;
            }
            this.dialogVisible = true;
            this.dialogAuctionVisible = true;
        },
        sendAuction() {
            if (!this.$store.state.user.info.address) {
                this.$router.push("/login");
                return;
            }
            this.dialogVisible = true;
            this.dialogAuctionVisible = true;
        },
        cancelAuction() {
            this.dialogVisible = true;
            this.dialogAuctionVisible = true;
        },
        async submitSell() {
            if (!this.$store.state.user.info.address) {
                this.$router.push("/login");
                return;
            }
            if (this.isSubmiting) {
                return;
            }
            if (!this.form.price) return;
            this.isSubmiting = true;

            let extrinsic = this.$rpc.api.tx.nft.createSaleOrder(
                this.art.collection_id,
                this.art.item_id,
                0,
                new BigNumber(10)
                    .pow(this.$store.state.global.chain.tokenDecimals)
                    .times(this.form.price)
                    .toNumber()
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
        async cancelOrder() {
            if (this.isSubmiting) {
                return;
            }
            this.isSubmiting = true;
            let extrinsic = this.$rpc.api.tx.nft.cancelSaleOrder(
                this.art.collection_id,
                this.art.item_id,
                0
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
        async submitBuy() {
            if (!this.$store.state.user.info.address) {
                this.$router.push("/login");
                return;
            }
            if (this.isSubmiting) {
                return;
            }
            console.log("创建买单");
            this.isSubmiting = true;
            let extrinsic = this.$rpc.api.tx.nft.acceptSaleOrder(
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
        artLike(flag) {
            if (flag) {
                this.$http
                    .userPostArtLike(
                        {
                            id: this.art.id,
                        },
                        { id: this.art.id }
                    )
                    .then(() => {
                        this.art.liked_by_me = true;
                        this.art.liked_count += 1;
                        if (this.art.disliked_by_me) {
                            this.art.disliked_by_me = false;
                            this.art.dislike_count -= 1;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$notify.error(err.head ? err.head.msg : err);
                    });
            } else {
                this.$http
                    .userPostArtCancelLike(
                        {
                            id: this.art.id,
                        },
                        { id: this.art.id }
                    )
                    .then(() => {
                        this.art.liked_by_me = false;
                        this.art.liked_count -= 1;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$notify.error(err.head ? err.head.msg : err);
                    });
            }
        },
        artDislike(flag) {
            if (flag) {
                this.$http
                    .userPostArtDislike(
                        {
                            id: this.art.id,
                        },
                        { id: this.art.id }
                    )
                    .then(() => {
                        this.art.disliked_by_me = true;
                        this.art.dislike_count += 1;
                        if (this.art.liked_by_me) {
                            this.art.liked_by_me = false;
                            this.art.liked_count -= 1;
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$notify.error(err.head ? err.head.msg : err);
                    });
            } else {
                this.$http
                    .userPostArtCancelDislike(
                        {
                            id: this.art.id,
                        },
                        { id: this.art.id }
                    )
                    .then(() => {
                        this.art.disliked_by_me = false;
                        this.art.dislike_count -= 1;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$notify.error(err.head ? err.head.msg : err);
                    });
            }
        },
        artFavorite(flag) {
            if (flag) {
                this.$http
                    .userPostArtFavorite(
                        {
                            id: this.art.id,
                        },
                        { id: this.art.id }
                    )
                    .then(() => {
                        this.art.favorite_by_me = true;
                        this.art.favorite_count += 1;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$notify.error(err.head ? err.head.msg : err);
                    });
            } else {
                this.$http
                    .userPostArtCancelFavorite(
                        {
                            id: this.art.id,
                        },
                        { id: this.art.id }
                    )
                    .then(() => {
                        this.art.favorite_by_me = false;
                        this.art.favorite_count -= 1;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$notify.error(err.head ? err.head.msg : err);
                    });
            }
        },
        percentFormat(str_number) {
            return new BigNumber(str_number).times(100).toString();
        },
    },
};
</script>
<style lang="scss" scoped>
.info {
    float: left;
    width: calc(100% - 620px - 50px);
    margin-left: 25px;
    text-align: left;
    margin-bottom: 151px;
    .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        line-height: 48px;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 35px;
    }

    .price {
        font-size: 24px;
        font-weight: 600;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 17px;
    }

    .intro {
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 65px;
    }

    .block-title {
        font-size: 26px;
        font-weight: 600;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 34px;
    }

    .address {
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 21px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 55px;
        position: relative;
        .address-value {
            cursor: pointer;
        }
        .address-value:hover {
            text-decoration: underline;
        }
        i.copy {
            position: absolute;
            top: 3px;
            right: 35px;
            display: inline-block;
            width: 19px;
            height: 19px;
            background: url("~@/assets/images/fuzhi@2x.png") no-repeat;
            background-size: 100%;
            cursor: pointer;
        }
        i.qr {
            right: 0px;
            top: 3px;
            position: absolute;
            display: inline-block;
            width: 19px;
            height: 19px;
            background: url("~@/assets/images/ma@2x.png") no-repeat;
            background-size: 100%;
            cursor: pointer;
        }
    }

    .signature,
    .royalty {
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 21px;
        /* margin-bottom: 51px; */
    }

    .royalty {
        height: 28px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 31px;
    }

    .function {
        display: flex;
        align-items: center;
        margin-bottom: 35px;
        .action-item {
            margin-right: 35px;
            display: flex;
            align-items: center;
            > img {
                width: 20px;
                margin-right: 10px;
                cursor: pointer;
            }
            .action-text {
                font-size: 17px;
            }
        }
    }

    .button-group {
        display: flex;
        justify-content: space-between;

        .buy,
        .auction {
            cursor: pointer;
            border: 3px solid #020202;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: #020202;
            letter-spacing: 0px;
            padding: 17px 0px;
            width: 260px;
            background: transparent;
        }
        .buy {
            margin-right: 30px;
        }
        button.buy:disabled,
        button.auction:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
}

.dialog ::v-deep .el-dialog {
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 10px;
}
.dialog-content {
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
        font-size: 20px;
        font-weight: 400;
        min-height: 30px;
        margin-bottom: 25px;
    }
    .number {
        font-size: 24px;
        color: #c61e1e;
    }
    .desc {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 37px;
        min-height: 30px;
    }
    .input-body {
        position: relative;
        margin-bottom: 37px;
        height: 40px;
        input {
            width: 100%;
            height: 75px;
            font-size: 26px;
            border: 2px solid #020202;
            padding: 14px 34px;
            text-align: center;
        }
        .code {
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

.dialog-content.preview {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
    background-color: black;
    > img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 0;
        transform: translateX(-50%) translateY(-50%);
    }
}
</style>

<style>
.qrcode-tooltip {
    padding: 2px;
}
</style>
