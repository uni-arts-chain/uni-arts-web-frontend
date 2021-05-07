/** * Created by Lay Hunt on 2021-04-23 11:49:08. */
<template>
    <div class="open-box" v-if="visible">
        <i class="el-icon-close" @click="close"></i>
        <div class="loading" v-if="isOpening">
            <img src="@/assets/images/opening.gif" />
            Data transmission on the chain, please wait patiently...
        </div>
        <div class="content" v-else v-loading="isLoading">
            <el-carousel
                type="card"
                :autoplay="false"
                :loop="false"
                indicator-position="none"
                v-if="list.length > 0"
            >
                <el-carousel-item v-for="(item, i) in list" :key="i">
                    <div class="item">
                        <div class="bg"></div>
                        <BlindBoxCardView
                            width="229px"
                            height="332px"
                            :item="item"
                        />
                        <div class="name">{{ item.name }}</div>
                        <button class="checkout" @click="goDetail(item)">
                            Check it out
                        </button>
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
import BlindBoxCardView from "@/components/BlindBoxCardView";
export default {
    name: "open-box",
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            default: () => [],
        },
        isOpening: {
            type: Boolean,
            default: false,
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        [Carousel.name]: Carousel,
        [CarouselItem.name]: CarouselItem,
        BlindBoxCardView,
    },
    data() {
        return {};
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
        goDetail(item) {
            window.open("/art/" + item.art_id);
        },
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

.loading {
    height: 350px;
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    border: 2px solid white;
    font-size: 20px;
    border-radius: 8px;
    background-color: black;
    > img {
        width: 160px;
        height: 160px;
        margin-bottom: 30px;
    }
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
    .blind-box-item {
        margin-top: 73px;
        margin-bottom: 0;
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
    border: 2px solid white;
    font-size: 35px;
    position: absolute;
    cursor: pointer;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translateY(-370px) translateX(260px);
}
</style>
