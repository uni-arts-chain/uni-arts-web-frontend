/** * Created by Lay Hunt on 2020-11-17 18:30:48. */
<template>
    <div class="art">
        <div class="container">
            <div class="art-info">
                <div class="img-container">
                    <AdaptiveImage
                        :url="art.img_main_file1 ? art.img_main_file1.url : ''"
                    />
                </div>
                <div class="info">
                    <div class="title">{{ art.name }}</div>
                    <div class="price">{{ art.price }} UART</div>
                    <p class="intro">
                        {{ getMaterial(art.material_id).title }}，{{
                            art.size_width
                        }}
                        x {{ art.size_length }}
                    </p>
                    <div class="block-title" style="min-height: 37px">
                        BLOCK INFORMATION
                    </div>
                    <div class="address" style="min-height: 28px">
                        Certificate Address: {{ art.online_extrinsic_hash }}
                        <el-tooltip
                            effect="dark"
                            :content="!copyStatus ? 'Copy' : 'Copied'"
                            placement="top"
                        >
                            <i
                                class="copy"
                                @mouseleave="copyLeave"
                                @click="copy(member.address)"
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
                                    :data="member.address ? member.address : ''"
                                    :typeNumber="8"
                                ></Qrcode>
                            </div>
                            <i class="qr"></i>
                        </el-tooltip>
                    </div>
                    <div class="signature" style="min-height: 28px">
                        <!-- Number of signatures : 3 -->
                    </div>
                    <button
                        :disabled="art.aasm_state == 'prepare'"
                        v-if="isOwner"
                        class="buy"
                        @click="confirm"
                    >
                        {{ isOwnerOrder ? "CANCEL NOW" : "SELL NOW" }}
                    </button>
                    <button v-else class="buy" @click="confirm">BUY NOW</button>
                </div>
            </div>
            <!-- <div class="bid-history">
                <div class="title">Bid History</div>
                <div class="content">
                    <div class="table">
                        <div class="tr">
                            <div class="td username">13****20</div>
                            <div class="td date">2020.08.06 15:32:26</div>
                            <div class="td price">Lead 1500 UART</div>
                            <div class="td address">
                                0x1342423423423423abcd8493ac98ac89832ddba6dc
                            </div>
                        </div>
                        <div class="tr">
                            <div class="td username">13****20</div>
                            <div class="td date">2020.08.06 15:32:26</div>
                            <div class="td price">Lead 1500 UART</div>
                            <div class="td address">
                                0x1342423423423423abcd8493ac98ac89832ddba6dc
                            </div>
                        </div>
                        <div class="tr">
                            <div class="td username">13****20</div>
                            <div class="td date">2020.08.06 15:32:26</div>
                            <div class="td price">Lead 1500 UART</div>
                            <div class="td address">
                                0x1342423423423423abcd8493ac98ac89832ddba6dc
                            </div>
                        </div>
                    </div>
                    <div class="bid-info">
                        <div class="item">
                            <span class="label">Starting Price</span>
                            <span class="value">1000 ART</span>
                        </div>
                        <div class="item">
                            <span class="label">Price Increase Range</span>
                            <span class="value">1000 ART</span>
                        </div>
                        <div class="item">
                            <span class="label">Start Time</span>
                            <span class="value">08.05 12:00</span>
                        </div>
                        <div class="item">
                            <span class="label">End Time</span>
                            <span class="value">08.08 12:00</span>
                        </div>
                    </div>
                </div>
            </div> -->
            <div class="author-info">
                <div class="title">About the author</div>
                <div class="author">
                    <div class="author-container">
                        <img src="@/assets/images/yin@2x.png" />
                    </div>
                    <div class="name">
                        {{
                            author.display_name
                                ? author.display_name
                                : "Anonymous"
                        }}
                    </div>
                </div>
                <div class="author-intro-info">
                    <!-- <div class="author-intro">
                        Shanghai people graduated from Stanford University
                    </div> -->
                    <router-link
                        class="go-detail"
                        :to="`/artist-detail/${author.id}`"
                        >Go to the creator's home page<i class="arrow"></i
                    ></router-link>
                </div>
            </div>
            <div class="infomation">
                <div class="title">Art information</div>
                <div class="information-body">
                    <div class="img-container">
                        <div class="img-content">
                            <AdaptiveImage
                                :url="
                                    art.img_main_file1
                                        ? art.img_main_file1.url
                                        : ''
                                "
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="art-information">
                        <div class="title">{{ art.name }}</div>
                        <div class="size">
                            Size：{{ art.size_width }} x {{ art.size_length }}cm
                        </div>
                        <div class="quality">
                            Material quality：{{
                                getMaterial(art.material_id).title
                            }}
                        </div>
                        <div class="type">
                            Type of work：Digital oil painting
                        </div>
                        <div class="date">
                            Creation time：{{ art.created_at | dateFormat }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="comments">
                <div class="title">Comments on works</div>
                <div class="comment-content">
                    {{ art.details }}
                </div>
            </div>
            <div class="details">
                <div class="title">Artwork Details</div>
                <div class="comment-content">
                    <div class="item" v-if="art.img_detail_file1.url">
                        <div
                            class="img-content"
                            @click="enterPreview(art.img_detail_file1)"
                        >
                            <AdaptiveImage
                                :isOrigin="true"
                                :url="
                                    art.img_detail_file1
                                        ? art.img_detail_file1.url
                                        : ''
                                "
                            ></AdaptiveImage>
                        </div>
                        <div class="img-desc">
                            {{ art.img_detail_file1_desc }}
                        </div>
                        <img
                            src="@/assets/images/xiangqing1@2x.png"
                            style="bottom: -10px; right: 0"
                            class="xq"
                        />
                    </div>
                    <div class="item" v-if="art.img_detail_file2.url">
                        <div class="img-desc">
                            {{ art.img_detail_file2_desc }}
                        </div>
                        <div
                            class="img-content"
                            @click="enterPreview(art.img_detail_file2)"
                        >
                            <AdaptiveImage
                                :isOrigin="true"
                                :url="
                                    art.img_detail_file2
                                        ? art.img_detail_file2.url
                                        : ''
                                "
                            ></AdaptiveImage>
                        </div>
                        <img
                            src="@/assets/images/xiangqing2@2x.png"
                            style="bottom: -10px; left: 50px"
                            class="xq"
                        />
                    </div>
                    <div class="item" v-if="art.img_detail_file3.url">
                        <div
                            class="img-content"
                            @click="enterPreview(art.img_detail_file3)"
                        >
                            <AdaptiveImage
                                :isOrigin="true"
                                :url="
                                    art.img_detail_file3
                                        ? art.img_detail_file3.url
                                        : ''
                                "
                            ></AdaptiveImage>
                        </div>
                        <div class="img-desc">
                            {{ art.img_detail_file3_desc }}
                        </div>
                        <img
                            src="@/assets/images/xiangqing1@2x.png"
                            style="bottom: -10px; right: 0"
                            class="xq"
                        />
                    </div>
                    <div class="item" v-if="art.img_detail_file4.url">
                        <div class="img-desc">
                            {{ art.img_detail_file4_desc }}
                        </div>
                        <div
                            class="img-content"
                            @click="enterPreview(art.img_detail_file4)"
                        >
                            <AdaptiveImage
                                :isOrigin="true"
                                :url="
                                    art.img_detail_file4
                                        ? art.img_detail_file4.url
                                        : ''
                                "
                            ></AdaptiveImage>
                        </div>
                        <img
                            src="@/assets/images/xiangqing2@2x.png"
                            style="bottom: -10px; left: 50px"
                            class="xq"
                        />
                    </div>
                    <div
                        class="item"
                        v-if="art.img_detail_file5.url"
                        @click="enterPreview(art.img_detail_file5)"
                    >
                        <div class="img-content">
                            <AdaptiveImage
                                :isOrigin="true"
                                :url="
                                    art.img_detail_file5
                                        ? art.img_detail_file5.url
                                        : ''
                                "
                            ></AdaptiveImage>
                        </div>
                        <div class="img-desc">
                            {{ art.img_detail_file5_desc }}
                        </div>
                        <img
                            src="@/assets/images/xiangqing1@2x.png"
                            style="bottom: -10px; right: 0"
                            class="xq"
                        />
                    </div>
                </div>
            </div>
        </div>
        <Dialog
            :visible.sync="isDialogPreview"
            type="fullscreen"
            :close="handlePreviewClose"
        >
            <div class="dialog-content preview">
                <img :src="dialogPreviewUrl" alt="" />
            </div>
        </Dialog>
        <Dialog
            :visible.sync="dialogVisible"
            :type="dialogType"
            :close="handleClose"
        >
            <div class="dialog-content" v-if="isOwnerOrder">
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
                <div class="title">FIRM BID</div>
                <div class="price">
                    Current Price:
                    <span class="number">{{ art.price }} UART</span>
                </div>
                <!-- <div class="desc">
                    You have bid <span>1100 ART</span>, at least you need to
                    increase the price by <span>200 ART</span>.
                </div>
                <div class="input-body">
                    <input type="number" v-model="form.price" />
                    <span class="code">ART</span>
                </div>
                <div class="note">
                    If the auction is not successful, the bid amount will be
                    returned after the auction
                </div> -->
                <button
                    @click="submitBuy"
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
import Dialog from "@/components/Dialog/Dialog";
import AdaptiveImage from "@/components/AdaptiveImage";
import Qrcode from "@/components/Qrcode";
import { BigNumber } from "bignumber.js";
import { Tooltip } from "element-ui";

export default {
    name: "art",
    components: { Dialog, AdaptiveImage, [Tooltip.name]: Tooltip, Qrcode },
    data() {
        return {
            dialogVisible: false,
            isDialogPreview: false,
            dialogPreviewUrl: "",
            isSubmiting: false,
            art: {
                img_detail_file1: {},
                img_detail_file2: {},
                img_detail_file3: {},
                img_detail_file4: {},
                img_detail_file5: {},
            },
            member: {},
            author: {},
            currentArtId: this.$route.params.id,
            copyStatus: false,
            form: {
                price: "",
            },
        };
    },
    created() {
        this.requestData();
    },
    computed: {
        isOwner() {
            return this.art.member_id == this.$store.state.user.info.id;
        },
        isOwnerOrder() {
            return (
                this.art.member_id == this.$store.state.user.info.id &&
                this.art.aasm_state == "bidding"
            );
        },
        dialogType() {
            return this.isDialogPreview
                ? "fullscreen"
                : this.isOwner
                ? this.isOwnerOrder
                    ? "small"
                    : "medium"
                : "small";
        },
    },
    methods: {
        requestData() {
            this.$http
                .globalGetArtById(
                    {},
                    {
                        id: this.currentArtId,
                    }
                )
                .then((res) => {
                    this.art = res;
                    this.member = res.member;
                    this.author = res.author;
                })
                .catch((err) => {
                    console.log(err);
                    this.$notify({
                        title: "Error",
                        message: err.head ? err.head.msg : err,
                        type: "error",
                    });
                });
        },
        enterPreview(obj) {
            if (obj) {
                this.dialogPreviewUrl = obj.url;
                this.isDialogPreview = true;
            }
        },
        handlePreviewClose() {
            this.dialogPreviewUrl = "";
            this.isDialogPreview = false;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        confirm() {
            this.dialogVisible = true;
        },
        submit() {
            this.dialogVisible = false;
        },
        getMaterial(id) {
            let item = this.$store.state.art.materials.find((v) => (v.id = id));
            return item ? item : {};
        },
        copyLeave() {
            setTimeout(() => (this.copyStatus = false), 500);
        },
        copy(value) {
            this.copyStatus = true;
            this.$copy(value);
        },
        async submitSell() {
            if (this.isSubmiting) {
                return;
            }
            if (!this.form.price) return;
            this.isSubmiting = true;
            console.log(
                "result: ",
                new BigNumber(10)
                    .pow(this.$store.state.global.chain.tokenDecimals)
                    .times(this.form.price)
                    .toNumber()
            );
            let extrinsic = this.$rpc.api.tx.nft.createSaleOrder(
                this.art.collection_id,
                this.art.item_id,
                0,
                new BigNumber(10)
                    .pow(this.$store.state.global.chain.tokenDecimals)
                    .times(this.form.price)
                    .toNumber()
            );
            let accountList = await this.$extension.accounts();
            let currentAccount = accountList.find(
                (v) => v.address === this.$store.state.user.info.address
            );
            await this.$extension.signAndSend(
                currentAccount,
                extrinsic,
                () => {
                    this.isSubmiting = false;
                    this.$notify({
                        title: "success",
                        message: "Submitted",
                        type: "success",
                    });
                    this.dialogVisible = false;
                },
                () => {
                    this.isSubmiting = false;
                    this.$notify({
                        title: "Error",
                        message: "Submission Failed",
                        type: "error",
                    });
                }
            );
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
            let accountList = await this.$extension.accounts();
            let currentAccount = accountList.find(
                (v) => v.address === this.$store.state.user.info.address
            );
            await this.$extension.signAndSend(
                currentAccount,
                extrinsic,
                () => {
                    this.isSubmiting = false;
                    this.$notify({
                        title: "Success",
                        message: "Success",
                        type: "success",
                    });
                    this.dialogVisible = false;
                },
                () => {
                    this.isSubmiting = false;
                    this.$notify({
                        title: "Error",
                        message: "Submission Failed",
                        type: "error",
                    });
                }
            );
        },
        async submitBuy() {
            if (this.isSubmiting) {
                return;
            }
            console.log("创建买单");
            this.isSubmiting = true;
            let extrinsic = this.$rpc.api.tx.nft.acceptSaleOrder(
                this.art.collection_id,
                this.art.item_id
            );
            let accountList = await this.$extension.accounts();
            console.log(accountList);
            let currentAccount = accountList.find(
                (v) => v.address === this.$store.state.user.info.address
            );
            await this.$extension.signAndSend(
                currentAccount,
                extrinsic,
                () => {
                    this.isSubmiting = false;
                    this.$notify({
                        title: "success",
                        message: "Application submitted",
                        type: "success",
                    });
                    this.dialogVisible = false;
                },
                () => {
                    this.isSubmiting = false;
                    this.$notify({
                        title: "Error",
                        message: "Submission Failed",
                        type: "error",
                    });
                }
            );
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
    .img-container {
        float: left;
        width: 550px;
        height: 550px;
        margin-right: 50px;
        overflow: hidden;
        position: relative;
        img {
            position: absolute;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
    }
}
.info {
    float: left;
    width: 550px;
    margin-left: 50px;
    text-align: left;
    margin-bottom: 171px;
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
        margin-bottom: 85px;
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

    .signature {
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 86px;
    }

    .buy {
        cursor: pointer;
        border: 3px solid #020202;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #020202;
        letter-spacing: 0px;
        padding: 17px 40px;
        width: 400px;
        background: transparent;
    }
    button.buy:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}

.author-info,
.infomation,
.comments,
.details,
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

.author-info {
    overflow: hidden;
    .author {
        float: left;
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #020202;
        .author-container {
            width: 103px;
            height: 103px;
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            border: 3px solid #020202;
            margin-bottom: 26px;
            img {
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateY(-50%) translateX(-50%);
            }
        }
        .name {
            font-size: 26px;
            max-width: 300px;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            letter-spacing: 0px;
        }
    }
    .author-intro-info {
        float: left;
        width: calc(100% - 501px);
        padding-left: 103px;
        height: 166px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .author-intro {
            font-size: 24px;
            font-weight: 400;
            text-align: left;
            line-height: 36px;
            letter-spacing: 1px;
            margin-bottom: 30px;
            max-width: 480px;
            text-transform: uppercase;
        }
        .go-detail {
            font-size: 24px;
            font-weight: 600;
            text-align: left;
            color: #5d96ff;
            letter-spacing: 0px;
            text-transform: uppercase;
            min-width: 480px;
            i.arrow {
                margin-left: 15px;
                width: 24px;
                height: 17px;
                display: inline-block;
                background: url("~@/assets/images/jiantou@2x.png") no-repeat;
                background-size: 100% auto;
            }
        }
    }
}

.infomation {
    .information-body {
        display: flex;
        justify-content: center;
        .img-container {
            margin-right: 100px;
            width: 320px;
            height: 320px;
            background: url("~@/assets/images/xiangkuang@2x.png") no-repeat;
            background-size: 100% auto;
            padding-top: 40px;
            padding-left: 40px;
            .img-content {
                position: relative;
                overflow: hidden;
                height: 210px;
                width: 208px;
            }
            img {
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
        }

        .art-information {
            .title {
                font-size: 30px;
                font-weight: 600;
                text-align: left;
                color: #020202;
                letter-spacing: 0px;
                margin-bottom: 44px;
            }
            .quality,
            .size,
            .type,
            .date {
                font-size: 22px;
                font-weight: 400;
                text-align: left;
                letter-spacing: 0px;
                margin-bottom: 24px;
            }
        }
    }
}

.comments {
    .comment-content {
        font-size: 23px;
        font-weight: 400;
        text-align: left;
        line-height: 36px;
        letter-spacing: 1px;
    }
}

.details {
    .comment-content {
        min-height: 300px;
    }
    .img-content {
        width: 456px;
        height: 456px;
        cursor: pointer;
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 130px;
        position: relative;
        margin-bottom: 120px;
        padding: 0 70px;
    }
    .img-desc {
        max-width: 489px;
        font-size: 24px;
        font-weight: 400;
        text-align: left;
        color: #020202;
        line-height: 36px;
        letter-spacing: 1px;
    }
    .xq {
        position: absolute;
        height: 230px;
        z-index: -1;
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
