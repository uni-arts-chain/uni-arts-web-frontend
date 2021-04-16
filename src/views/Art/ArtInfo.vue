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
            <CreateSell v-if="isOwner && !isOwnerOrder" />
            <CancelSell v-if="isOwner && isOwnerOrder" />
            <Buy v-if="!isOwner" />
            <CreateAuction v-if="isOwner && !isAuction" />
            <BidAuction v-if="!isOwner && isAuction" />
            <CancelAuction v-if="isOwner && !isFinished && isAuction" />
            <FinishAuction v-if="isOwner && isFinished && isAuction" />
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
    </div>
</template>
<script>
import { BigNumber } from "bignumber.js";
import Dialog from "@/components/Dialog/Dialog";
import ShareDialog from "@/components/ShareDialog";
import Qrcode from "@/components/Qrcode";
import CreateSell from "./Buttons/CreateSell";
import CancelSell from "./Buttons/CancelSell";
import CreateAuction from "./Buttons/CreateAuction";
import BidAuction from "./Buttons/BidAuction";
import CancelAuction from "./Buttons/CancelAuction";
import FinishAuction from "./Buttons/FinishAuction";
import Buy from "./Buttons/Buy";
import { Tooltip } from "element-ui";

export default {
    name: "art-info",
    components: {
        Qrcode,
        Dialog,
        ShareDialog,
        CreateSell,
        CancelSell,
        CreateAuction,
        BidAuction,
        CancelAuction,
        FinishAuction,
        Buy,
        [Tooltip.name]: Tooltip,
    },
    data() {
        return {
            dialogShareVisible: false,
            copyStatus: false,

            shareUrl: "",
            shareArt: "",
            shareContent: "",
        };
    },
    computed: {
        art() {
            return this.$store.state.art.art;
        },
        signatureList() {
            return this.$store.state.art.signatureList;
        },
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

.button-group {
    display: flex;
    justify-content: space-between;
}
</style>

<style>
.qrcode-tooltip {
    padding: 2px;
}
</style>
