/** * Created by Lay Hunt on 2020-12-17 15:04:15. */
<template>
    <div class="upload container">
        <div class="title">Upload Works</div>
        <div class="pc">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                class="pc"
                label-position="left"
                label-width="130px"
            >
                <el-form-item label="Name" prop="name">
                    <Input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Category" prop="category_id">
                    <Select
                        v-model="form.category_id"
                        :options="categories"
                        optionKey="id"
                        optionLabel="title"
                        optionValue="id"
                        placeholder="select"
                    ></Select>
                </el-form-item>
                <el-form-item label="Theme" prop="theme_id">
                    <Select
                        v-model="form.theme_id"
                        :options="themes"
                        optionKey="id"
                        optionLabel="title"
                        optionValue="id"
                        placeholder="select"
                    ></Select>
                </el-form-item>
                <el-form-item label="Material" prop="material_id">
                    <Select
                        v-model="form.material_id"
                        :options="materials"
                        optionKey="id"
                        optionLabel="title"
                        optionValue="id"
                        placeholder="select"
                    ></Select>
                </el-form-item>
                <el-form-item label="Date" prop="produce_at">
                    <DatePicker
                        v-model="form.produce_at"
                        placeholder="select"
                    />
                </el-form-item>
                <el-form-item class="size-form-item" label="Size" required>
                    <el-form-item class="size-length" prop="size_length">
                        <Input
                            v-model="form.size_length"
                            class="size-input"
                            style="margin-right: 10px"
                            type="number"
                        />
                    </el-form-item>
                    cm X
                    <el-form-item class="size-width" prop="size_width">
                        <Input
                            v-model="form.size_width"
                            class="size-input"
                            style="margin-left: 10px; margin-right: 10px"
                            type="number"
                        />
                    </el-form-item>
                    cm
                </el-form-item>
                <el-form-item label="Royalty" prop="royalty">
                    <Input
                        v-model="form.royalty"
                        append="%"
                        style="width: 140px"
                        type="number"
                    />
                </el-form-item>
                <el-form-item label="Royalty Date" prop="royalty_expired_at">
                    <DatePicker
                        v-model="form.royalty_expired_at"
                        placeholder="select"
                    />
                </el-form-item>
                <el-form-item label="Price" prop="price">
                    <Input
                        v-model="form.price"
                        :append="symbol.toUpperCase()"
                    />
                </el-form-item>
                <el-form-item label="Description" prop="details">
                    <Textarea
                        v-model="form.details"
                        :maxRows="5"
                        :minRows="5"
                        :rows="5"
                    />
                </el-form-item>
                <el-form-item label="Refungible" required style="width: 100%">
                    <div class="split-body" style="height: 45px">
                        <Radio
                            v-model="splitType"
                            :list="splitList"
                            style="width: 30%"
                        />
                        <div v-if="splitType == 'multiple'" style="width: 70%">
                            <Select
                                v-model="form.refungible_decimal"
                                :options="refungibleList"
                                optionKey="value"
                                optionLabel="value"
                                optionValue="value"
                                placeholder="select"
                                style="210px"
                            ></Select>
                            <span
                                style="
                                    font-size: 17px;
                                    font-weight: 400;
                                    margin-left: 30px;
                                "
                                >Split into
                                {{ form.refungible_decimal }} parts</span
                            >
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="Type" required>
                    <Radio v-model="uploadType" :list="typeList" />
                </el-form-item>
                <el-form-item />
                <div v-if="uploadType == 'art'" class="main-upload-parent">
                    <el-form-item class="main-upload" label="Main" required>
                        <el-form-item
                            class="upload-form-item"
                            prop="img_main_file1"
                        >
                            <Upload v-model="form.img_main_file1" />
                        </el-form-item>
                        <el-form-item
                            class="upload-form-item"
                            prop="img_main_file2"
                        >
                            <Upload v-model="form.img_main_file2" />
                        </el-form-item>
                        <el-form-item
                            class="upload-form-item"
                            prop="img_main_file3"
                        >
                            <Upload v-model="form.img_main_file3" />
                        </el-form-item>
                    </el-form-item>
                </div>
                <div v-if="uploadType == 'live2d'" class="main-upload-parent">
                    <el-form-item
                        class="live2d-upload-form-item"
                        label="Live2D"
                        required
                    >
                        <File
                            :fileObject="uploadLive2dFile"
                            :isLoading="isUploadLive2D"
                            :upload="uploadZip"
                        />
                        <div class="live2d-preview">
                            <Live2DView
                                ref="live2d"
                                :canView="isLive2dUploadDone"
                                :modelName="uploadLive2dFile.live2d_file"
                                :path="uploadLive2dFile.live2d_ipfs_url"
                                height="100%"
                                width="100%"
                                @shotCanvas="shotCanvas"
                            />
                        </div>
                    </el-form-item>
                </div>
                <el-form-item class="detail-upload" label="Detail">
                    <div class="detail-box">
                        <el-form-item
                            class="upload-form-item"
                            prop="img_detail_file1"
                        >
                            <Upload v-model="form.img_detail_file1" />
                        </el-form-item>
                        <el-form-item
                            class="textarea-form-item"
                            prop="img_detail_file1_desc"
                        >
                            <Textarea
                                v-model="form.img_detail_file1_desc"
                                :maxRows="10"
                                :minRows="10"
                                :rows="10"
                                placeholder="Enter the Detailed description"
                            />
                        </el-form-item>
                    </div>
                    <div class="detail-box">
                        <el-form-item
                            class="upload-form-item"
                            prop="img_detail_file2"
                        >
                            <Upload v-model="form.img_detail_file2" />
                        </el-form-item>
                        <el-form-item
                            class="textarea-form-item"
                            prop="img_detail_file2_desc"
                        >
                            <Textarea
                                v-model="form.img_detail_file2_desc"
                                :maxRows="10"
                                :minRows="10"
                                :rows="10"
                                placeholder="Enter the Detailed description"
                            />
                        </el-form-item>
                    </div>
                    <div class="detail-box">
                        <el-form-item
                            class="upload-form-item"
                            prop="img_detail_file3"
                        >
                            <Upload v-model="form.img_detail_file3" />
                        </el-form-item>
                        <el-form-item
                            class="textarea-form-item"
                            prop="img_detail_file3_desc"
                        >
                            <Textarea
                                v-model="form.img_detail_file3_desc"
                                :maxRows="10"
                                :minRows="10"
                                :rows="10"
                                placeholder="Enter the Detailed description"
                            />
                        </el-form-item>
                    </div>
                    <div class="detail-box">
                        <el-form-item
                            class="upload-form-item"
                            prop="img_detail_file4"
                        >
                            <Upload v-model="form.img_detail_file4" />
                        </el-form-item>
                        <el-form-item
                            class="textarea-form-item"
                            prop="img_detail_file4_desc"
                        >
                            <Textarea
                                v-model="form.img_detail_file4_desc"
                                :maxRows="10"
                                :minRows="10"
                                :rows="10"
                                placeholder="Enter the Detailed description"
                            />
                        </el-form-item>
                    </div>
                    <div class="detail-box">
                        <el-form-item
                            class="upload-form-item"
                            prop="img_detail_file5"
                        >
                            <Upload v-model="form.img_detail_file5" />
                        </el-form-item>
                        <el-form-item
                            class="textarea-form-item"
                            prop="img_detail_file5_desc"
                        >
                            <Textarea
                                v-model="form.img_detail_file5_desc"
                                :maxRows="10"
                                :minRows="10"
                                :rows="10"
                                placeholder="Enter the Detailed description"
                            />
                        </el-form-item>
                    </div>
                </el-form-item>
                <el-form-item style="width: 100%">
                    <el-button
                        v-loading="isSubmiting"
                        class="submit-button"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        element-loading-spinner="el-icon-loading"
                        type="primary"
                        @click="onSubmit"
                        >Upload
                    </el-button>
                    <el-button
                        class="cancel-button"
                        @click="$router.push('/account')"
                        >Cancel
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="mobile">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                class="mobile"
                label-position="left"
                label-width="130px"
            >
                <el-form-item label="Name" prop="name">
                    <Input v-model="form.name" />
                </el-form-item>
                <el-form-item label="Category" prop="category_id">
                    <Select
                        v-model="form.category_id"
                        :options="categories"
                        optionKey="id"
                        optionLabel="title"
                        optionValue="id"
                        placeholder="select"
                    ></Select>
                </el-form-item>
                <el-form-item label="Theme" prop="theme_id">
                    <Select
                        v-model="form.theme_id"
                        :options="themes"
                        optionKey="id"
                        optionLabel="title"
                        optionValue="id"
                        placeholder="select"
                    ></Select>
                </el-form-item>
                <el-form-item label="Material" prop="material_id">
                    <Select
                        v-model="form.material_id"
                        :options="materials"
                        optionKey="id"
                        optionLabel="title"
                        optionValue="id"
                        placeholder="select"
                    ></Select>
                </el-form-item>
                <el-form-item label="Date" prop="produce_at">
                    <DatePicker
                        v-model="form.produce_at"
                        placeholder="select"
                    />
                </el-form-item>
                <el-form-item label="Size X" required prop="size_length">
                    <Input
                        v-model="form.size_length"
                        class="size-input"
                        style="margin-right: 10px"
                        append="cm"
                        type="number"
                    />
                </el-form-item>
                <el-form-item label="Size Y" prop="size_width" required>
                    <Input
                        v-model="form.size_width"
                        class="size-input"
                        style="margin-left: 10px; margin-right: 10px"
                        type="number"
                        append="cm"
                    />
                </el-form-item>
                <el-form-item label="Royalty" prop="royalty">
                    <Input v-model="form.royalty" append="%" type="number" />
                </el-form-item>
                <el-form-item label="Royalty Date" prop="royalty_expired_at">
                    <DatePicker
                        v-model="form.royalty_expired_at"
                        placeholder="select"
                    />
                </el-form-item>
                <el-form-item label="Price" prop="price">
                    <Input
                        v-model="form.price"
                        :append="symbol.toUpperCase()"
                    />
                </el-form-item>
                <el-form-item label="Description" prop="details">
                    <Textarea
                        v-model="form.details"
                        :maxRows="5"
                        :minRows="5"
                        :rows="5"
                    />
                </el-form-item>
                <el-form-item label="Refungible" required>
                    <el-radio
                        v-model="splitType"
                        :label="v"
                        v-for="(v, i) in splitList"
                        :key="i"
                    >
                        {{ v }}
                    </el-radio>
                </el-form-item>
                <el-form-item v-if="splitType == 'multiple'" label="Parts">
                    <Select
                        v-model="form.refungible_decimal"
                        :options="refungibleList"
                        optionKey="value"
                        optionLabel="value"
                        optionValue="value"
                        placeholder="select"
                    ></Select>
                    <span
                        style="
                            font-size: 13px;
                            font-weight: 400;
                            margin-left: 0;
                        "
                    >
                        Split into {{ form.refungible_decimal }} parts
                    </span>
                </el-form-item>
                <el-form-item label="Type" required>
                    <el-radio
                        v-model="uploadType"
                        :label="v"
                        v-for="(v, i) in typeList"
                        :key="i"
                    >
                        {{ v }}
                    </el-radio>
                </el-form-item>
                <el-form-item />
                <div v-if="uploadType == 'art'" class="main-upload-parent">
                    <el-form-item
                        label="Main"
                        class="upload-form-item"
                        prop="img_main_file1"
                    >
                        <Upload v-model="form.img_main_file1" />
                    </el-form-item>
                    <el-form-item
                        class="upload-form-item"
                        prop="img_main_file2"
                    >
                        <Upload v-model="form.img_main_file2" />
                    </el-form-item>
                    <el-form-item
                        class="upload-form-item"
                        prop="img_main_file3"
                    >
                        <Upload v-model="form.img_main_file3" />
                    </el-form-item>
                </div>
                <div v-if="uploadType == 'live2d'" class="main-upload-parent">
                    <el-form-item
                        class="live2d-upload-form-item"
                        label="Live2D"
                        required
                    >
                        <File
                            :fileObject="uploadLive2dFile"
                            :isLoading="isUploadLive2D"
                            :upload="uploadZip"
                        />
                        <div class="live2d-preview">
                            <Live2DView
                                ref="live2d"
                                :canView="isLive2dUploadDone"
                                :modelName="uploadLive2dFile.live2d_file"
                                :path="uploadLive2dFile.live2d_ipfs_url"
                                height="100%"
                                width="100%"
                                @shotCanvas="shotCanvas"
                            />
                        </div>
                    </el-form-item>
                </div>
                <el-form-item class="detail-upload" label="Detail">
                    <div class="detail-box">
                        <!--                        <el-form-item-->
                        <!--                            class="upload-form-item"-->
                        <!--                            prop="img_detail_file1"-->
                        <!--                        >-->
                        <Upload v-model="form.img_detail_file1" />
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item-->
                        <!--                            class="textarea-form-item"-->
                        <!--                            prop="img_detail_file1_desc"-->
                        <!--                        >-->
                        <Textarea
                            v-model="form.img_detail_file1_desc"
                            :maxRows="10"
                            :minRows="10"
                            :rows="10"
                            placeholder="Enter the Detailed description"
                        />
                        <!--                        </el-form-item>-->
                    </div>
                    <div class="detail-box">
                        <!--                        <el-form-item-->
                        <!--                            class="upload-form-item"-->
                        <!--                            prop="img_detail_file2"-->
                        <!--                        >-->
                        <Upload v-model="form.img_detail_file2" />
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item-->
                        <!--                            class="textarea-form-item"-->
                        <!--                            prop="img_detail_file2_desc"-->
                        <!--                        >-->
                        <Textarea
                            v-model="form.img_detail_file2_desc"
                            :maxRows="10"
                            :minRows="10"
                            :rows="10"
                            placeholder="Enter the Detailed description"
                        />
                        <!--                        </el-form-item>-->
                    </div>
                    <div class="detail-box">
                        <!--                        <el-form-item-->
                        <!--                            class="upload-form-item"-->
                        <!--                            prop="img_detail_file3"-->
                        <!--                        >-->
                        <Upload v-model="form.img_detail_file3" />
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item-->
                        <!--                            class="textarea-form-item"-->
                        <!--                            prop="img_detail_file3_desc"-->
                        <!--                        >-->
                        <Textarea
                            v-model="form.img_detail_file3_desc"
                            :maxRows="10"
                            :minRows="10"
                            :rows="10"
                            placeholder="Enter the Detailed description"
                        />
                        <!--                        </el-form-item>-->
                    </div>
                    <div class="detail-box">
                        <!--                        <el-form-item-->
                        <!--                            class="upload-form-item"-->
                        <!--                            prop="img_detail_file4"-->
                        <!--                        >-->
                        <Upload v-model="form.img_detail_file4" />
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item-->
                        <!--                            class="textarea-form-item"-->
                        <!--                            prop="img_detail_file4_desc"-->
                        <!--                        >-->
                        <Textarea
                            v-model="form.img_detail_file4_desc"
                            :maxRows="10"
                            :minRows="10"
                            :rows="10"
                            placeholder="Enter the Detailed description"
                        />
                        <!--                        </el-form-item>-->
                    </div>
                    <div class="detail-box">
                        <!--                        <el-form-item-->
                        <!--                            class="upload-form-item"-->
                        <!--                            prop="img_detail_file5"-->
                        <!--                        >-->
                        <Upload v-model="form.img_detail_file5" />
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item-->
                        <!--                            class="textarea-form-item"-->
                        <!--                            prop="img_detail_file5_desc"-->
                        <!--                        >-->
                        <Textarea
                            v-model="form.img_detail_file5_desc"
                            :maxRows="10"
                            :minRows="10"
                            :rows="10"
                            placeholder="Enter the Detailed description"
                        />
                        <!--                        </el-form-item>-->
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button
                        v-loading="isSubmiting"
                        class="submit-button"
                        element-loading-background="rgba(0, 0, 0, 0.8)"
                        element-loading-spinner="el-icon-loading"
                        type="primary"
                        @click="onSubmit"
                        >Upload
                    </el-button>
                    <el-button
                        class="cancel-button"
                        @click="$router.push('/account')"
                        >Cancel
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { Form, FormItem, Button, Dialog } from "element-ui";
import { BigNumber } from "bignumber.js";
import Input from "@/components/Input";
import Select from "@/components/Select";
import DatePicker from "@/components/DatePicker";
import Textarea from "@/components/Textarea";
import Upload from "@/components/Upload";
import FileUpload from "@/components/File";
import Live2DView from "@/components/Live2DView";
import Radio from "@/components/Radio";

