/** * Created by Lay Hunt on 2021-04-15 19:39:54. */
<template>
    <div class="details">
        <div class="title">Artwork Details</div>
        <div class="comment-content">
            <div class="item" v-if="art.img_detail_file1.url">
                <div
                    class="img-content"
                    @click="enterPreview(art.img_detail_file1)"
                >
                    <AdaptiveImage
                        :isOrigin="true"
                        :url="
                            art.img_detail_file1 ? art.img_detail_file1.url : ''
                        "
                    ></AdaptiveImage>
                </div>
                <div class="img-desc">
                    {{ art.img_detail_file1_desc }}
                </div>
                <img
                    src="@/assets/images/xiangqing1@2x.png"
                    style="bottom: -10px; right: 0"
                    class="xq"
                />
            </div>
            <div class="item" v-if="art.img_detail_file2.url">
                <div class="img-desc">
                    {{ art.img_detail_file2_desc }}
                </div>
                <div
                    class="img-content"
                    @click="enterPreview(art.img_detail_file2)"
                >
                    <AdaptiveImage
                        :isOrigin="true"
                        :url="
                            art.img_detail_file2 ? art.img_detail_file2.url : ''
                        "
                    ></AdaptiveImage>
                </div>
                <img
                    src="@/assets/images/xiangqing2@2x.png"
                    style="bottom: -10px; left: 50px"
                    class="xq"
                />
            </div>
            <div class="item" v-if="art.img_detail_file3.url">
                <div
                    class="img-content"
                    @click="enterPreview(art.img_detail_file3)"
                >
                    <AdaptiveImage
                        :isOrigin="true"
                        :url="
                            art.img_detail_file3 ? art.img_detail_file3.url : ''
                        "
                    ></AdaptiveImage>
                </div>
                <div class="img-desc">
                    {{ art.img_detail_file3_desc }}
                </div>
                <img
                    src="@/assets/images/xiangqing1@2x.png"
                    style="bottom: -10px; right: 0"
                    class="xq"
                />
            </div>
            <div class="item" v-if="art.img_detail_file4.url">
                <div class="img-desc">
                    {{ art.img_detail_file4_desc }}
                </div>
                <div
                    class="img-content"
                    @click="enterPreview(art.img_detail_file4)"
                >
                    <AdaptiveImage
                        :isOrigin="true"
                        :url="
                            art.img_detail_file4 ? art.img_detail_file4.url : ''
                        "
                    ></AdaptiveImage>
                </div>
                <img
                    src="@/assets/images/xiangqing2@2x.png"
                    style="bottom: -10px; left: 50px"
                    class="xq"
                />
            </div>
            <div
                class="item"
                v-if="art.img_detail_file5.url"
                @click="enterPreview(art.img_detail_file5)"
            >
                <div class="img-content">
                    <AdaptiveImage
                        :isOrigin="true"
                        :url="
                            art.img_detail_file5 ? art.img_detail_file5.url : ''
                        "
                    ></AdaptiveImage>
                </div>
                <div class="img-desc">
                    {{ art.img_detail_file5_desc }}
                </div>
                <img
                    src="@/assets/images/xiangqing1@2x.png"
                    style="bottom: -10px; right: 0"
                    class="xq"
                />
            </div>
        </div>
        <Dialog
            :visible.sync="isDialogPreview"
            type="fullscreen"
            :close="handlePreviewClose"
        >
            <div class="dialog-content">
                <AdaptiveImage
                    width="100%"
                    height="100%"
                    :isResponsive="false"
                    :isOrigin="true"
                    :url="dialogPreviewUrl"
                />
            </div>
        </Dialog>
    </div>
</template>
<script>
import AdaptiveImage from "@/components/AdaptiveImage";
import Dialog from "@/components/Dialog/Dialog";

export default {
    name: "detail",
    components: {
        AdaptiveImage,
        Dialog,
    },
    props: {
        art: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            isDialogPreview: false,
            dialogPreviewUrl: "",
        };
    },
    methods: {
        enterPreview(obj) {
            if (obj) {
                this.dialogPreviewUrl = obj.url;
                this.isDialogPreview = true;
            }
        },
        handlePreviewClose() {
            this.isDialogPreview = false;
            this.dialogPreviewUrl = "";
        },
    },
};
</script>
<style lang="scss" scoped>
.details {
    margin-bottom: 180px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
    .comment-content {
        min-height: 100px;
    }
    .img-content {
        width: 456px;
        height: 456px;
        cursor: pointer;
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 130px;
        position: relative;
        margin-bottom: 120px;
        padding: 0 70px;
    }
    .img-desc {
        max-width: 489px;
        font-size: 24px;
        font-weight: 400;
        text-align: left;
        color: #020202;
        line-height: 36px;
        letter-spacing: 1px;
    }
    .xq {
        position: absolute;
        height: 230px;
        z-index: -1;
    }
}
</style>
