/** * Created by Lay Hunt on 2020-12-29 09:48:09. */
<template>
    <el-select
        v-model="value"
        :placeholder="placeholder"
        popper-class="uni-select"
    >
        <el-option
            v-for="item in options"
            :key="item[key]"
            :label="item[label]"
            :value="item[value]"
        >
        </el-option>
    </el-select>
</template>
<script>
import { Select, Option } from "element-ui";
export default {
    name: "uni-select",
    components: {
        [Select.name]: Select,
        [Option.name]: Option,
    },
    props: {
        options: {
            type: Array,
            default: () => [],
        },
        label: {
            type: String,
            default: "label",
        },
        value: {
            type: String,
            default: "value",
        },
        key: {
            type: String,
            default: "value",
        },
        placeholder: {
            type: String,
            default: "Select",
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.el-select {
    ::v-deep .el-input__inner {
        border-width: 2px;
        border-radius: 0px;
        border-color: black;
        position: relative;
        height: 45px;
    }
    ::v-deep .el-icon-arrow-up:before {
        content: "";
        position: absolute;
        top: 10px;
        right: 5px;
        z-index: 1;
        border-top: 8px solid transparent;
        border-left: 8px solid transparent;
        border-bottom: 8px solid black;
        border-right: 8px solid transparent;
    }
}
</style>
<style lang="scss">
.el-select-dropdown.uni-select {
    border-radius: 0px;
    border-color: black;
}

.el-select-dropdown[x-placement^="bottom"] .popper__arrow::after {
    top: 1px;
    margin-left: -6px;
    border-top-width: 2px;
    border-bottom-color: #ffffff;
}
</style>