import { dataURLtoBlob } from "@/utils/index";

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
        // Tab,
        // CheckBox,
        Radio,
        ["File"]: FileUpload,
        Live2DView,
    },
    data() {
        let fileValidator = (rule, value, callback) => {
            if (
                !value &&
                !this.form.img_detail_file2[0] &&
                !this.form.img_detail_file3[0]
            ) {
                return callback(new Error("至少上传一张主图"));
            } else {
                callback();
            }
        };
        let persentValidator = (rule, value, callback) => {
            if (value) {
                let numberArray = new BigNumber(value)
                    .mod(1)
                    .toString()
                    .split(".");
                if (numberArray.length == 2 && numberArray[1].length > 2) {
                    return callback(new Error("最多2位小数"));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            uploadType: "art",
            splitType: "single",
            splitList: ["single", "multiple"],
            refungibleList: [
                {
                    value: 10,
                },
                {
                    value: 100,
                },
                {
                    value: 1000,
                },
                {
                    value: 10000,
                },
            ],
            typeList: ["art", "live2d"],
            canvasInstance: {},
            isUploadLive2D: false,
            isLive2dUploadDone: false,
            uploadLive2dFile: {
                live2d_file: "",
                live2d_ipfs_hash: "",
                live2d_ipfs_url: "",
                live2d_ipfs_zip_hash: "",
            },
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
                royalty: "",
                royalty_expired_at: "",
                live2d_file: "",
                live2d_ipfs_hash: "",
                fee: "",
                refungible: false,
                refungible_decimal: 10,
                img_main_file1: [],
                img_main_file2: [],
                img_main_file3: [],
                img_detail_file1: [],
                img_detail_file2: [],
                img_detail_file3: [],
                img_detail_file4: [],
                img_detail_file5: [],
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
                    {
                        required: true,
                        message: "请选择分类",
                        trigger: "change",
                    },
                ],
                theme_id: [
                    {
                        required: true,
                        message: "请选择主题",
                        trigger: "change",
                    },
                ],
                material_id: [
                    {
                        required: true,
                        message: "请选择材质",
                        trigger: "change",
                    },
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
                    { required: false, message: "请输入说明", trigger: "blur" },
                ],
                price: [
                    { required: false, message: "请输入价格", trigger: "blur" },
                ],
                royalty: [
                    {
                        required: false,
                        validator: persentValidator,
                        message: "请输入最多2位小数的百分比",
                        trigger: "blur",
                    },
                ],
                royalty_expired_at: [
                    {
                        required: false,
                        message: "请选择版税截止日期",
                        trigger: "blur",
                    },
                ],
                img_main_file1: [
                    {
                        required: true,
                        validator: fileValidator,
                        trigger: "change",
                    },
                ],
            },
        };
    },
    computed: {
        symbol() {
            return this.$store.state.global.symbol;
        },
        categories() {
            return this.$store.state.art.categories;
        },
        materials() {
            return this.$store.state.art.materials;
        },
        themes() {
            return this.$store.state.art.themes;
        },
        isRoyalty() {
            return this.form.royalty ? true : false;
        },
    },
    watch: {
        "form.royalty"(value) {
            if (value) {
                this.rules.royalty_expired_at[0].required = true;
            } else {
                this.rules.royalty_expired_at[0].required = false;
            }
        },
    },
    methods: {
        uploadZip(fileData) {
            console.log(fileData);
            this.isUploadLive2D = true;
            this.isLive2dUploadDone = false;
            this.$http
                .userPostZip({
                    live2d_file: fileData,
                })
                .then((res) => {
                    this.uploadLive2dFile = res;
                    this.isLive2dUploadDone = true;
                    this.isUploadLive2D = false;
                })
                .catch((err) => {
                    this.isUploadLive2D = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        shotCanvas(canvasInstance) {
            this.canvasInstance = canvasInstance;
        },
        onSubmit() {
            if (this.uploadType == "live2d" && this.canvasInstance.toDataURL) {
                let canvasImgPngBase64 = this.canvasInstance.toDataURL();
                console.log(canvasImgPngBase64);
                let file = dataURLtoBlob(canvasImgPngBase64);
                let fileData = new File(
                    [file],
                    this.uploadLive2dFile.live2d_file + ".png",
                    { type: file.type }
                );
                console.log(fileData);
                let fileDataList = [
                    fileData,
                    fileData.name,
                    canvasImgPngBase64,
                ];
                this.form.img_main_file1 = fileDataList;
            }
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
                        is_refungible:
                            this.splitType == "single" ? "false" : "true",
                        refungible_decimal: this.form.refungible_decimal,
                        royalty: this.form.royalty
                            ? this.form.royalty / 100
                            : "",
                        royalty_expired_at: this.form.royalty_expired_at
                            ? parseInt(
                                  this.form.royalty_expired_at.getTime() / 1000
                              ) * 1000
                            : "",
                        img_main_file1: this.form.img_main_file1[0]
                            ? this.form.img_main_file1
                            : "",
                        img_main_file2: this.form.img_main_file2[0]
                            ? this.form.img_main_file2
                            : "",
                        img_main_file3: this.form.img_main_file3[0]
                            ? this.form.img_main_file3
                            : "",
                        img_detail_file1: this.form.img_detail_file1[0]
                            ? this.form.img_detail_file1
                            : "",
                        img_detail_file2: this.form.img_detail_file2[0]
                            ? this.form.img_detail_file2
                            : "",
                        img_detail_file3: this.form.img_detail_file3[0]
                            ? this.form.img_detail_file3
                            : "",
                        img_detail_file4: this.form.img_detail_file4[0]
                            ? this.form.img_detail_file4
                            : "",
                        img_detail_file5: this.form.img_detail_file5[0]
                            ? this.form.img_detail_file5
                            : "",
                        img_detail_file1_desc: this.form.img_detail_file1_desc,
                        img_detail_file2_desc: this.form.img_detail_file2_desc,
                        img_detail_file3_desc: this.form.img_detail_file3_desc,
                        img_detail_file4_desc: this.form.img_detail_file4_desc,
                        img_detail_file5_desc: this.form.img_detail_file5_desc,
                        live2d_file: this.uploadLive2dFile.live2d_file
                            ? this.uploadLive2dFile.live2d_file
                            : "",
                        live2d_ipfs_hash: this.uploadLive2dFile.live2d_ipfs_hash
                            ? this.uploadLive2dFile.live2d_ipfs_hash
                            : "",
                        live2d_ipfs_zip_hash: this.uploadLive2dFile
                            .live2d_ipfs_zip_hash
                            ? this.uploadLive2dFile.live2d_ipfs_zip_hash
                            : "",
                    };
                    if (!this.form.img_main_file1[0]) {
                        if (this.form.img_main_file2[0]) {
                            obj.img_main_file1 = this.form.img_main_file2;
                            obj.img_main_file2 = this.form.img_main_file3[0]
                                ? this.form.img_main_file3
                                : "";
                            obj.img_main_file3 = "";
                        } else if (this.form.img_main_file3[0]) {
                            obj.img_main_file1 = this.form.img_main_file3;
                            obj.img_main_file2 = "";
                            obj.img_main_file3 = "";
                        }
                    } else {
                        (obj.img_main_file1 = this.form.img_main_file1[0]
                            ? this.form.img_main_file1
                            : ""),
                            (obj.img_main_file2 = this.form.img_main_file2[0]
                                ? this.form.img_main_file2
                                : ""),
                            (obj.img_main_file3 = this.form.img_main_file3[0]
                                ? this.form.img_main_file3
                                : "");
                    }
                    this.$http
                        .userPostArt(obj)
                        .then(() => {
                            this.isSubmiting = false;
                            this.$notify.success("Submitted");
                            this.resetForm();
                        })
                        .catch((err) => {
                            console.log(err);
                            this.isSubmiting = false;
                            this.$notify.error(err.head ? err.head.msg : err);
                        });
                }
            });
        },
        resetForm() {
            this.$refs.form.resetFields();
            this.$refs.live2d && this.$refs.live2d.reset();

            this.uploadLive2dFile.live2d_file = "";
            this.uploadLive2dFile.live2d_ipfs_hash = "";
            this.uploadLive2dFile.live2d_ipfs_url = "";
        },
    },
};
</script>
<style lang="scss" scoped>
.upload {
    @media screen and (max-width: 970px) {
        padding: 15px 0px 20px;
    }
    padding: 70px 0px 40px;
    text-align: left;

    > .title {
        @media screen and (max-width: 970px) {
            font-size: 24px;
            margin-bottom: 30px;
            margin-top: 10px;
        }
        font-family: "Broadway";
        font-size: 38px;
        font-weight: 400;
        text-align: center;
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
    @media screen and (max-width: 970px) {
        flex-direction: column;
    }
}

.el-form-item {
    width: 40%;
    @media screen and (max-width: 970px) {
        width: 100%;
        margin-bottom: 20px;
        margin-right: 0;
    }
    margin-right: 10%;
    margin-bottom: 50px;

    ::v-deep .el-form-item__label {
        @media screen and (max-width: 970px) {
            width: 30% !important;
            font-size: 15px;
        }
        font-size: 17px;
        font-weight: 400;
        text-align: right;
        color: #020202;
        letter-spacing: 0;
    }

    ::v-deep .el-form-item__content {
        @media screen and (max-width: 970px) {
            width: 70% !important;
            margin-left: 30% !important;
            > div {
                width: 90%;
            }
        }
    }

    .size-input {
        @media screen and (max-width: 970px) {
            width: 100%;
            position: relative;
        }
        width: 90px;
        margin: 0 !important;
    }
}

.size-form-item {
    .size-length,
    .size-width {
        @media screen and (max-width: 970px) {
            width: 33%;
            //margin-left: 30%;
            margin-right: 0;
        }
        width: 90px;
        margin-right: 10px;
        display: inline-block;
        margin-bottom: 0;

        ::v-deep .el-form-item__content {
            @media screen and (max-width: 970px) {
                margin-left: 0 !important;
                width: 100% !important;
            }
        }
    }

    ::v-deep .el-form-item__content {
        @media screen and (max-width: 970px) {
            position: relative;
            margin-left: 30% !important;
            display: flex;
            flex-direction: row;
        }
        margin-left: 0;
        font-size: 17px;
        font-weight: 400;
        color: #020202;
        letter-spacing: 0px;
    }
}

.main-upload {
    width: 100%;

    ::v-deep .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        @media screen and (max-width: 970px) {
            flex-direction: column;
        }
    }

    .uni-upload {
        @media screen and (max-width: 970px) {
            width: 100%;
            position: relative;
        }
        width: 300px;
    }

    .upload-form-item {
        ::v-deep .el-form-item__content {
            @media screen and (max-width: 970px) {
                margin-left: 0 !important;
            }
        }

        @media screen and (max-width: 970px) {
            width: 100%;
            position: relative;
        }
        width: 300px;
        margin-right: 0;
        margin-bottom: 0;
    }

    .textarea-form-item {
        margin-right: 0;
        width: calc(100% - 300px);
    }
}

