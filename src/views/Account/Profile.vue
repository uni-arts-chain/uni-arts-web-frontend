/** * Created by Lay Hunt on 2021-01-07 11:18:04. */
<template>
    <div class="profile container">
        <div class="title">Personal Account</div>
        <div class="body">
            <div class="avatar" @click="uploadAvatar">
                <AdaptiveImage
                    :url="form.avatar.length > 0 ? form.avatar[2] : yin_2x"
                />
                <div class="mask">Upload</div>
                <Upload ref="upload" v-show="false" v-model="form.avatar" />
            </div>
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                label-position="right"
            >
                <el-form-item
                    label="Nickname"
                    prop="display_name"
                    label-width="190px"
                >
                    <Input v-model="form.display_name" />
                </el-form-item>
                <el-form-item
                    class="gender-form-item"
                    label="Gender"
                    label-width="251px"
                    prop="sex"
                >
                    <el-radio v-model="form.sex" label="1">Men</el-radio>
                    <el-radio v-model="form.sex" label="2">Women</el-radio>
                </el-form-item>
                <el-form-item
                    label="Profile"
                    class="profile-form-item"
                    label-width="190px"
                    style="width: 95%"
                    prop="desc"
                >
                    <Textarea
                        v-model="form.desc"
                        :minRows="7"
                        :maxRows="7"
                        :rows="7"
                    />
                </el-form-item>
                <el-form-item
                    label="Real name"
                    prop="real_name"
                    label-width="190px"
                >
                    <Input v-model="form.real_name" />
                </el-form-item>
                <el-form-item
                    label="Cell-phone number"
                    prop="phone_number"
                    label-width="251px"
                >
                    <Input v-model="form.phone_number" type="number" />
                </el-form-item>
                <el-form-item
                    label="ID Number"
                    prop="id_document_number"
                    label-width="190px"
                >
                    <Input v-model="form.id_document_number" type="number" />
                </el-form-item>
                <el-form-item style="width: 100%" label-width="190px">
                    <el-button
                        class="submit-button"
                        type="primary"
                        @click="onSubmit"
                        v-loading="isSubmiting"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        >Save</el-button
                    >
                    <el-button
                        class="cancel-button"
                        @click="$router.push('/account')"
                        >Cancel</el-button
                    >
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "@/components/AdaptiveImage";
import Upload from "@/components/Upload";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { Button, Form, FormItem, Radio } from "element-ui";
import yin_2x from "@/assets/images/yin@2x.png";

