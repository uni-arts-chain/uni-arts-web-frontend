/** * Created by Lay Hunt on 2020-11-20 17:08:48. */
<template>
    <el-dialog
        class="dialog"
        :class="{
            medium: type == 'medium',
            small: type == 'small',
            message: displayType == 'PluginError',
        }"
        :modal="false"
        :visible="dialogVisible"
        :append-to-body="true"
        :lock-scroll="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        top="0"
        :before-close="handleClose"
        @closed="closed"
    >
        <div class="content" v-if="displayType == 'PluginError'">
            <img src="@/assets/images/polkadot-js-logo.jpg" alt="" />
            <div>
                Before you start using this application, please install the
                <span>Polkadot.js</span> browser plugin
            </div>
        </div>
        <slot v-else></slot>
    </el-dialog>
</template>
<script>
import { Dialog } from "element-ui";
export default {
    components: { [Dialog.name]: Dialog },
    name: "uni-dialog",
    props: {
        visible: {
            type: Boolean,
            default: true,
        },
        close: {
            type: Function,
            default: function () {
                this.$emit("update:visible", false);
                this.dialogVisible = false;
            },
        },
        displayType: {
            type: String,
            default: "dialog",
        },
        type: {
            type: String,
            default: "medium",
        },
    },
    watch: {
        visible(value) {
            this.dialogVisible = value;
            if (value) {
                this.$el.addEventListener("wheel", this.lockScreen);
            } else {
                this.$el.removeEventListener("wheel", this.lockScreen);
            }
        },
    },
    data() {
        return {
            dialogVisible: false,
        };
    },
    mounted() {
        if (this.visible) {
            this.$el.addEventListener("wheel", this.lockScreen);
        }
    },
    methods: {
        handleClose() {
            this.close();
        },
        lockScreen(e) {
            e.preventDefault();
        },
        closed() {
            this.$emit("closed");
        },
    },
};
</script>
<style lang="scss" scoped>
.dialog {
    ::v-deep .el-dialog {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 780px;
        height: 586px;
        background: #ffffff;
        box-shadow: 0px 5px 31px 0px rgba(135, 135, 135, 0.73);
        padding: 10px 100px 66px;
    }
    ::v-deep .el-dialog .el-dialog__header {
        padding: 0;
    }
    ::v-deep .el-dialog .el-dialog__close {
        font-size: 24px;
    }
    ::v-deep .el-dialog .el-dialog__headerbtn:hover .el-dialog__close {
        color: #020202;
    }
    ::v-deep .el-dialog .el-dialog__close:hover {
        color: #020202;
    }
}

.dialog.medium {
    ::v-deep .el-dialog {
        width: 780px;
        height: 586px;
    }
}

.dialog.small {
    ::v-deep .el-dialog {
        width: 500px;
        height: 300px;
    }
}

.dialog.message {
    ::v-deep .el-dialog {
        width: 400px;
        height: 200px;
        display: flex;
        align-items: center;
        padding: 20px 20px;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        > img {
            width: 90%;
            margin-bottom: 20px;
        }
        > div > span {
            font-size: 20px;
            color: #fa8903;
        }
    }
}
</style>
