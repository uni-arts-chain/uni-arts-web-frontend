/** * Created by Lay Hunt on 2021-03-20 11:03:42. */
<template>
    <div>
        <el-radio
            v-model="inputData"
            :label="v"
            v-for="(v, i) in list"
            :key="i"
            >{{ v }}</el-radio
        >
    </div>
</template>
<script>
export default {
    name: "uni-radio",
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            default: "1",
            type: String,
        },
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            inputData: "",
        };
    },
    created() {
        this.inputData = this.value;
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
.el-radio {
    margin-right: 50px;
}
::v-deep .el-radio__inner {
    width: 24px;
    height: 24px;
    border-width: 2px;
    border-radius: 50%;
}
::v-deep .el-radio .el-radio__label {
    font-size: 17px;
    font-weight: 400;
    text-align: center;
    letter-spacing: 0px;
    text-transform: capitalize;
    color: black;
}
::v-deep .el-radio__inner.is-checked {
    border-color: black;
}
::v-deep .el-radio__inner::after {
    width: 9px;
    height: 9px;
    border-width: 2px;
}
</style>
