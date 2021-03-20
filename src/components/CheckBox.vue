/** * Created by Lay Hunt on 2021-03-20 11:03:42. */
<template>
    <el-checkbox v-model="inputData"></el-checkbox>
</template>
<script>
export default {
    name: "uni-checkbox",
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: null,
    },
    data() {
        return {
            inputData: "",
        };
    },
    watch: {
        inputData() {
            this.$emit("change", this.inputData);
        },
        value(value) {
            this.inputData = value;
        },
    },
    onBlur() {
        if (this.inputData >= 0) {
            this.$emit("change", this.inputData);
            this.dispatch("ElFormItem", "el.form.change", this.inputData);
        }
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
};
</script>
<style lang="scss" scoped>
::v-deep .el-checkbox__inner {
    width: 24px;
    height: 24px;
    border-width: 2px;
    border-radius: 0;
    border-color: black;
}
::v-deep .el-checkbox__inner::after {
    width: 8px;
    height: 14px;
    left: 4px;
    top: 0px;
    border-width: 2px;
}
</style>
