/** * Created by Lay Hunt on 2020-11-18 09:55:23. */
<template>
    <div class="index">
        <div class="container">
            <h2 class="title">market</h2>
            <div class="filter">
                <div class="name">
                    <div class="name-item">Classification</div>
                    <div class="name-item">Theme</div>
                    <div class="name-item">Price</div>
                </div>
                <div class="catetory">
                    <div class="catetory-item">oil painting</div>
                    <div class="catetory-item">print</div>
                    <div class="catetory-item">watercolor</div>
                    <div class="catetory-item">ink painting</div>
                </div>
            </div>
            <div class="content">
                <Thumbnail :list="list" :isGroup="true"></Thumbnail>
            </div>
            <div class="pagenation">
                <div class="prev"></div>
                <div class="next"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Thumbnail from "@/components/Thumbnail";
export default {
    name: "index",
    components: { Thumbnail },
    data() {
        return {
            list: [
                require("@/assets/images/temp/home-page1.jpg"),
                require("@/assets/images/temp/home-page2.jpg"),
                require("@/assets/images/temp/home-page3.jpg"),
                require("@/assets/images/temp/recommend-page1.jpg"),
                require("@/assets/images/temp/recommend-page2.jpg"),
                require("@/assets/images/temp/recommend-page3.jpg"),
                require("@/assets/images/temp/worklist1.jpg"),
                require("@/assets/images/temp/worklist2.jpg"),
                require("@/assets/images/temp/worklist3.jpg"),
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.index {
    padding-top: 60px;
}
h2.title {
    font-family: "Broadway";
    font-size: 44px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 60px;
}

.filter {
    display: flex;
    flex-direction: column;
    .name {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 40px;
    }
    .name-item {
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 0px;
        margin-right: 82px;
        cursor: pointer;
    }
    .catetory {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 71px;
    }
    .catetory-item {
        border: 2px solid #020202;
        padding: 7px 15px;
        margin-right: 50px;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        letter-spacing: 0px;
        min-width: 150px;
        cursor: pointer;
    }
}

.content {
}

.pagenation {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 133px;
    .prev {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/zuo@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .next {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/you@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
}
</style>
