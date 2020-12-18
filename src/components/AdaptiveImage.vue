/** * Created by Lay Hunt on 2020-12-07 18:32:37. */
<template>
    <div
        class="adaptive-image"
        ref="imgBox"
        :class="{ 'img-loading': isLoading }"
        :style="`width:${width};height:${height};`"
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
            default: false,
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
            if (this.isOrigin) {
                this.isLoading = false;
                return;
            }
            let width = this.$refs.img ? this.$refs.img.width : "100%";
            let height = this.$refs.img ? this.$refs.img.height : "230px";
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
        height: auto;
    }

    > img.img-vertical {
        height: 100%;
        width: auto;
    }

    > img.img-origin {
        height: auto;
        width: auto;
    }
}
.img-loading {
    > img {
        opacity: 0;
    }
}
</style>
