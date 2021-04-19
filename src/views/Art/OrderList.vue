/** * Created by Lay Hunt on 2021-04-19 20:51:37. */
<template>
    <div class="order-list" v-if="orderList.length > 0">
        <div class="title">Order List</div>
        <div class="order-body">
            <div class="table-head">
                <div class="owner">Owner</div>
                <div class="price">Unit Price</div>
                <div class="quantity">Remaining / Total</div>
                <div class="action">Action</div>
            </div>
            <div class="item" v-for="(v, i) in orderList" :key="i">
                <div class="owner">{{ v.owner }}</div>
                <div class="price">{{ formatValue(v.price) }} UART</div>
                <div class="quantity">{{ v.balance }} / {{ v.value }}</div>
                <button @click="buyOrder(v)">BUY</button>
            </div>
        </div>
        <Dialog
            :visible.sync="dialogVisible"
            type="medium"
            :close="handleClose"
            @closed="handleClosed"
        >
            <div class="dialog-content">
                <div class="title">FIRM BUY</div>
                <div class="price-content">
                    <div class="price">
                        Current Price:
                        <span class="number"
                            >{{ formatValue(orderInfo.price) }} UART</span
                        >
                    </div>
                    <div class="price">
                        <div>
                            Total price:
                            <span style="color: #c61e1e; font-size: 24px"
                                >{{
                                    totalPrice(orderInfo.price, form.volume)
                                }}
                                UART</span
                            >
                        </div>
                    </div>
                </div>
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
                                placeholder="Please enter the volume"
                            />
                            <span class="code"
                                >{{ form.volume ? form.volume : 0 }} /
                                {{ orderInfo.balance }}</span
                            >
                        </div>
                    </el-form-item>
                    <div class="note" style="min-height: 36px"></div>
                </el-form>
                <button
                    class="submit-button"
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
import { Form, FormItem } from "element-ui";
import Dialog from "@/components/Dialog/Dialog";
import Input from "@/components/Input";

export default {
    name: "order-list",
    components: {
        Dialog,
        Input,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    computed: {
        orderList() {
            return this.$store.state.art.saleSeparableInfoList;
        },
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
                } else if (valueNumber.gt(this.orderInfo.balance)) {
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
            orderInfo: {},
            form: {
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
            },
        };
    },
    methods: {
        buyOrder(item) {
            this.orderInfo = item;
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleClosed() {
            this.orderInfo = {};
        },
        formatValue(value) {
            return new BigNumber(value).div(
                new BigNumber(10).pow(
                    this.$store.state.global.chain.tokenDecimals
                )
            );
        },
        totalPrice(price, volume) {
            let result = new BigNumber(this.formatValue(price))
                .times(volume)
                .toString();
            return isNaN(result) ? 0 : result;
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
            let extrinsic = this.$rpc.api.tx.nft.acceptSeparableSaleOrder(
                this.orderInfo.order_id,
                this.form.volume
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
    },
};
</script>
<style lang="scss" scoped>
.order-list {
    margin-bottom: 180px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 50px;
    }
    .order-body {
        .table-head {
            display: flex;
            justify-content: space-between;
            align-content: center;
            font-size: 24px;
            margin-bottom: 10px;
            .owner,
            .price,
            .quantity {
                width: 30%;
                text-align: center;
            }
            .action {
                width: 10%;
            }
        }
        .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 2px solid black;
            padding-top: 15px;
            padding-bottom: 15px;
            font-size: 20px;
            .owner {
                width: 30%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .price {
                width: 30%;
            }
            .quantity {
                width: 30%;
            }
            > button {
                cursor: pointer;
                background: transparent;
                width: 10%;
                font-size: 20px;
                padding: 4px;
                border: 2px solid black;
                transition: all 0.3s ease;
            }
            > button:hover {
                cursor: pointer;
                background: black;
                width: 10%;
                color: white;
                font-size: 20px;
                padding: 4px;
                border: 2px solid black;
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
    .price-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .price {
        font-size: 20px;
        font-weight: 400;
        min-height: 30px;
        margin-bottom: 45px;
        margin-left: 35px;
        margin-right: 35px;
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
