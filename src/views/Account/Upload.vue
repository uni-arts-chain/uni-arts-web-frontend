/** * Created by Lay Hunt on 2020-12-17 15:04:15. */
<template>
    <div class="upload container">
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/account' }"
                >Profile</el-breadcrumb-item
            >
            <el-breadcrumb-item>Upload</el-breadcrumb-item>
        </el-breadcrumb> -->
        <div class="title">Upload works</div>
        <el-form
            ref="form"
            :model="form"
            label-width="130px"
            :rules="rules"
            label-position="left"
        >
            <el-form-item label="画作标题" prop="name">
                <Input v-model="form.name" />
            </el-form-item>
            <el-form-item label="作品分类" prop="category_id" required>
                <Select
                    v-model="form.category_id"
                    placeholder="请选择作品分类"
                    :options="categories"
                    optionLabel="title"
                    optionValue="id"
                    optionKey="id"
                ></Select>
            </el-form-item>
            <el-form-item label="作品主题" prop="theme_id" required>
                <Select
                    v-model="form.theme_id"
                    placeholder="请选择作品主题"
                    :options="themes"
                    optionLabel="title"
                    optionValue="id"
                    optionKey="id"
                ></Select>
            </el-form-item>
            <el-form-item label="作品材质" prop="material_id" required>
                <Select
                    v-model="form.material_id"
                    placeholder="请选择作品材质"
                    :options="materials"
                    optionLabel="title"
                    optionValue="id"
                    optionKey="id"
                ></Select>
            </el-form-item>
            <el-form-item label="创作日期" prop="produce_at">
                <DatePicker v-model="form.produce_at" placeholder="选择日期" />
            </el-form-item>
            <el-form-item label="尺寸" class="size-form-item" prop="size_width">
                <Input
                    class="size-input"
                    style="margin-right: 10px"
                    v-model="form.size_length"
                    type="number"
                />
                cm X
                <Input
                    class="size-input"
                    style="margin-left: 10px; margin-right: 10px"
                    v-model="form.size_width"
                    type="number"
                />
                cm
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <Input v-model="form.price" append="UART" />
            </el-form-item>
            <el-form-item label="作品说明" prop="details">
                <Textarea
                    v-model="form.details"
                    :minRows="5"
                    :maxRows="5"
                    :rows="5"
                />
            </el-form-item>
            <el-form-item
                class="main-upload"
                label="主图"
                prop="img_main_file1"
            >
                <Upload v-model="form.img_main_file1" :limit="1" />
                <Upload v-model="form.img_main_file2" :limit="1" />
                <Upload v-model="form.img_main_file3" :limit="1" />
            </el-form-item>
            <el-form-item class="detail-upload" label="细节图">
                <div class="detail-box">
                    <Upload v-model="form.img_detail_file1" :limit="1" />
                    <Textarea
                        placeholder="Enter the Detailed description"
                        v-model="form.img_detail_file1_desc"
                        :rows="10"
                        :minRows="10"
                        :maxRows="10"
                    />
                </div>
                <div class="detail-box">
                    <Upload v-model="form.img_detail_file2" :limit="1" />
                    <Textarea
                        placeholder="Enter the Detailed description"
                        v-model="form.img_detail_file2_desc"
                        :rows="10"
                        :minRows="10"
                        :maxRows="10"
                    />
                </div>
                <div class="detail-box">
                    <Upload v-model="form.img_detail_file3" :limit="1" />
                    <Textarea
                        placeholder="Enter the Detailed description"
                        v-model="form.img_detail_file3_desc"
                        :rows="10"
                        :minRows="10"
                        :maxRows="10"
                    />
                </div>
                <div class="detail-box">
                    <Upload v-model="form.img_detail_file4" :limit="1" />
                    <Textarea
                        placeholder="Enter the Detailed description"
                        v-model="form.img_detail_file4_desc"
                        :rows="10"
                        :minRows="10"
                        :maxRows="10"
                    />
                </div>
                <div class="detail-box">
                    <Upload v-model="form.img_detail_file5" :limit="1" />
                    <Textarea
                        placeholder="Enter the Detailed description"
                        v-model="form.img_detail_file5_desc"
                        :rows="10"
                        :minRows="10"
                        :maxRows="10"
                    />
                </div>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button
                    class="submit-button"
                    type="primary"
                    @click="onSubmit"
                    v-loading="isSubmiting"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    >立即创建</el-button
                >
                <el-button
                    class="cancel-button"
                    @click="$router.push('/account')"
                    >取消</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { Form, FormItem, Button, Dialog } from "element-ui";
