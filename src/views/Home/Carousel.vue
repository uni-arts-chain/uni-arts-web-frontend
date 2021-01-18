/** * Created by Lay Hunt on 2020-11-19 10:42:34. */
<template>
    <div class="carousel">
        <el-carousel arrow="never" height="732px" :autoplay="false">
            <el-carousel-item v-for="(item, index) in list" :key="index">
                <router-link :to="`/auction/${item.id}`" class="item-container">
                    <AdaptiveImage
                        width="100%"
                        height="100%"
                        :url="item.img_file.url"
                    />
                    <div class="info-body">
                        <div>Time limited auction</div>
                        <div>23 : 08 : 02</div>
                    </div>
                </router-link>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { Carousel, CarouselItem } from "element-ui";
import AdaptiveImage from "@/components/AdaptiveImage";
export default {
    name: "carousel",
    components: {
        [Carousel.name]: Carousel,
        [CarouselItem.name]: CarouselItem,
        AdaptiveImage,
    },
    data() {
        return {
            list: [],
            total_count: 0,
        };
    },
    created() {
        this.requestData();
    },
    methods: {
        requestData() {
            this.$http.globalGetAuctionList({}).then((res) => {
                this.list = res.list;
                this.total_count = res.total_count;
            });
        },
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

.item-container {
    width: 100%;
    height: 100%;
}

.el-carousel__item {
    height: 100%;
    width: 100%;
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
