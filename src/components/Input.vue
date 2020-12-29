/** * Created by Lay Hunt on 2020-12-29 10:17:33. */
<template>
    <input
        class="el-input__inner"
        type="text"
        @blur="onBlur"
        v-model="inputData"
    />
</template>
<script>
export default {
    name: "uni-input",
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: {
            default: "",
        },
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
    },
    methods: {
        onBlur() {
            this.$emit("blur", this.inputData);
            this.dispatch("ElFormItem", "el.form.blur", this.inputData);
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
input {
    height: 45px;
    border: 2px solid #020202;
    color: #020202;
    padding: 5px 15px;
    border-radius: 0;
    font-size: 17px;
}
input:hover {
    border-color: #020202;
}
</style>
