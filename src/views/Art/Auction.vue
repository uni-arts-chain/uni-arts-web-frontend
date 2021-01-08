/** * Created by Lay Hunt on 2021-01-08 14:13:11. */
<template>
    <div class="auction">
        <div class="title" v-if="isAuctioning">CANCEL AUCTION</div>
        <div class="title" v-else>FIRM AUCTION</div>
        <div class="price">
            Current Price:
            <span class="number">{{ art.price || 0 }} UART</span>
        </div>
        <el-form
            v-if="!isAuctioning"
            ref="form"
            :model="form"
            label-width="130px"
            :rules="rules"
            label-position="left"
        >
            <el-form-item label="起拍价格" prop="start_price">
                <Input
                    class="input-start-price"
                    v-model="form.start_price"
                    type="number"
                    :append="chainInfo.tokenSymbol"
                />
            </el-form-item>
            <el-form-item label="加价幅度" prop="increment">
                <Input
                    class="input-start-price"
                    v-model="form.increment"
                    type="number"
                    :append="chainInfo.tokenSymbol"
                />
            </el-form-item>
            <el-form-item label="开始时间" prop="start_time">
                <DatePicker
                    type="datetime"
                    v-model="form.start_time"
                    placeholder="选择日期"
                />
            </el-form-item>
            <el-form-item label="结束时间" prop="end_time">
                <DatePicker
                    type="datetime"
                    v-model="form.end_time"
                    placeholder="选择日期"
                />
            </el-form-item>
        </el-form>
        <button
            v-if="isAuctioning"
            @click="cancelAuction"
            v-loading="isSubmiting"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            CANCEL AUCTION
        </button>
        <button
            v-else
            @click="submit"
            v-loading="isSubmiting"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            CREATE AUCTION
        </button>
    </div>
</template>
<script>
import Input from "@/components/Input";
import DatePicker from "@/components/DatePicker";
import { BigNumber } from "bignumber.js";
import { ComputeBlockNumber } from "@/utils";
import { Form, FormItem } from "element-ui";
export default {
    name: "auction",
    components: {
        Input,
        DatePicker,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
    },
    props: {
        art: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
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
                        message: "请输入起拍价格",
                        trigger: "blur",
                    },
                ],
                increment: [
                    {
                        required: true,
                        message: "请输入加价幅度",
                        trigger: "blur",
                    },
                ],
                start_time: [
                    {
                        required: true,
                        message: "请选择竞拍开始时间",
                        trigger: "blur",
                    },
                ],
                end_time: [
                    {
                        required: true,
                        message: "请选择竞拍结束时间",
                        trigger: "blur",
                    },
                ],
            },
            isSubmiting: false,
        };
    },
    computed: {
        chainInfo() {
            return this.$store.state.global.chain;
        },
        isAuctioning() {
            return this.art.aasm_state == "auctioning";
        },
    },
    methods: {
        submit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.signAndSend();
                }
            });
        },
        async cancelAuction() {
            if (this.isSubmiting) {
                return;
            }
            this.isSubmiting = true;
            let extrinsic = this.$rpc.api.tx.nft.cancelAuction(
                this.art.collection_id,
                this.art.item_id
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
                    this.$emit("cancelAuction");
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
        async signAndSend() {
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
            console.log([
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
                end_time,
            ]);
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
                    this.$refs["form"].resetFields();
                    this.$emit("finishAuction");
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
    .el-form {
        width: 450px;
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
</style>
