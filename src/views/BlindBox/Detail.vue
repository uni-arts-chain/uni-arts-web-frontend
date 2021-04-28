/** * Created by Lay Hunt on 2021-04-22 15:30:15. */
<template>
    <div class="detail">
        <div
            class="title-img"
            :style="`background-image: url(${blindBoxInfo.background_img_path})`"
        />
        <div class="container">
            <div class="title">{{ blindBoxInfo.title }}</div>
            <div class="desc" v-html="blindBoxInfo.desc"></div>
            <div class="button-group">
                <button class="open" @click="openClick(1)">Open 1 time</button>
                <button class="open10" @click="openClick(10)">
                    Open 10 times
                </button>
            </div>
            <div class="open-record">
                <div class="record" @click="openRecord">
                    <img src="@/assets/images/record@2x.png" />
                    <span>Open records</span>
                </div>
            </div>
            <div class="list">
                <div class="title">Possible access</div>
                <div class="nft-list" v-loading="isLoading">
                    <div class="nft-list-body">
                        <div class="item" v-for="(v, i) in list" :key="i">
                            <div class="img-wrapper">
                                <AdaptiveImage
                                    width="100%"
                                    height="100%"
                                    :url="v.art.img_main_file1.url"
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
            </div>
            <div class="rule">
                <div class="title">Rule description</div>
                <div v-html="blindBoxInfo.rule"></div>
            </div>
            <img src="@/assets/images/di@2x.png" class="di" />
        </div>
        <Dialog
            :visible.sync="dialogVisible"
            type="small"
            :close="handleClose"
            @closed="handleClosed"
        >
            <div class="dialog-content">
                <div class="title">OPEN BOX</div>
                <div class="price">
                    Total Price:
                    <span class="number"
                        >{{
                            totalPrice(blindBoxInfo.price, this.openCount)
                        }}
                        UART</span
                    >
                </div>
                <button
                    @click="submitOpen"
                    v-loading="isSubmiting"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                    OPEN
                </button>
            </div>
        </Dialog>
        <OpenBox
            :isLoading="isLoadingResult"
            :isOpening="isOpening"
            :visible.sync="dialogVisibleBoxOpen"
            :list="openList"
        />
    </div>
</template>
<script>
import { BigNumber } from "bignumber.js";
import Dialog from "@/components/Dialog/Dialog";
import { notification } from "@/components/Notification";
import OpenBox from "@/components/OpenBox";
import AdaptiveImage from "@/components/AdaptiveImage";
import bg2 from "@/assets/images/blind-box-bg2@2x.png";

