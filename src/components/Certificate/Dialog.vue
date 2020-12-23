/** * Created by Lay Hunt on 2020-11-20 17:08:48. */
<template>
    <el-dialog
        class="dialog"
        :modal="false"
        :visible="dialogVisible"
        :append-to-body="true"
        :lock-scroll="true"
        :close-on-click-modal="clickModel"
        :close-on-press-escape="false"
        :show-close="showClose"
        top="0"
        :before-close="handleClose"
        @closed="closed"
    >
        <div class="info">
            <div class="item">
                <span class="label">Name:</span>
                <span class="value">{{ certificateData.name }}</span>
            </div>
            <div class="item">
                <span class="label">Painter:</span>
                <span class="value">{{ certificateData.author }}</span>
            </div>
            <div class="item">
                <span class="label">Texture:</span>
                <span class="value">{{ certificateData.material }}</span>
            </div>
            <div class="item">
                <span class="label">Size:</span>
                <span class="value"
                    >{{ certificateData.size_length }} x
                    {{ certificateData.size_width
                    }}{{ certificateData.unit }}</span
                >
            </div>
        </div>
        <div class="signed-time">
            Signing time: {{ certificateData.created_at | dateDayFormat }}
        </div>
        <div class="address">
            Certificate address: {{ certificateData.author }}
        </div>
    </el-dialog>
</template>
<script>
import { Dialog } from "element-ui";
import { hexToString } from "@polkadot/util";
export default {
    components: { [Dialog.name]: Dialog },
    name: "uni-cer-dialog",
    data() {
        return {
            collectionId: "",
            itemId: "",
            dialogVisible: false,
            certificateData: {},
        };
    },
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
        clickModel: {
            type: Boolean,
            default: true,
        },
        showClose: {
            type: Boolean,
            default: false,
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
    async created() {
        let obj = await this.$rpc.api.query.nft.nftItemList(
            this.collectionId,
            this.itemId
        );
        this.certificateData = JSON.parse(hexToString(obj.Data.toHex())) || {};
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
        background-image: url("./certificate-bg@2x.png");
        background-repeat: no-repeat;
        background-size: 1060px 767px;
        background-position: -30px -20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
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

.dialog {
    ::v-deep .el-dialog {
        display: inline-block;
        width: 1000px;
        height: 706px;
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

.dialog.fullscreen {
    width: 100%;
    height: 100%;
    ::v-deep .el-dialog,
    ::v-deep .el-dialog__body {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transform: none;
        padding: 0;
        margin: 0;
    }
    ::v-deep .el-dialog .el-dialog__close {
        position: relative;
        z-index: 1;
    }
    ::v-deep .el-dialog .el-dialog__headerbtn:hover .el-dialog__close {
        color: #999;
    }
    ::v-deep .el-dialog .el-dialog__close:hover {
        color: #999;
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
}
.info {
    width: 690px;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    top: 255px;
    left: 160px;
    .item {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        width: 313px;
        > span {
            font-size: 38px;
            font-weight: 400;
            text-align: left;
            color: #010034;
            font-family: "Monotype";
            line-height: 60px;
            letter-spacing: 0px;
        }
        .label {
            display: block;
            min-width: 113px;
            text-align: left;
        }
        .value {
            max-width: 230px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
        }
    }
}
.signed-time {
    position: absolute;
    top: 423px;
    left: 340px;
    font-size: 34px;
    font-family: "Monotype";
    font-weight: 400;
    text-align: left;
    color: #010034;
    line-height: 60px;
    letter-spacing: 0px;
}
.address {
    position: absolute;
    top: 500px;
    left: 135px;
    width: 730px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 38px;
    font-family: "Monotype";
    font-weight: 400;
    text-align: left;
    color: #010034;
    line-height: 60px;
    letter-spacing: 0px;
}
</style>
