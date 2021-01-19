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
                        <div v-if="item.countdown">
                            {{ item.countdown }}
                        </div>
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
            timeWorkIdList: [],
        };
    },
    created() {
        this.requestData();
    },
    beforeDestroy() {
        this.timeWorkIdList.length > 0
            ? this.timeWorkIdList.forEach((v) => clearInterval(v.timeWorkId))
            : "";
        this.timeWorkIdList = [];
    },
    methods: {
        requestData() {
            this.$http.globalGetAuctionList({}).then((res) => {
                this.list = res.list.map((v) => {
                    v.countdown = "";
                    return v;
                });
                this.total_count = res.total_count;
                this.list.forEach((v) => {
                    this.initTimeWork(v);
                });
            });
        },
        countdownFormat(time) {
            time = parseInt(time) * 1000;
            let jetLag = Math.abs(new Date().getTime() - time) / 1000;
            let second = parseInt(jetLag % 60),
                minute = parseInt((jetLag / 60) % 60),
                hour = parseInt((jetLag / 3600) % 24),
                day = parseInt(jetLag / 3600 / 24);
            if (second == 0 && minute == 0 && hour == 0 && day == 0) {
                return -1;
            } else {
                return `${day}d : ${hour < 10 ? "0" + hour : hour} : ${
                    minute < 10 ? "0" + minute : minute
                } : ${second < 10 ? "0" + second : second}`;
            }
        },
        initTimeWork(item) {
            let obj = {
                id: item.id,
                timeWorkId: "",
            };
            let curTime = new Date().getTime() / 1000;
            let time = "";
            if (curTime < parseInt(item.start_at)) {
                time = item.start_at;
                obj.timeWorkId = setInterval(() => {
                    let result = this.countdownFormat(time);
                    if (result == -1) {
                        this.resetTimeWork(item.id);
                    } else {
                        item.countdown = result;
                    }
                }, 1000);
                this.timeWorkIdList.push(obj);
            } else if (
                curTime >= parseInt(item.start_at) &&
                curTime <= parseInt(item.end_at)
            ) {
                time = item.end_at;
                obj.timeWorkId = setInterval(() => {
                    let result = this.countdownFormat(time);
                    if (result == -1) {
                        this.resetTimeWork(item.id);
                    } else {
                        item.countdown = result;
                    }
                }, 1000);
                this.timeWorkIdList.push(obj);
            }
        },
        resetTimeWork(id) {
            let index = this.timeWorkIdList.findIndex((v) => v.id == id);
            if (index >= 0) {
                clearInterval(this.timeWorkIdList[index].timeWorkId);
                this.timeWorkIdList.splice(index, 1);
                let result = this.list.find((v) => v.id == id);
                if (result) {
                    this.initTimeWork(result);
                }
            }
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
