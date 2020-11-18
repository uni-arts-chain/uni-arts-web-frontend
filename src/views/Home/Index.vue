/** * Created by Lay Hunt on 2020-11-17 18:30:10. */
<template>
    <div class="index">
        <div class="banner-top">
            <div class="container">
                <h1 style="padding-left: 19.5%">Link Credit</h1>
                <h1 style="text-align: right; padding-right: 19.5%">
                    Assist <span class="tip">Originality</span>
                </h1>
                <div class="input-box">
                    <div class="input">
                        <input type="text" placeholder="PICASSO" />
                        <img src="@/assets/images/sousuo@2x.png" />
                    </div>
                </div>
            </div>
        </div>
        <div class="banner">
            <el-carousel>
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import { Carousel, CarouselItem } from "element-ui";
export default {
    name: "index",
    components: {
        [Carousel.name]: Carousel,
        [CarouselItem.name]: CarouselItem,
    },
};
</script>

<style lang="scss" scoped>
.index {
}

.banner-top {
    background: white;
    height: 500px;
    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h1 {
            width: 100%;
            font-size: 60px;
            font-family: "Broadway";
            font-weight: 400;
            text-align: left;
            line-height: 60px;
            color: #020202;
            letter-spacing: 1px;
            margin-bottom: 50px;
        }
        .tip {
            color: #c61e1e;
            font-size: 60px;
            font-weight: 400;
            font-family: "Broadway";
            letter-spacing: 1px;
        }
    }
    .input-box {
        width: 100%;
        overflow: hidden;
        padding-right: 18%;
        .input {
            float: right;
            position: relative;
            width: 250px;
            margin-top: 10px;
            input {
                width: 100%;
                height: 48px;
                background-color: black;
                border-radius: 10px;
                color: #b5b5b5;
                padding-left: 14px;
                padding-right: 39px;
                font-size: 16px;
                text-transform: uppercase;
            }
            img {
                position: absolute;
                width: 19px;
                right: 14px;
                top: 14px;
                cursor: pointer;
            }
        }
    }
}
</style>
