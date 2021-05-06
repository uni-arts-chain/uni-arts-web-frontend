/** * Created by Lay Hunt on 2021-05-06 20:19:15. */
<template>
    <div
        class="blind-box-item card"
        :style="`width: ${width};height: ${height}`"
    >
        <div class="img-wrapper">
            <AdaptiveView
                @imgLoaded="imgLoaded"
                :width="width"
                :height="height"
                :isResponsive="false"
                :nft="item.art ? item.art : item"
            />
        </div>
        <div
            class="label rare"
            v-if="item.special_attr"
            :style="`left: ${left}px;top: ${top}px;`"
        >
            <img class="icon" src="@/assets/images/rare@2x.png" />
            <span>Rare</span>
        </div>
    </div>
</template>
<script>
import AdaptiveView from "@/components/AdaptiveView";
export default {
    name: "imageview",
    components: {
        AdaptiveView,
    },
    props: {
        width: {
            type: String,
            default: "360px",
        },
        height: {
            type: String,
            default: "270px",
        },
        item: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            left: "0",
            top: "0",
        };
    },
    methods: {
        imgLoaded(info) {
            this.left = info.left;
            this.top = info.top + 15;
        },
    },
};
</script>
<style lang="scss" scoped>
.blind-box-item {
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 70px;
    position: relative;
    .img-wrapper {
    }
    .label {
        background-color: black;
        height: 30px;
        min-width: 73px;
        position: absolute;
        display: flex;
        align-items: center;
    }
    .label .icon {
        width: 17px;
        height: 16px;
        margin-right: 7px;
    }
    .label.rare {
        left: 0px;
        top: 35px;
        font-size: 18px;
        font-weight: 600;
        text-align: left;
        color: #ffcc5e;
        line-height: 60px;
        letter-spacing: 1px;
    }
    .label.own {
        left: 0px;
        top: 35px;
        font-size: 18px;
        font-weight: 600;
        text-align: left;
        color: #00debc;
        line-height: 60px;
        letter-spacing: 1px;
    }
}
</style>
