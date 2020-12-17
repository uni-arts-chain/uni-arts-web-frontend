/** * Created by Lay Hunt on 2020-11-19 10:42:34. */
<template>
    <div class="carousel">
        <el-carousel arrow="never" height="732px">
            <el-carousel-item
                :style="`background-image: url(${pageList[item - 1]});`"
                v-for="item in 3"
                :key="item"
            >
                <div class="info-body">
                    <div>Time limited auction</div>
                    <div>23 : 08 : 02</div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { Carousel, CarouselItem } from "element-ui";
import page1 from "@/assets/images/temp/home-page1.jpg";
export default {
    name: "carousel",
    components: {
        [Carousel.name]: Carousel,
        [CarouselItem.name]: CarouselItem,
    },
    data() {
        return {
            pageList: [page1, page1, page1],
        };
    },
};
</script>

<style lang="scss" scoped>
.el-carousel {
    width: 100%;
    ::v-deep .el-carousel__indicators .el-carousel__button {
        width: 11px;
        height: 11px;
        border-radius: 50%;
        margin-left: 6px;
        margin-right: 6px;
    }
    ::v-deep .el-carousel__indicators--horizontal {
        bottom: 105px;
    }
}

.el-carousel__item {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .info-body {
        position: absolute;
        width: 464px;
        height: 182px;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        > div {
            font-family: "Broadway";
            font-size: 30px;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            letter-spacing: 2px;
        }
    }
}
</style>
