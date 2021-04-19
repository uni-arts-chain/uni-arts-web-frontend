/** * Created by Lay Hunt on 2020-12-29 09:48:09. */
<template>
    <el-select
        v-model="inputData"
        :placeholder="placeholder"
        popper-class="uni-select"
        @blur="onBlur"
    >
        <el-option
            v-for="item in options"
            :key="item[optionKey]"
            :label="item[optionLabel]"
            :value="item[optionValue]"
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
    model: {
        prop: "value",
        event: "change",
    },
    props: {
        value: null,
        options: {
            type: Array,
            default: () => [],
        },
        optionLabel: {
            type: String,
            default: "label",
        },
        optionKey: {
            type: String,
            default: "label",
        },
        optionValue: {},
        placeholder: {
            type: String,
            default: "Select",
        },
    },
    data() {
        return {
            inputData: "",
        };
    },
    created() {
        this.inputData = this.value ? this.value : "";
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
    },
};
</script>
<style lang="scss" scoped>
::v-deep .el-input__inner {
    border-width: 2px;
    border-radius: 0px;
    border-color: black;
    position: relative;
    height: 45px;
    color: #020202;
}
::v-deep .el-icon-arrow-up:before {
    content: "";
    position: absolute;
    top: 50%;
    right: 5px;
    z-index: 1;
    transform: translateY(-75%);
    border-top: 8px solid transparent;
    border-left: 8px solid transparent;
    border-bottom: 8px solid black;
    border-right: 8px solid transparent;
}

.el-select-dropdown__item {
    color: #020202;
}
</style>
<style lang="scss">
.el-select-dropdown.uni-select {
    border-radius: 0px;
    border-color: black;
    border-width: 2px;
    min-height: 40px;
}
.el-select-dropdown__empty {
    min-height: 40px;
    line-height: 40px;
}

.el-select-dropdown[x-placement^="bottom"] .popper__arrow {
    border-left-width: 10px;
    border-right-width: 10px;
    border-bottom-color: black;
}
.el-select-dropdown[x-placement^="bottom"] .popper__arrow::after {
    top: 2px;
    margin-left: -10px;
    border-left-width: 10px;
    border-right-width: 10px;
    border-bottom-color: white;
}
</style>
