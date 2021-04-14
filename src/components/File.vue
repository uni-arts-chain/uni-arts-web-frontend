/** * Created by Lay Hunt on 2020-12-29 11:11:36. */
<template>
    <div class="uni-file" @click="selectFile" v-loading="isLoading">
        <div class="box-boder">
            <div class="bg" v-if="fileDataList.length <= 0">
                <div class="plus"></div>
                <div class="text">choose a zip</div>
            </div>
            <div class="file" v-else>
                <icon-svg icon-class="zip" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "uni-file",
    props: {
        fileObject: {
            type: Object,
            default: () => {},
        },
        upload: {
            type: Function,
            default: () => {},
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            fileDataList: [],
        };
    },
    watch: {
        fileDataList(value) {
            if (value.length > 0) {
                this.$emit("change", value);
                this.dispatch(
                    "ElFormItem",
                    "el.form.change",
                    this.fileDataList
                );
            }
        },
        "fileObject.live2d_ipfs_url"(value) {
            if (!value) {
                this.fileDataList = [];
            }
        },
    },
    methods: {
        selectFile() {
            this.getTheFile();
        },
        async getTheFile() {
            const pickerOpts = {
                types: [
                    {
                        description: "File",
                        accept: {
                            "application/zip": [".zip"],
                        },
                    },
                ],
                excludeAcceptAllOption: false,
                multiple: false,
            };

            let [fileHandle] = await window.showOpenFilePicker(pickerOpts);

            let fileData = await fileHandle.getFile();
            this.fileDataList = [fileData, fileData.name];
            this.upload([fileData, fileData.name]);
            // this.fileDataList = [fileData, fileData.name];
            // this.$emit("uploadFile", [fileData, fileData.name]);
        },
        dispatch(componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.componentName;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.uni-file {
    display: flex;
    width: 360px;
    margin-right: 30px;
    .box-boder {
        width: 360px;
        max-width: 100%;
        max-height: 100%;
        height: 270px;
        cursor: pointer;
        position: relative;
    }
    .box-boder.selected::after {
        content: "";
        width: 32px;
        height: 32px;
        right: -16px;
        top: -16px;
        position: absolute;
        background: url(~@/assets/images/refresh@2x.png) no-repeat;
        background-size: 32px;
        z-index: 1px;
    }
    .bg,
    .file {
        width: 100%;
        height: 100%;
        background: #eee;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .file {
        font-size: 70px;
    }
    .plus {
        width: 52px;
        height: 52px;
        position: relative;
        margin-bottom: 30px;
    }
    .plus::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 6px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 5px;
        background-color: #c5c5c5;
    }
    .plus::after {
        content: "";
        position: absolute;
        width: 6px;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 5px;
        background-color: #c5c5c5;
    }
    .text {
        font-size: 20px;
        font-weight: 400;
        text-align: center;
        color: #666666;
        letter-spacing: 0px;
    }
}
</style>
