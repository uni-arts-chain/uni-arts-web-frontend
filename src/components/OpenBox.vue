/** * Created by Lay Hunt on 2021-04-23 11:49:08. */
<template>
    <div class="open-box" v-if="visible">
        <i class="el-icon-close" @click="close"></i>
        <div class="content">
            <el-carousel type="card" :autoplay="false" :loop="false">
                <el-carousel-item v-for="item in list" :key="item">
                    <div class="item">
                        <div class="bg"></div>
                        <AdaptiveImage
                            width="229px"
                            height="332px"
                            :url="HomePage1"
                        />
                        <div class="name">Harry Potter</div>
                        <button class="checkout">Check it out</button>
                        <p class="desc">
                            The NFT works obtained can be viewed in "my home
                            page"
                        </p>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>
<script>
import { Carousel, CarouselItem } from "element-ui";
import AdaptiveImage from "@/components/AdaptiveImage";
import HomePage1 from "@/assets/images/temp/home-page1.jpg";
export default {
    name: "open-box",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        [Carousel.name]: Carousel,
        [CarouselItem.name]: CarouselItem,
        AdaptiveImage,
    },
    data() {
        return {
            list: [1],
            HomePage1,
        };
    },
    watch: {
        visible(value) {
            if (value) {
                this.$nextTick(() => {
                    this.$el.addEventListener("wheel", this.lockScreen);
                });
            } else {
                this.$nextTick(() => {
                    this.$el.removeEventListener("wheel", this.lockScreen);
                });
            }
        },
    },
    mounted() {},
    methods: {
        lockScreen(e) {
            console.log(1);
            e.preventDefault();
        },
        close() {
            this.$emit("update:visible", false);
        },
    },
};
</script>
<style lang="scss" scoped>
.open-box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.content {
    max-width: 90%;
    width: 1500px;
    margin: 0 auto;
    height: 710px;
    background-color: transparent;
    animation: enter 0.3s ease;
}

@keyframes enter {
    0% {
        opacity: 0;
        transform: scale(0.3);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.item {
    width: 409px;
    height: 705px;
    margin: 0 auto;
    position: relative;
    background: #ffffff;
    border-radius: 20px;
    padding: 41px 29px;
    box-shadow: -1px 0px 11px 0px rgba(0, 0, 0, 0.15);
    .bg {
        position: absolute;
        top: 41px;
        left: 29px;
        width: 360px;
        height: 537px;
        z-index: 0;
        background: url(~@/assets/images/caidai@2x.png) no-repeat;
        background-size: 360px 537px;
        background-position: center;
    }
    .adaptive-image {
        margin-left: auto;
        margin-right: auto;
        margin-top: 73px;
        border-radius: 10px;
        position: relative;
        z-index: 1;
    }
    .name {
        max-width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 26px;
        font-family: Broadway;
        font-weight: 400;
        text-align: center;
        color: #101010;
        margin-top: 36px;
        position: relative;
        z-index: 1;
    }
    .checkout {
        margin-top: 34px;
        width: 188px;
        height: 47px;
        opacity: 1;
        background: #101010;
        color: white;
        border-radius: 23px;
        font-size: 19px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        position: relative;
        cursor: pointer;
        z-index: 1;
    }
    .desc {
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: #101010;
        line-height: 22px;
        margin-top: 33px;
        position: relative;
        z-index: 1;
    }
}

.el-carousel.el-carousel--horizontal {
    /* overflow-x: visible; */
}
.el-carousel {
    width: 100%;
    height: 710px;
    ::v-deep .el-carousel__container {
        height: 100%;
    }
    ::v-deep .el-carousel__mask {
        display: none;
    }
    ::v-deep .el-carousel__arrow {
        border: 1px solid rgb(220, 220, 220);
    }
}
.el-icon-close {
    background: black;
    color: white;
    font-size: 35px;
    position: absolute;
    cursor: pointer;
    top: 22%;
    right: 15%;
}
</style>