export default {
    name: "profile",
    components: {
        AdaptiveImage,
        Upload,
        Input,
        Textarea,
        [Button.name]: Button,
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Radio.name]: Radio,
    },
    data() {
        var validatePhoneNumber = (rule, value, callback) => {
            if (!value) {
                callback();
            } else if (
                !/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(
                    value
                )
            ) {
                callback(new Error("手机号码格式错误"));
            } else {
                callback();
            }
        };
        var validateIDCard = (rule, value, callback) => {
            if (!value) {
                callback();
            } else if (
                !/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(
                    value
                )
            ) {
                callback(new Error("身份证号码格式错误"));
            } else {
                callback();
            }
        };
        return {
            yin_2x,
            isSubmiting: false,
            form: {
                avatar: [],
                display_name: "",
                desc: "",
                sex: "",
                real_name: "",
                phone_number: "",
                id_document_number: "",
            },
            rules: {
                display_name: [
                    { required: false, message: "请输入标题", trigger: "blur" },
                ],
                sex: [
                    { required: false, message: "请选择性别", trigger: "blur" },
                ],
                desc: [
                    {
                        required: false,
                        message: "请输入个人简介",
                        trigger: "blur",
                    },
                ],
                real_name: [
                    {
                        required: false,
                        message: "请输入真实姓名",
                        trigger: "blur",
                    },
                ],
                phone_number: [
                    {
                        required: false,
                        validator: validatePhoneNumber,
                        trigger: "blur",
                    },
                ],
                id_document_number: [
                    {
                        required: false,
                        validator: validateIDCard,
                        trigger: "blur",
                    },
                ],
                avatar: [
                    {
                        required: false,
                        message: "请上传头像",
                        trigger: "change",
                    },
                ],
            },
        };
    },
    created() {
        this.requestData();
    },
    methods: {
        uploadAvatar() {
            this.$refs.upload.$el.click();
        },
        requestData() {
            this.$http
                .userGetUserInfo({})
                .then((res) => {
                    this.form.avatar = res.avatar.url
                        ? [null, null, res.avatar.url]
                        : [];
                    this.form.display_name = res.display_name;
                    this.form.desc = res.desc;
                    this.form.sex = res.sex ? res.sex + "" : null;
                    this.form.real_name = res.real_name;
                    this.form.phone_number = res.phone_number;
                    this.form.id_document_number = res.id_document_number;
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
        onSubmit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    if (this.isSubmiting) return;
                    this.isSubmiting = true;
                    this.$http
                        .userPostChangeUserInfo({
                            avatar:
                                this.form.avatar.length > 0
                                    ? this.form.avatar
                                    : "",
                            display_name: this.form.display_name,
                            desc: this.form.desc,
                            sex: this.form.sex,
                            real_name: this.form.real_name,
                            phone_number: this.form.phone_number,
                            id_document_number: this.form.id_document_number,
                        })
                        .then(() => {
                            this.isSubmiting = false;
                            this.$notify({
                                title: "Success",
                                message: "Submitted",
                                type: "success",
                            });
                            this.resetForm();
                            this.$router.push("/account");
                        })
                        .catch((err) => {
                            console.log(err);
                            this.isSubmiting = false;
                            this.$notify({
                                title: "Error",
                                message: err.head ? err.head.msg : err,
                                type: "error",
                            });
                        });
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
        },
    },
};
</script>
<style lang="scss" scoped>
.profile {
    padding: 40px;
    padding-top: 70px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: left;
    margin-bottom: 70px;
    > .title {
        font-family: "Broadway";
        font-size: 38px;
        font-weight: 400;
        text-align: left;
        color: #020202;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 83px;
    }
    .avatar {
        width: 124px;
        height: 124px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        cursor: pointer;
        position: relative;
        margin-bottom: 67px;
        .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            transition: opacity 0.3s ease;
            background-color: rgba(4, 4, 4, 0.6);
            color: white;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .avatar:hover {
        .mask {
            opacity: 1;
        }
    }
}

.el-form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.el-form-item {
    width: 45%;
    margin-right: 5%;
    margin-bottom: 60px;
    ::v-deep .el-form-item__label {
        font-size: 18px;
        font-weight: 400;
        color: #020202;
        min-width: 130px;
        padding-right: 60px;
        letter-spacing: 0px;
        white-space: nowrap;
    }

    .el-radio {
        ::v-deep .el-radio__label {
            font-size: 17px;
            font-weight: 400;
            color: #020202;
            letter-spacing: 0px;
        }
        ::v-deep .el-radio__inner::after {
            background-color: transparent;
        }
        ::v-deep .el-radio__inner.is-checked {
            background-color: #020202;
            border-color: #020202;
        }

        ::v-deep .el-radio__inner {
            border-color: #b7b7b7;
        }
    }
}
.gender-form-item {
    ::v-deep .el-form-item__label {
        min-width: 190px;
    }
}

.input-box {
    width: 290px;
}

.el-button.cancel-button {
    height: 65px;
    width: 290px;
    background: transparent;
    border: 2px solid #020202;
    font-size: 18px;
    border-radius: 0;
    font-weight: 600;
    text-align: center;
    color: #020202;
    letter-spacing: 0px;
    ::v-deep .el-loading-spinner {
        margin-top: -7px;
    }
}
.el-button.submit-button {
    height: 65px;
    width: 290px;
    margin-right: 30px;
    border-radius: 0;
    background: #020202;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
    letter-spacing: 0px;
    ::v-deep .el-loading-spinner {
        margin-top: -7px;
    }
}
</style>
