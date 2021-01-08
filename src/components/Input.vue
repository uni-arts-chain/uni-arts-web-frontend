/** * Created by Lay Hunt on 2020-12-29 10:17:33. */
<template>
    <div class="input-box">
        <input
            class="el-input__inner"
            :type="type"
            :class="{ 'unit-input': append }"
            @blur="onBlur"
            v-model="inputData"
        />
        <div class="append" v-if="append">{{ append }}</div>
    </div>
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
        type: {
            type: String,
            default: "text",
        },
        append: {
            type: String,
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
        value(value) {
            this.inputData = value;
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
input.unit-input {
    padding-right: 55px;
}
input:hover {
    border-color: #020202;
}
.input-box {
    display: inline-block;
    position: relative;
}
.append {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    font-size: 17px;
    font-weight: 400;
    text-align: center;
    color: #020202;
    letter-spacing: 0px;
}
</style>
