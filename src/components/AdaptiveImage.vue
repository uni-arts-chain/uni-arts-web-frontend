/** * Created by Lay Hunt on 2020-12-07 18:32:37. */
<template>
    <div
        class="adaptive-image"
        ref="imgBox"
        :class="{ 'img-loading': isLoading }"
        :style="`${width ? `width:${width};` : ``}${
            height ? `height:${height};` : ``
        }`"
    >
        <img
            ref="img"
            :class="{
                'img-horizontal': !isOrigin && isHorizontal,
                'img-vertical': !isOrigin && !isHorizontal,
                'img-origin': isOrigin,
            }"
            @load="imgOnLoad"
            :src="url"
        />
    </div>
</template>
<script>
export default {
    name: "adaptive-image",
    props: {
        url: {
            type: String,
            required: true,
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "100%",
        },
        isOrigin: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            isHorizontal: false,
            isLoading: true,
        };
    },
    methods: {
        imgOnLoad() {
            let obj = this.$refs.img;
            let width = obj ? obj.width : "100%";
            let height = obj ? obj.height : "230px";

            if (this.isOrigin) {
                this.isLoading = false;
                this.$emit("ImgLoaded", {
                    width: width,
                    height: height,
                });
                return;
            }

            let boxWidth = this.width;
            let boxHeight = this.height;
            boxWidth = boxWidth.includes("px")
                ? boxWidth.split("px")[0]
                : boxWidth;
            boxWidth = boxWidth.includes("%")
                ? this.$refs.imgBox
                    ? this.$refs.imgBox.offsetWidth
                    : 0
                : boxWidth;
            boxHeight = boxHeight.includes("px")
                ? boxHeight.split("px")[0]
                : boxHeight;
            boxHeight = boxHeight.includes("%")
                ? this.$refs.imgBox
                    ? this.$refs.imgBox.offsetHeight
                    : 0
                : boxHeight;
            if (width < height) {
                this.isHorizontal = height < boxHeight ? false : true;
            } else {
                this.isHorizontal = width < boxWidth ? true : false;
            }
            this.isLoading = false;
        },
    },
};
</script>
<style lang="scss" scoped>
.adaptive-image {
    display: block;
    width: 100%;
    height: 230px;
    overflow: hidden;
    border-radius: 4px;
    position: relative;
    > img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
        transition: opacity 0.3s ease;
        opacity: 1;
    }

    > img.img-horizontal {
        width: 100%;
        height: 100%;
    }

    > img.img-vertical {
        height: 100%;
        width: auto;
    }

    > img.img-origin {
        max-height: 100%;
        max-width: 100%;
    }
}
.img-loading {
    > img {
        opacity: 0;
    }
}
</style>
