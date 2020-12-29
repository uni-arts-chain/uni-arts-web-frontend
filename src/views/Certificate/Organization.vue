/** * Created by Lay Hunt on 2020-12-23 15:39:28. */
<template>
    <div class="addsign">
        <div class="item" v-for="(v, i) in list" :key="i">
            <div class="img">
                <AdaptiveImage :url="img"></AdaptiveImage>
            </div>
            <div class="content">
                <div class="content-top">
                    <div class="left">
                        <div class="title">Artwork Appraisal Center</div>
                        <div class="cost">
                            Cost:
                            <span style="color: #c61e1e">{{ 480 }}</span>
                            UART/time
                        </div>
                    </div>
                    <div class="right">
                        <button>Apply Now</button>
                    </div>
                </div>
                <div class="content-bottom">
                    <div class="signed-time">Signed: 168 times</div>
                    <div class="desc">
                        Introductions：The national cultural relics and artworks
                        appraisal and certification platform is mainly composed
                        of famous appraisal and evaluation authorities in China
                        and even in the world. The expert group is composed of
                        more than 20 researchers, professors in combination with
                        the professional and technical personnel echelon who
                        have professional...
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "@/components/AdaptiveImage";
import img from "@/assets/images/temp/home-page1.jpg";
export default {
    name: "organization",
    components: {
        AdaptiveImage,
    },
    data() {
        return {
            img,
            list: [1, 2, 3],
        };
    },
};
</script>
<style lang="scss" scoped>
.item {
    overflow: hidden;
    margin-bottom: 100px;
    .img {
        float: left;
        width: 360px;
        height: 270px;
    }
    .content {
        float: right;
        width: calc(100% - 360px);
        padding-left: 43px;
    }
    .content-top {
        display: flex;
        justify-content: space-between;
        .left {
            .title {
                font-size: 22px;
                font-weight: 600;
                text-align: left;
                color: #020202;
                letter-spacing: 0px;
                margin-bottom: 18px;
            }
            .cost {
                font-size: 18px;
                font-weight: 600;
                text-align: left;
                color: #020202;
                line-height: 30px;
                letter-spacing: 0px;
            }
        }
        .right {
            button {
                cursor: pointer;
                border: 3px solid black;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                min-width: 193px;
                padding-top: 10px;
                padding-bottom: 10px;
                letter-spacing: 0px;
                background-color: white;
            }
        }
    }
    .content-bottom {
        .signed-time {
            font-size: 18px;
            font-weight: 400;
            text-align: left;
            color: #020202;
            line-height: 30px;
            letter-spacing: 0px;
            margin-top: 30px;
        }
        .desc {
            max-height: 112px;
            overflow: hidden;
            margin-top: 23px;
            font-size: 18px;
            font-weight: 400;
            text-align: left;
            color: #020202;
            line-height: 28px;
            letter-spacing: 0px;
        }
    }
}
</style>
