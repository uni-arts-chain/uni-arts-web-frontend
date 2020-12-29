/** * Created by Lay Hunt on 2020-12-29 09:48:09. */
<template>
    <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
