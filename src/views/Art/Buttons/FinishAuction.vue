/** * Created by Lay Hunt on 2021-04-16 14:41:44. */
<template>
    <div class="finish-auction">
        <button :disabled="isOffline || isOnSale" @click="showDialog()">
            FINISH AUCTION
        </button>
        <Dialog
            :visible.sync="dialogVisible"
            type="small"
            :close="handleClose"
            @closed="handleClosed"
        >
            <div class="dialog-content">
                <div class="title">FINISH AUCTION</div>
                <div class="auction">
                    <div class="price">
                        Current Price:
                        <span class="number">{{ art.price || 0 }} UART</span>
                    </div>
                    <button
                        @click="finishAuction"
                        v-loading="isSubmiting"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                    >
                        FINISH AUCTION
                    </button>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>
import { Form, FormItem } from "element-ui";
import Dialog from "@/components/Dialog/Dialog";

export default {
    name: "finish-auction-button",
    components: {
        Dialog,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    data() {
        return {
            dialogVisible: false,
            isSubmiting: false,
        };
    },
    computed: {
        art() {
            return this.$store.state.art.art;
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
    },
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
        async finishAuction() {
            await this.$rpc.api.isReady;
            if (this.isSubmiting) {
                return;
            }
            this.isSubmiting = true;
            let extrinsic = this.$rpc.api.tx.nft.finishAuction(
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
.finish-auction {
    > button {
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
    .auction {
        font-size: 26px;
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
            margin-bottom: 35px;
        }
        .number {
            font-size: 24px;
            color: #c61e1e;
        }
        .note {
            font-size: 20px;
            margin-bottom: 25px;
        }
        .desc {
            font-size: 20px;
            font-weight: 400;
            margin-bottom: 37px;
            min-height: 30px;
        }
        button {
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
        .input-body {
            position: relative;
            margin-bottom: 37px;
            height: 77px;
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
        .el-form {
            width: 460px;
            margin: 0 auto;
            margin-bottom: 60px;
        }
        .el-form-item {
            margin-bottom: 30px;
            ::v-deep .el-form-item__content {
                text-align: left;
            }
            ::v-deep .el-form-item__label {
                font-size: 17px;
                font-weight: 400;
                line-height: 45px;
            }
        }
        .el-date-editor,
        .input-box {
            width: 100%;
        }
    }
}
</style>
