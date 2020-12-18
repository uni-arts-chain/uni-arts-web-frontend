/** * Created by Lay Hunt on 2020-12-17 15:04:15. */
<template>
    <div class="upload">
        <el-form
            ref="form"
            :model="form"
            label-width="130px"
            :rules="rules"
            label-position="left"
        >
            <el-form-item label="画作标题" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="作品分类" prop="category_id">
                <el-select
                    v-model="form.category_id"
                    placeholder="请选择作品分类"
                >
                    <el-option
                        :key="i"
                        :label="v.title"
                        :value="v.id"
                        v-for="(v, i) in categories"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作品主题" prop="theme_id">
                <el-select v-model="form.theme_id" placeholder="请选择作品主题">
                    <el-option
                        :key="i"
                        :label="v.title"
                        :value="v.id"
                        v-for="(v, i) in themes"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作品材质" prop="material_id">
                <el-select
                    v-model="form.material_id"
                    placeholder="请选择作品材质"
                >
                    <el-option
                        :key="i"
                        :label="v.title"
                        :value="v.id"
                        v-for="(v, i) in materials"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创作日期" prop="produce_at">
                <el-date-picker
                    value-format="yyyy-MM-dd HH-mm-ss"
                    v-model="form.produce_at"
                    type="date"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="作品尺寸(长 cm)" prop="size_length">
                <el-input v-model="form.size_length" type="number"></el-input>
            </el-form-item>
            <el-form-item label="作品尺寸(宽 cm)" prop="size_width">
                <el-input v-model="form.size_width" type="number"></el-input>
            </el-form-item>
            <el-form-item label="作品说明" prop="details">
                <el-input type="textarea" v-model="form.details"></el-input>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="主图" required>
                <el-upload
                    action="#"
                    :limit="3"
                    list-type="picture-card"
                    :file-list="img_main_list"
                    :on-exceed="onExceed"
                    :on-change="onChange"
                    :auto-upload="false"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.file.url"
                            alt=""
                        />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                            >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="细节图" required>
                <el-upload
                    action="#"
                    :limit="5"
                    :file-list="img_detail_list"
                    list-type="picture-card"
                    :on-exceed="onDetailExceed"
                    :on-change="onDetailChange"
                    :auto-upload="false"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.file.url"
                            alt=""
                        />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                class="el-upload-list__item-delete"
                                @click="handleDetailRemove(file)"
                            >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item
                :label="`细节图${i + 1}说明`"
                v-for="(v, i) in img_detail_list"
                :key="i"
                error="请输入细节描述"
            >
                <el-input
                    v-model="form[`img_detail_file${i + 1}_desc`]"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>
<script>
import {
    Form,
    FormItem,
    Button,
    Select,
    Option,
    Input,
    DatePicker,
    Upload,
    Dialog,
} from "element-ui";
export default {
    name: "upload",
    components: {
        [Form.name]: Form,
        [FormItem.name]: FormItem,
        [Button.name]: Button,
        [Select.name]: Select,
        [Option.name]: Option,
        [Input.name]: Input,
        [DatePicker.name]: DatePicker,
        [Upload.name]: Upload,
        [Dialog.name]: Dialog,
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
                img_detail_file1_desc: "",
                img_detail_file2_desc: "",
                img_detail_file3_desc: "",
                img_detail_file4_desc: "",
                img_detail_file5_desc: "",
            },
            img_main_list: [],
            img_detail_list: [],
            dialogImageUrl: "",
            dialogVisible: false,
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
                    let obj = {
                        name: this.form.name,
                        category_id: this.form.category_id,
                        theme_id: this.form.theme_id,
                        material_id: this.form.material_id,
                        produce_at: this.form.produce_at,
                        size_length: this.form.size_length,
                        size_width: this.form.size_width,
                        details: this.form.details,
                        price: this.form.price,
                    };
                    this.filetoBlob(this.img_main_list, obj).then(() => {
                        this.filetoBlob(this.img_detail_list, obj).then(() => {
                            this.$http.userPostArt(obj).then((res) => {
                                console.log(res);
                            });
                        });
                    });
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleRemove(file) {
            console.log(this.img_main_list);
            console.log(file);
            let index = this.img_main_list.findIndex((v) => v.uid == file.uid);
            index >= 0 ? this.img_main_list.splice(index, 1) : "";
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        handleDetailRemove(file) {
            console.log(this.img_detail_list);
            let index = this.img_detail_list.findIndex(
                (v) => v.uid == file.uid
            );
            index >= 0 ? this.img_detail_list.splice(index, 1) : "";
        },
        onExceed() {
            this.$notify({
                title: "Warning",
                type: "warning",
                message: "超出可上传数量",
            });
        },
        onDetailExceed() {
            this.$notify({
                title: "Warning",
                type: "warning",
                message: "超出可上传数量",
            });
        },
        onChange(file) {
            this.img_main_list.push({
                field: "img_main_file" + (this.img_main_list.length + 1),
                file: file,
            });
        },
        onDetailChange(file) {
            this.img_detail_list.push({
                field: "img_detail_file" + (this.img_detail_list.length + 1),
                file: file,
            });
        },
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(",");
            var mime = arr[0].match(/:(.*?);/)[1];
            var bstr = atob(arr[1].replace(/\s/g, ""));
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
        filetoBlob(list, obj) {
            return new Promise((resolve) => {
                if (list.length > 0) {
                    for (let i = 0; i < list.length; i++) {
                        let reader = new FileReader();
                        reader.onload = (event) => {
                            obj[list[i].field] = [
                                this.dataURLtoBlob(event.target.result),
                                `${list[i].file.raw.name}`,
                            ];
                            if (i >= list.length - 1) {
                                resolve();
                            }
                        };
                        reader.readAsDataURL(list[i].file.raw);
                    }
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.upload {
    padding: 40px;
    padding-top: 70px;
    padding-left: 60px;
    text-align: left;
}
.el-form {
    width: 70%;
}
</style>
