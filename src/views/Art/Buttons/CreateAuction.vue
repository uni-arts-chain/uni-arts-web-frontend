/** * Created by Lay Hunt on 2021-04-16 14:41:44. */
<template>
    <div class="create-auction">
        <button :disabled="isOffline || isOnSale" @click="showDialog()">
            CREATE AUCTION
        </button>
        <Dialog
            :visible.sync="dialogVisible"
            type="medium"
            :close="handleClose"
            @closed="handleClosed"
        >
            <div class="dialog-content">
                <div class="title">FIRM AUCTION</div>
                <div class="auction">
                    <div class="price">
                        Current Price:
                        <span class="number">{{ art.price || 0 }} UART</span>
                    </div>
                    <el-form
                        ref="form"
                        :model="form"
                        label-width="140px"
                        :rules="rules"
                        label-position="left"
                    >
                        <el-form-item label="Price" prop="start_price">
                            <Input
                                class="input-start-price"
                                v-model="form.start_price"
                                type="number"
                                :append="chainInfo.tokenSymbol"
                            />
                        </el-form-item>
                        <el-form-item label="Markup" prop="increment">
                            <Input
                                class="input-start-price"
                                v-model="form.increment"
                                type="number"
                                :append="chainInfo.tokenSymbol"
                            />
                        </el-form-item>
                        <el-form-item label="Starting Time" prop="start_time">
                            <DatePicker
                                type="datetime"
                                v-model="form.start_time"
                                placeholder="Select"
                            />
                        </el-form-item>
                        <el-form-item label="End Time" prop="end_time">
                            <DatePicker
                                type="datetime"
                                v-model="form.end_time"
                                placeholder="Select"
                            />
                        </el-form-item>
                    </el-form>
                    <button
                        @click="createAuction"
                        v-loading="isSubmiting"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                    >
                        CREATE AUCTION
                    </button>
                </div>
            </div>
        </Dialog>
    </div>
</template>
<script>
import { BigNumber } from "bignumber.js";
import { ComputeBlockNumber } from "@/utils";
import { Form, FormItem } from "element-ui";
import DatePicker from "@/components/DatePicker";
import Dialog from "@/components/Dialog/Dialog";
import Input from "@/components/Input";

export default {
    name: "create-auction-button",
    components: {
        Dialog,
        DatePicker,
        Input,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    data() {
        return {
            dialogVisible: false,
            isSubmiting: false,
            form: {
                start_price: "",
                increment: "",
                start_time: "",
                end_time: "",
            },
            rules: {
                start_price: [
                    {
                        required: true,
                        message: "Please enter the price",
                        trigger: "blur",
                    },
                ],
                increment: [
                    {
                        required: true,
                        message: "Please enter the price increase",
                        trigger: "blur",
                    },
                ],
                start_time: [
                    {
                        required: true,
                        message: "Please select the auction start time",
                        trigger: "blur",
                    },
                ],
                end_time: [
                    {
                        required: true,
                        message: "Please select the end time of the auction",
                        trigger: "blur",
                    },
                ],
            },
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
        chainInfo() {
            return this.$store.state.global.chain;
        },
    },
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
        async createAuction() {
            await this.$rpc.api.isReady;
            if (this.isSubmiting) {
                return;
            }
            this.isSubmiting = true;
            let currentBlockHeight = this.$store.state.global.chain.blockHeight;
            let currentTimestamp = this.$store.state.global.chain.timestamp;
            let start_time = parseInt(this.form.start_time.getTime());
            let end_time = parseInt(this.form.end_time.getTime());
            start_time = ComputeBlockNumber(
                start_time,
                currentTimestamp,
                currentBlockHeight
            );
            end_time = ComputeBlockNumber(
                end_time,
                currentTimestamp,
                currentBlockHeight
            );
            let extrinsic = this.$rpc.api.tx.nft.createAuction(
                this.art.collection_id,
                this.art.item_id,
                0,
                new BigNumber(10)
                    .pow(this.$store.state.global.chain.tokenDecimals)
                    .times(this.form.start_price)
                    .toNumber(),
                new BigNumber(10)
                    .pow(this.$store.state.global.chain.tokenDecimals)
                    .times(this.form.increment)
                    .toNumber(),
                start_time,
                end_time
            );
            this.$store.dispatch("art/SendExtrinsic", {
                address: this.$store.state.user.info.address,
                extrinsic,
                cb: () => {
                    this.isSubmiting = false;
                    this.$notify.info("Submitted");
                    this.$refs["form"].resetFields();
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
        handleClosed() {
            this.$refs.form.resetFields();
        },
    },
};
</script>
<style lang="scss" scoped>
.create-auction {
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
