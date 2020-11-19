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
                <div class="item" v-for="(v, i) in list" :key="i">
                    <div class="img-container">
                        <img :src="list[i]" />
                    </div>
                    <h5 class="title">Mariah Bareilles</h5>
                    <div class="desc">Passionate Latin</div>
                    <div class="address-label">
                        Certificate Address:
                        <span class="address"
                            >0xsbd354sdf44sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf</span
                        >
                    </div>
                    <div class="price">950 UART</div>
                </div>
            </div>
            <div class="pagenation">
                <div class="prev"></div>
                <div class="next"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "index",
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
    overflow: hidden;
    .item {
        float: left;
        width: 30%;
        margin-right: 5%;
        margin-bottom: 93px;
        cursor: pointer;
    }
    .item:nth-child(3n) {
        margin-right: 0;
    }

    .img-container {
        width: 100%;
        height: 270px;
        overflow: hidden;
        border-radius: 4px;
        margin-bottom: 35px;
        position: relative;
        img {
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
        }
    }

    .title {
        text-transform: uppercase;
        font-size: 22px;
        font-weight: 600;
        text-align: left;
        letter-spacing: 0px;
    }
    .desc,
    .address-label {
        font-size: 18px;
        font-weight: 400;
        text-align: left;
        line-height: 35px;
        letter-spacing: 0px;
    }

    .address-label {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .price {
        font-size: 22px;
        font-weight: 600;
        text-align: left;
        line-height: 30px;
        letter-spacing: 0px;
        margin-top: 8px;
    }
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