import Input from "@/components/Input";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import Textarea from "@/components/Textarea";
import Upload from "@/components/Upload";
export default {
    name: "upload",
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Button.name]: Button,
        [Dialog.name]: Dialog,
        Input,
        Select,
        DatePicker,
        Textarea,
        Upload,
    },
    data() {
        return {
            form: {
                name: "",
                category_id: "",
                theme_id: "",
                material_id: "",
                produce_at: "",
                size_length: "",
                size_width: "",
                details: "",
                price: "",
                fee: "",
                img_main_file1: "",
                img_main_file2: "",
                img_main_file3: "",
                img_detail_file1_desc: "",
                img_detail_file2_desc: "",
                img_detail_file3_desc: "",
                img_detail_file4_desc: "",
                img_detail_file5_desc: "",
            },
            isSubmiting: false,
            rules: {
                name: [
                    { required: true, message: "请输入标题", trigger: "blur" },
                ],
                category_id: [
                    { required: true, message: "请选择分类", trigger: "blur" },
                ],
                theme_id: [
                    { required: true, message: "请选择主题", trigger: "blur" },
                ],
                material_id: [
                    { required: true, message: "请选择材质", trigger: "blur" },
                ],
                produce_at: [
                    {
                        required: true,
                        message: "请选择创作日期",
                        trigger: "blur",
                    },
                ],
                size_length: [
                    {
                        required: true,
                        message: "请输入作品长度",
                        trigger: "blur",
                    },
                ],
                size_width: [
                    {
                        required: true,
                        message: "请输入作品宽度",
                        trigger: "blur",
                    },
                ],
                details: [
                    { required: true, message: "请输入说明", trigger: "blur" },
                ],
                price: [
                    { required: true, message: "请输入价格", trigger: "blur" },
                ],
                img_main_file1: [
                    {
                        required: true,
                        message: "请至少上传一张主图",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        categories() {
            return this.$store.state.art.categories;
        },
        materials() {
            return this.$store.state.art.materials;
        },
        themes() {
            return this.$store.state.art.themes;
        },
    },
    methods: {
        onSubmit() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    if (this.isSubmiting) return;
                    this.isSubmiting = true;
                    let obj = {
                        name: this.form.name,
                        category_id: this.form.category_id,
                        theme_id: this.form.theme_id,
                        material_id: this.form.material_id,
                        produce_at: this.form.produce_at / 1000,
                        size_length: this.form.size_length,
                        size_width: this.form.size_width,
                        details: this.form.details,
                        price: this.form.price,
                        img_main_file1: this.form.img_main_file1[0],
                        img_main_file2: this.form.img_main_file2
                            ? this.form.img_main_file2[0]
                            : "",
                        img_main_file3: this.form.img_main_file3
                            ? this.form.img_main_file3[0]
                            : "",
                        img_detail_file1: this.form.img_detail_file1
                            ? this.form.img_detail_file1[0]
                            : "",
                        img_detail_file2: this.form.img_detail_file2
                            ? this.form.img_detail_file2[0]
                            : "",
                        img_detail_file3: this.form.img_detail_file3
                            ? this.form.img_detail_file3[0]
                            : "",
                        img_detail_file4: this.form.img_detail_file4
                            ? this.form.img_detail_file4[0]
                            : "",
                        img_detail_file5: this.form.img_detail_file5
                            ? this.form.img_detail_file5[0]
                            : "",
                        img_detail_file1_desc: this.form.img_detail_file1_desc,
                        img_detail_file2_desc: this.form.img_detail_file2_desc,
                        img_detail_file3_desc: this.form.img_detail_file3_desc,
                        img_detail_file4_desc: this.form.img_detail_file4_desc,
                        img_detail_file5_desc: this.form.img_detail_file5_desc,
                    };
                    console.log(obj);
                    this.$http
                        .userPostArt(obj)
                        .then(() => {
                            this.isSubmiting = false;
                            this.$notify({
                                title: "Success",
                                message: "Submitted",
                                type: "success",
                            });
                            this.resetForm();
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
            Object.keys(this.form).forEach((v) => (this.form[v] = ""));
        },
    },
};
</script>
<style lang="scss" scoped>
.upload {
    padding: 40px;
    padding-top: 70px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: left;
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
}
.el-form {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.el-form-item {
    width: 40%;
    margin-right: 10%;
    margin-bottom: 50px;
    ::v-deep .el-form-item__label {
        font-size: 17px;
        font-weight: 400;
        text-align: center;
        color: #020202;
        letter-spacing: 0px;
    }
    .size-input {
        width: 90px;
    }
}
.size-form-item ::v-deep .el-form-item__content {
    font-size: 17px;
    font-weight: 400;
    color: #020202;
    letter-spacing: 0px;
}
.main-upload {
    width: 100%;
    ::v-deep .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .uni-upload {
        width: 300px;
    }
}
.detail-upload {
    width: 100%;
    .uni-upload {
        width: 300px;
        margin-bottom: 30px;
    }
    .detail-box {
        display: flex;
    }
    /* ::v-deep .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: center;
    } */
}
/* .el-breadcrumb {
    margin-bottom: 60px;
} */

.el-button.cancel-button {
    height: 65px;
    width: 300px;
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
    width: 300px;
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
