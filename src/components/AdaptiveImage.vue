/** * Created by Lay Hunt on 2020-12-07 18:32:37. */
<template>
    <div
        class="adaptive-image"
        ref="imgBox"
        :style="`width:${width};height:${height};`"
    >
        <img
            ref="img"
            :class="{
                'img-horizontal': isHorizontal,
                'img-vertical': !isHorizontal,
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
            required: true,
        },
        height: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isHorizontal: false,
        };
    },
    methods: {
        imgOnLoad() {
            let width = this.$refs.img.width;
            let height = this.$refs.img.height;
            let boxWidth = this.width;
            let boxHeight = this.height;
            boxWidth = boxWidth.includes("px")
                ? boxWidth.split("px")[0]
                : boxWidth;
            boxWidth = boxWidth.includes("%")
                ? this.$refs.imgBox.offsetWidth
                : boxWidth;
            boxHeight = boxHeight.includes("px")
                ? boxHeight.split("px")[0]
                : boxHeight;
            boxHeight = boxHeight.includes("%")
                ? this.$refs.imgBox.offsetHeight
                : boxHeight;
            if (width < height) {
                this.isHorizontal = height < boxHeight ? false : true;
            } else {
                this.isHorizontal = width < boxWidth ? true : false;
            }
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
    margin-bottom: 20px;
    position: relative;
    > img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
    }

    > img.img-horizontal {
        width: 100%;
        height: auto;
    }

    > img.img-vertical {
        height: 100%;
        width: auto;
    }
}
</style>