export default {
    name: "detail",
    components: {
        AdaptiveImage,
        Dialog,
        OpenBox,
    },
    data() {
        return {
            bg2,
            isLoading: false,
            id: this.$route.params.id,
            blindBoxInfo: {},
            dialogVisible: false,
            dialogVisibleBoxOpen: false,
            isSubmiting: false,
            isOpening: false,
            openCount: 1,
            openList: [],
            isLoadingResult: false,
        };
    },
    computed: {
        list() {
            return this.blindBoxInfo.onchain_card_groups
                ? this.blindBoxInfo.onchain_card_groups
                : [];
        },
    },
    watch: {
        dialogVisibleBoxOpen(value) {
            if (!value) {
                this.openList = [];
            }
        },
    },
    mounted() {
        this.$store.dispatch("global/SetTheme", "dark");
        this.requestData();
    },
    destroyed() {
        this.$store.dispatch("global/SetTheme", "light");
    },
    methods: {
        async requestBlindBox() {
            let result = await this.$rpc.api.query.blindBox.blindBoxList(
                this.blindBoxInfo.box_id
            );
            result = result.toJSON();
            this.blindBoxInfo.remain_count = result.remaind_count;
        },
        requestData() {
            this.isLoading = true;
            this.$http["globalGetBlindBox"]({}, { id: this.id })
                .then((res) => {
                    this.isLoading = false;
                    this.blindBoxInfo = res;
                    this.requestBlindBox();
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        requestOpenList() {
            if (this.isLoadingResult) {
                return;
            }
            this.isLoadingResult = true;
            let ids = this.openList
                .map((v) => {
                    if (v[2] > 0 && v[3] > 0) {
                        return v[2] + "_" + v[3];
                    }
                })
                .join(",");
            if (ids.length < 0) {
                this.isLoadingResult = false;
                this.closeOpenBox();
                return;
            }
            this.$http["globalGetOpenBlindBoxArtList"]({
                ids: ids,
            })
                .then((res) => {
                    console.log(res);
                    this.isLoadingResult = false;
                    if (res.length < 0) {
                        this.closeOpenBox();
                    } else {
                        this.openList = res;
                        this.showOpenBoxResult();
                    }
                    this.requestData();
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoadingResult = false;
                    this.closeOpenBox();
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        openRecord() {
            this.$router.push("/blindbox/history");
        },
        openClick(number) {
            if (this.blindBoxInfo.remain_count <= 0) {
                this.$notify.info(
                    "The number of prizes in the blind box is not enough to open"
                );
                return;
            }
            this.dialogVisible = true;
            this.openCount = number;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleClosed() {},
        async submitOpen() {
            if (!this.$store.state.user.info.address) {
                this.$router.push("/login");
                return;
            }
            if (this.isSubmiting) {
                return;
            }
            console.log("创建开启");
            this.isSubmiting = true;
            const txs = [];
            for (let i = 0; i < this.openCount; i++) {
                txs.push(
                    this.$rpc.api.tx.blindBox.buyBlindBox(
                        this.blindBoxInfo.box_id
                    )
                );
            }

            let extrinsic = this.$rpc.api.tx.utility.batch(txs);
            console.log(txs);
            /* 
                {
                    section: "blindBox",
                    method: "BlindBoxDraw",
                }
                utility.BatchCompleted
            */
            this.$store.dispatch("art/SendExtrinsic", {
                address: this.$store.state.user.info.address,
                extrinsic,
                cb: () => {
                    this.isSubmiting = false;
                    this.openOpenBox();
                    this.$notify.info("Submitted");
                    this.dialogVisible = false;
                },
                done: null,
                err: () => {
                    this.closeOpenBox();
                    this.isSubmiting = false;
                    this.$notify.error("Submission Failed");
                },
                eventCb: ({ method, section, data }, completeCb) => {
                    if (
                        section === "utility" &&
                        method === "BatchInterrupted"
                    ) {
                        console.log(JSON.parse(data.toString()));
                        let result = JSON.parse(data.toString());
                        let successNumber =
                            result[0] - 1 > 0 ? result[0] - 1 : 0;
                        let failedNumber = this.openCount - result[0];

                        notification.notice(
                            {
                                title: "Interrupted",
                                message: `The number of blind boxes was insufficient.${successNumber} successes and ${failedNumber} failures.`,
                                type: "info",
                            },
                            {
                                closeOnClick: true,
                                draggable: true,
                                timeout: 0,
                            }
                        );
                        if (successNumber > 0) {
                            this.requestOpenList();
                        } else {
                            this.closeOpenBox();
                        }
                    }
                    if (section === "utility" && method === "BatchCompleted") {
                        completeCb();
                        this.$notify.success("Success");
                        this.requestOpenList();
                    }
                    if (section === "blindBox" && method === "BlindBoxDraw") {
                        this.openList.push(JSON.parse(data.toString()));
                    }
                    if (method === "ExtrinsicSuccess") {
                        completeCb();
                        this.$notify.success("Success");
                    } else if (method === "ExtrinsicFailed") {
                        completeCb();
                        this.isSubmiting = false;
                        this.closeOpenBox();
                        this.$notify.error("Submission Failed");
                    }
                },
            });
        },
        closeOpenBox() {
            this.dialogVisibleBoxOpen = false;
            this.isOpening = true;
        },
        openOpenBox() {
            this.dialogVisibleBoxOpen = true;
            this.isOpening = true;
        },
        showOpenBoxResult() {
            this.dialogVisibleBoxOpen = true;
            this.isOpening = false;
        },
        totalPrice(price, amount) {
            return new BigNumber(price || 0).times(amount || 0).toNumber();
        },
    },
};
</script>
<style lang="scss" scoped>
.detail {
    position: relative;
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
            white-space: nowrap;
            color: #2f8ccc;
        }
    }
    .list {
        min-height: 500px;
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
            margin-bottom: 36px;
            .nft-list-body {
                overflow: hidden;
            }
            .item:nth-child(3n) {
                margin-right: 0;
            }
            .item {
                width: 360px;
                height: 270px;
                float: left;
                margin-right: 60px;
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
        > div {
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
    > button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>
