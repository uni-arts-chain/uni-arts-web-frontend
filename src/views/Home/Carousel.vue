/** * Created by Lay Hunt on 2020-11-19 10:42:34. */
<template>
    <div class="carousel">
        <el-carousel arrow="never" height="732px">
            <el-carousel-item
                :style="`background-image: url(${pageList[item - 1]});`"
                v-for="item in 3"
                :key="item"
            >
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { Carousel, CarouselItem } from "element-ui";
import page1 from "@/assets/images/temp/home-page1.jpg";
import page2 from "@/assets/images/temp/home-page2.jpg";
import page3 from "@/assets/images/temp/home-page3.jpg";
export default {
    name: "carousel",
    components: {
        [Carousel.name]: Carousel,
        [CarouselItem.name]: CarouselItem,
    },
    data() {
        return {
            pageList: [page1, page2, page3],
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
}
</style>
