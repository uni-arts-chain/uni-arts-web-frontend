/** * Created by Lay Hunt on 2020-12-14 14:41:18. */
<template>
    <div class="own" v-loading="isLoading">
        <Order type="all" :list="list" @show="showDialog"></Order>
        <div class="pagenation" v-if="hasPrev || hasNext">
            <div
                class="prev"
                @click="prev"
                :class="{ 'no-prev': !hasPrev }"
            ></div>
            <div
                class="next"
                @click="next"
                :class="{ 'no-next': !hasNext }"
            ></div>
        </div>
        <Dialog
            :visible.sync="dialogVisible"
            type="medium"
            :close="handleClose"
            @closed="handleClosed"
        >
            <div class="dialog-content">
                <div class="title">TRANSFER NFT</div>
                <div class="note-info">Please enter the transfer address</div>
                <el-form
                    ref="form"
                    :model="form"
                    label-width="0px"
                    :rules="rules"
                    label-position="left"
                >
                    <el-form-item prop="volume" v-if="isSeparable">
                        <div class="input-body volume">
                            <Input
                                v-model="form.volume"
                                :placeholder="'the number of splits transfer'"
                            />
                            <span class="code"
                                >{{ form.volume ? form.volume : 0 }} /
                                {{
                                    computeAmount(
                                        currentTransfer.selling_amount,
                                        currentTransfer.has_amount
                                    )
                                }}
                            </span>
                        </div>
                    </el-form-item>
                    <el-form-item
                        prop="address"
                        :class="{ 'address-form-item': !isSeparable }"
                    >
                        <div class="input-body">
                            <Input
                                type="string"
                                v-model="form.address"
                                :placeholder="'address'"
                            />
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <button
                            @click.prevent="submitTransfer"
                            v-loading="isSubmiting"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                        >
                            TRANSFER
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
import Dialog from "@/components/Dialog/Dialog";
import Input from "@/components/Input";
import Order from "@/views/Account/Order";
export default {
    name: "own",
    components: {
        Order,
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
                } else if (
                    valueNumber.gt(
                        this.computeAmount(
                            this.currentTransfer.selling_amount,
                            this.currentTransfer.has_amount
                        )
                    )
                ) {
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
            list: [],
            page: 1,
            isLoading: false,
            per_page: 18,
            total_pages: 0,
            total_count: 0,

            dialogVisible: false,
            isSubmiting: false,

            form: {
                address: "",
                volume: "",
            },
            rules: {
                volume: [
                    {
                        required: true,
                        validator: volumeValidator,
                        trigger: "blur",
                    },
                ],
                address: [
                    {
                        required: true,
                        message: "Please enter the address",
                        trigger: "blur",
                    },
                ],
            },

            currentTransfer: "",
        };
    },
    mounted() {
        this.requestData();
    },
    computed: {
        hasPrev() {
            return this.page > 1;
        },
        hasNext() {
            return this.page < this.total_pages;
        },
        isSeparable() {
            return this.currentTransfer.total_amount > 1;
        },
    },
    methods: {
        requestData() {
            this.isLoading = true;
            this.$http
                .userOwnArts({
                    page: this.page,
                    per_page: this.per_page,
                })
                .then((res) => {
                    this.isLoading = false;
                    this.list = res.list;
                    this.total_count = res.total_count;
                    this.total_pages = Math.ceil(
                        res.total_count / this.per_page
                    );
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        next() {
            if (this.hasNext) {
                this.page++;
                this.requestData();
            }
        },
        prev() {
            if (this.hasPrev) {
                this.page--;
                this.requestData();
            }
        },
        showDialog(item) {
            this.currentTransfer = item;
            this.dialogVisible = true;
        },
        submitTransfer() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    if (this.isSubmiting) {
                        return;
                    }
                    console.log("isSeparable: ", this.isSeparable);
                    console.log("address: ", this.form.address);
                    console.log(
                        "volume: ",
                        this.isSeparable ? this.form.volume : 1
                    );
                    console.log(
                        "collection_id: ",
                        this.currentTransfer.collection_id
                    );
                    console.log("item_id: ", this.currentTransfer.item_id);
                    this.isSubmiting = true;
                    console.log(this.currentTransfer);
                    let extrinsic = this.$rpc.api.tx.nft.transfer(
                        this.form.address,
                        this.currentTransfer.collection_id,
                        this.currentTransfer.item_id,
                        this.isSeparable ? this.form.volume : 1
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
                            this.requestData();
                        },
                        err: () => {
                            this.isSubmiting = false;
                            this.$notify.error("Submission Failed");
                        },
                    });
                }
            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleClosed() {
            this.currentTransfer = "";
            this.$refs.form.resetFields();
        },
        computeAmount(sell, total) {
            return new BigNumber(isNaN(total) ? 0 : total)
                .minus(isNaN(sell) ? 0 : sell)
                .toNumber();
        },
    },
};
</script>
<style lang="scss" scoped>
.own {
    padding-left: 10%;
    padding-top: 40px;
}
.pagenation {
    margin-top: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 133px;
    .prev {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/zuo@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .next {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/you@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .prev.no-prev,
    .next.no-next {
        opacity: 0.3;
        cursor: not-allowed;
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
    .note-info {
        font-size: 20px;
        margin-bottom: 25px;
    }
    .el-form {
        .el-form-item {
            margin-bottom: 40px;
        }
        .address-form-item {
            margin-top: 60px;
            margin-bottom: 100px;
        }
        ::v-deep .el-form-item__error {
            width: 100%;
            text-align: center;
            font-size: 16px;
            line-height: 23px;
            height: 30px;
        }
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
    button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>
