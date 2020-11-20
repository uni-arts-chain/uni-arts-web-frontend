/** * Created by Lay Hunt on 2020-11-18 09:55:39. */
<template>
    <div class="index">
        <div class="container">
            <div class="header">
                <div class="bg"></div>
                <div class="profile">
                    <router-link
                        class="avatar-container"
                        :to="`/artist-detail/${1}`"
                    >
                        <img src="@/assets/images/temp/fashion.jpg" />
                    </router-link>
                    <div class="info">
                        <div class="name">CATHERINE QIN</div>
                        <div class="intro">
                            <i class="quote1"></i>
                            Guangzhou people graduated from Stanford University
                            <i class="quote2"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="recommendations">
                <h4 class="title">Previous recommendations</h4>
                <div class="artist-list">
                    <Artist :list="list"></Artist>
                    <Artist :list="list"></Artist>
                    <Artist :list="list"></Artist>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Artist from "@/components/Artist";
import recommendPage1 from "@/assets/images/temp/recommend-page1.jpg";
import recommendPage2 from "@/assets/images/temp/recommend-page2.jpg";
import recommendPage3 from "@/assets/images/temp/recommend-page3.jpg";
export default {
    name: "index",
    components: { Artist },
    data() {
        return {
            list: [recommendPage1, recommendPage2, recommendPage3],
        };
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.index {
    padding-top: 50px;
}
.header {
    position: relative;
    margin-bottom: 135px;
    .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 340px;
        background: url("~@/assets/images/ren-bg@2x.png") no-repeat;
        background-size: 100% auto;
    }
    .profile {
        padding-top: 94px;
        position: relative;
        display: flex;
        justify-content: center;
        .avatar-container {
            position: relative;
            overflow: hidden;
            width: 325px;
            height: 430px;
            cursor: pointer;
        }
        .avatar-container > img {
            position: absolute;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
        .info {
            margin-top: 100px;
            margin-left: 76px;
            .name {
                font-size: 36px;
                font-family: "Broadway";
                font-weight: 400;
                text-align: left;
                color: #ffffff;
                letter-spacing: 0px;
                margin-bottom: 157px;
            }
            .intro {
                padding: 20px 78px 0px 78px;
                font-size: 28px;
                font-weight: 400;
                text-align: left;
                letter-spacing: 1px;
                position: relative;
                max-width: 607px;
            }
            i.quote1 {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 34px;
                height: 21px;
                background: url("~@/assets/images/quote1@2x.png") no-repeat;
                background-size: 100%;
            }
            i.quote2 {
                position: absolute;
                right: 0;
                bottom: 0;
                display: block;
                width: 34px;
                height: 21px;
                background: url("~@/assets/images/quote1@2x.png") no-repeat;
                background-size: 100%;
            }
        }
    }
}

.recommendations {
    .title {
        text-transform: uppercase;
        font-size: 39px;
        font-family: "Broadway";
        font-weight: 400;
        letter-spacing: 2px;
        text-align: left;
        margin-bottom: 115px;
    }
}
</style>