.live2d-upload-form-item {
    width: 100%;

    ::v-deep .el-form-item__content {
        display: flex;
        align-items: flex-start;
    }

    .live2d-preview {
        width: 500px;
        height: 500px;
        background: white;
        border: 2px solid #020202;
    }

    .upload-form-item {
        @media screen and (max-width: 970px) {
            margin-bottom: 20px;
        }
    }

    .uni-file {
        width: 300px;
    }
}

.detail-upload {
    width: 100%;

    .detail-box {
        ::v-deep .el-form-item__content {
            @media screen and (max-width: 970px) {
                margin-left: 0 !important;
            }
        }
        ::v-deep .el-textarea {
            @media screen and (max-width: 970px) {
                height: 200px;
            }
            .el-textarea__inner {
                height: 100% !important;
                min-height: unset !important;
            }
        }

        @media screen and (max-width: 970px) {
            flex-direction: row;
            margin-bottom: 15px;
        }
        width: 100%;
        display: flex;
        align-items: center;

        .uni-upload {
            @media screen and (max-width: 970px) {
                width: 40%;
                position: relative;
            }
        }

        .upload-form-item {
            @media screen and (max-width: 970px) {
                width: 100%;
                position: relative;
            }
            width: 300px;
            margin-right: 0;
        }

        .textarea-form-item {
            margin-right: 0;
            width: calc(100% - 300px);
            @media screen and (max-width: 970px) {
                width: 100%;
                position: relative;
            }
        }
    }
}

.split-body {
    display: flex;
    align-items: flex-start;
}

.el-button.cancel-button {
    @media screen and (max-width: 970px) {
        width: 40%;
        height: unset;
        font-size: 16px;
    }
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
    @media screen and (max-width: 970px) {
        width: 40%;
        height: unset;
        font-size: 16px;
    }
    height: 65px;
    width: 300px;
    margin-right: 30px;
    border-radius: 0;
    background: #020202;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
    letter-spacing: 0;

    ::v-deep .el-loading-spinner {
        margin-top: -7px;
    }
}

.main-upload-parent {
    @media screen and (max-width: 970px) {
        position: relative;
        width: 100%;
    }
}
@media screen and (max-width: 970px) {
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
</style>
