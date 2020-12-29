/** * Created by Lay Hunt on 2020-12-29 10:27:29. */
<template>
    <el-input
        type="textarea"
        :autosize="{ minRows: minRows }"
        placeholder="请输入内容"
        v-model="inputData"
    >
    </el-input>
</template>
<script>
import { Input } from "element-ui";
export default {
    name: "uni-textarea",
    components: {
        [Input.name]: Input,
    },
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            default: "",
        },
        minRows: {
            type: Number,
            default: 2,
        },
    },
    watch: {
        inputData() {
            this.$emit("change", this.inputData);
        },
    },
    data() {
        return {
            inputData: "",
        };
    },
};
</script>
<style lang="scss" scoped>
::v-deep {
    textarea,
    textarea:hover {
        border: 2px solid #020202;
        border-radius: 0px;
        font-size: 17px;
        color: #020202;
    }
}
</style>
