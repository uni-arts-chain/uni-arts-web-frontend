/** * Created by Lay Hunt on 2021-04-16 14:41:44. */
<template>
    <div class="create-separable-sell">
        <button
            :disabled="isOffline || separableOwnInfo.quantity <= 0"
            @click="showDialog"
        >
            SELL NOW
        </button>
        <Dialog
            :visible.sync="dialogVisible"
            type="medium"
            :close="handleClose"
            @closed="handleClosed"
        >
            <div class="dialog-content">
                <div class="title">FIRM SELL</div>
                <div class="price-content">
                    <div class="price">
                        Current Price:
                        <span class="number"
                            >{{ art.price ? art.price : 0 }}
                            {{
                                $store.getters["art/currencyCode"].toUpperCase()
                            }}</span
                        >
                    </div>
                    <div class="price">
                        <div>
                            Total price:
                            <span style="color: #c61e1e; font-size: 24px"
                                >{{ totalPrice(form.price, form.volume) }}
                                {{
                                    $store.getters[
                                        "art/currencyCode"
                                    ].toUpperCase()
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <!-- <div class="desc">
                    <p>Please enter sales information</p>
                </div> -->
                <el-form
                    ref="form"
                    :model="form"
                    label-width="0px"
                    :rules="rules"
                    label-position="left"
                >
                    <el-form-item prop="volume">
                        <div class="input-body volume">
                            <Input
                                v-model="form.volume"
                                :placeholder="'the number of splits purchased'"
                            />
                            <span class="code"
                                >{{ form.volume ? form.volume : 0 }} /
                                {{ separableOwnInfo.quantity }}</span
                            >
                        </div>
                    </el-form-item>
                    <el-form-item prop="price">
                        <div class="input-body">
                            <Input
                                type="number"
                                v-model="form.price"
                                :placeholder="'price'"
                            />
                            <span class="code">{{
                                $store.getters["art/currencyCode"].toUpperCase()
                            }}</span>
                        </div>
                    </el-form-item>
                    <!-- <div class="note" style="min-height: 56px"></div> -->
                    <el-form-item>
                        <button
                            class="submit-button"
                            @click.prevent="submitSepabrableSell"
                            v-loading="isSubmiting"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                        >
                            SELL NOW
                        </button>
                    </el-form-item>
                </el-form>
            </div>
        </Dialog>
    </div>
</template>
<script>
import { BigNumber } from "bignumber.js";
import { Form, FormItem } from "element-ui";
import Input from "@/components/Input";
import Dialog from "@/components/Dialog/Dialog";

export default {
    name: "create-separable-sell-button",
    components: {
        Dialog,
        Input,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    data() {
        let volumeValidator = (rule, value, callback) => {
            if (value) {
                let valueNumber = new BigNumber(value);
                let numberArray = valueNumber.mod(1).toString().split(".");
                if (numberArray.length >= 2) {
                    return callback(
                        new Error("The input value must be an integer")
                    );
                } else if (valueNumber.gt(this.separableOwnInfo.quantity)) {
                    callback("Exceeding the maximum");
                } else if (valueNumber.isNaN()) {
                    callback("Invalid input value");
                } else {
                    callback();
                }
            } else {
                callback("Invalid input value");
            }
        };
        return {
            dialogVisible: false,
            isSubmiting: false,
            form: {
                volume: "",
                price: "",
            },
            rules: {
                volume: [
                    {
                        required: true,
                        validator: volumeValidator,
                        trigger: "blur",
                    },
                ],
                price: [
                    {
                        required: true,
                        message: "Please enter the price",
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
        currencyId() {
            return this.$store.state.global.currencyId;
        },
        isOffline() {
            return !this.art.item_id;
        },
        separableOwnInfo() {
            return this.$store.getters["art/separableOwnInfo"];
        },
    },
    methods: {
        showDialog() {
            this.dialogVisible = true;
        },
        async submitSepabrableSell() {
            if (!this.$store.state.user.info.address) {
                this.$router.push("/login");
                return;
            }
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    if (this.isSubmiting) {
                        return;
                    }
                    this.isSubmiting = true;

                    let extrinsic = this.$rpc.api.tx.nft.createSeparableSaleOrder(
                        this.art.collection_id,
                        this.art.item_id,
                        parseInt(this.form.volume),
                        this.currencyId,
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
                }
            });
        },
        totalPrice(price, volume) {
            let result = new BigNumber(price).times(volume).toString();
            return isNaN(result) ? 0 : result;
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
.create-separable-sell {
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
    .price {
        font-size: 20px;
        font-weight: 400;
        min-height: 30px;
        margin-bottom: 25px;
        margin-left: 35px;
        margin-right: 35px;
    }
    .price-content {
        display: flex;
        align-items: center;
        justify-content: center;
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
    .input-body.volume {
    }
    .input-body {
        position: relative;
        /* margin-bottom: 37px; */
        border: 2px solid #020202;
        height: 79px;
        .code {
            font-size: 26px;
            font-weight: 600;
            text-align: left;
            letter-spacing: 0px;
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        .input-box {
            float: left;
            width: 100%;
            height: 75px;
            ::v-deep {
                .el-input__inner {
                    border: none;
                    height: 100%;
                    width: 100%;
                    font-size: 26px;
                    border: none;
                    padding: 14px 34px;
                    padding-right: 34px;
                    text-align: center;
                }
            }
        }
    }
    .note {
        font-size: 20px;
        margin-bottom: 25px;
    }
    .el-form {
        .el-form-item {
            margin-bottom: 40px;
        }
        ::v-deep .el-form-item__error {
            width: 100%;
            text-align: center;
            font-size: 16px;
            line-height: 23px;
            height: 30px;
        }
    }
    button.submit-button {
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
    button.submit-button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>
