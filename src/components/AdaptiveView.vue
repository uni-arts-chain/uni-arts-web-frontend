/** * Created by Lay Hunt on 2021-04-15 15:30:17. */
<template>
    <div class="adaptive-view" :style="`width: ${width};height: ${height}`">
        <div class="img-container" :class="{ preview: isPreview }">
            <Live2DView
                :width="width"
                :height="height"
                :path="nft.live2d_ipfs_url ? nft.live2d_ipfs_url : ''"
                :modelName="nft.live2d_file ? nft.live2d_file : ''"
                v-if="viewType == 'live2d' && !isPreview"
            />
            <AdaptiveImage
                @click="showPreview"
                :width="width"
                :height="height"
                v-else-if="viewType == 'live2d' && isPreview"
                :url="nft.img_main_file1 ? nft.img_main_file1.url : ''"
            />
            <AdaptiveImage
                @click="showPreview"
                :width="width"
                :height="height"
                v-else-if="viewType == 'img'"
                :url="nft.img_main_file1 ? nft.img_main_file1.url : ''"
            />
            <AdaptiveVideo
                @click="showPreview"
                :width="width"
                :height="height"
                v-else-if="viewType == 'video'"
                :isResponsive="isResponsive"
                :isPlay="!isPreview"
                :source="nft.img_main_file1 ? nft.img_main_file1.url : ''"
            />
            <div class="auction-label" v-if="!isPreview && isAuction">
                IN AUCTION
            </div>
            <div
                class="auction-date"
                v-if="!isPreview && (isAuction || isWaiting)"
            >
                <div class="auction-data-pick">
                    {{ isWaiting ? "Start after" : "End after" }}
                    <span>{{ countdown }}</span>
                </div>
                <span
                    >Bidding notice
                    <img src="@/assets/images/auciton_notice@2x.png"
                /></span>
            </div>
            <div class="copyright-icon" v-if="!isPreview && nft.has_royalty">
                <div class="icon-sub">
                    <div class="sub"></div>
                    <icon-svg icon-class="copyright" />
                </div>
            </div>
            <icon-svg
                v-if="isPreview && viewType == 'video'"
                class="video-label"
                icon-class="video"
            />
        </div>
        <Dialog
            :visible.sync="isDialogPreview"
            type="fullscreen"
            :close="handlePreviewClose"
        >
            <div class="dialog-content">
                <AdaptiveImage
                    v-if="viewType == 'img'"
                    width="100%"
                    height="100%"
                    :isResponsive="false"
                    :isOrigin="true"
                    :url="dialogPreviewUrl"
                />
                <AdaptiveVideo
                    v-else-if="viewType == 'video'"
                    :isResponsive="false"
                    :isPlay="true"
                    :source="dialogPreviewUrl"
                />
            </div>
        </Dialog>
    </div>
</template>
<script>
import Dialog from "@/components/Dialog/Dialog";
import Live2DView from "@/components/Live2DView";
import AdaptiveImage from "@/components/AdaptiveImage";
import AdaptiveVideo from "@/components/AdaptiveVideo";

export default {
    name: "adaptiveview",
    components: {
        Dialog,
        Live2DView,
        AdaptiveImage,
        AdaptiveVideo,
    },
    props: {
        nft: {
            type: Object,
            default: () => {},
        },
        isPreview: {
            type: Boolean,
            default: false,
        },
        isAuction: {
            type: Boolean,
            default: false,
        },
        isWaiting: {
            type: Boolean,
            default: false,
        },
        countdown: {
            type: String,
            default: "",
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "100%",
        },
        isResponsive: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isDialogPreview: false,
            dialogPreviewUrl: "",
        };
    },
    computed: {
        viewType() {
            if (this.nft.live2d_ipfs_url) {
                return "live2d";
            } else {
                if (
                    this.nft.img_main_file1 &&
                    (/\.mp4$/.test(this.nft.img_main_file1.url) ||
                        /^data:video\/mp4;/.test(this.nft.img_main_file1.url))
                ) {
                    return "video";
                } else {
                    return "img";
                }
            }
        },
    },
    methods: {
        handlePreviewClose() {
            this.isDialogPreview = false;
            this.dialogPreviewUrl = "";
        },
        showPreview() {
            if (this.viewType == "live2d" || this.isPreview) return;
            switch (this.viewType) {
                case "img":
                    this.dialogPreviewUrl = this.nft.img_main_file1.url;
                    break;
                case "video":
                    this.dialogPreviewUrl = this.nft.img_main_file1.url;
                    break;
            }
            this.isDialogPreview = true;
        },
    },
};
</script>
<style lang="scss" scoped>
.adaptive-view {
    overflow: hidden;
    width: 100%;

    .img-container.preview {
        /* cursor: default; */
    }
    .img-container {
        float: left;
        width: 100%;
        height: 100%;
        margin-right: 25px;
        overflow: hidden;
        cursor: pointer;
        position: relative;

        .auction-label {
            position: absolute;
            top: 34px;
            left: 0;
            padding: 5px 16px;
            background-color: #f9b43b;
            font-size: 20px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            font-weight: 600;
            text-align: left;
            color: #ffffff;
            letter-spacing: 0px;
        }

        .auction-date {
            width: 100%;
            height: 50px;
            position: absolute;
            background-color: rgba(134, 29, 57, 0.8);
            bottom: 0;
            left: 0;
            font-size: 18px;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            padding: 5px 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            letter-spacing: 0px;
            span {
                display: flex;
                align-items: center;
            }
            img {
                width: 17px;
                margin-left: 5px;
            }
            .auction-data-pick {
                display: flex;
                align-items: center;
                span {
                    margin-left: 10px;
                    font-weight: 600;
                }
            }
        }
        .copyright-icon {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 100px;
            height: 100px;
            color: white;
            font-size: 20px;
            .icon-sub {
                position: relative;
                width: 100%;
                height: 100%;
            }
            .sub {
                position: absolute;
                border-left: 100px solid transparent;
                border-bottom: 100px solid rgba(0, 0, 0, 0.3);
                width: 0;
                height: 0;
                left: 50%;
                top: 50%;
                transform: translateY(-50%) translateX(-50%);
            }
            .svg-icon {
                position: absolute;
                left: 55px;
                top: 55px;
                font-size: 30px;
                /* color: #c61e1e; */
                color: white;
            }
        }

        .video-label {
            font-size: 28px;
            position: absolute;
            top: 3px;
            right: 7px;
            color: white;
        }
    }
}

.dialog ::v-deep .el-dialog {
    background-color: black;
    .dialog-content {
        height: 100%;
    }
}
</style>
