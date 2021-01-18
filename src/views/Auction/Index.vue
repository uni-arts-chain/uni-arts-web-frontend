/** * Created by Lay Hunt on 2021-01-18 15:30:51. */
<template>
    <div class="index container" v-loading="isSubmiting">
        <div class="banner">
            <AdaptiveImage width="100%" height="100%" :url="page" />
            <div class="info-body">
                <div>Time limited auction</div>
                <div style="margin-top: 20px">
                    {{ timeLimit(auctionInfo.start_at) }} —
                    {{ timeLimit(auctionInfo.end_at) }}
                </div>
            </div>
        </div>
        <div class="title">
            {{ auctionInfo.topic }}
        </div>
        <div class="date">
            <div class="date-time">
                {{ timeLimit(auctionInfo.start_at) }} —
                {{ timeLimit(auctionInfo.end_at) }}
            </div>
            <div class="time" v-if="status != 'end'">
                {{
                    status == "waiting"
                        ? "START AFTER"
                        : status == "auctioning"
                        ? "END AFTER"
                        : ""
                }}
                <div class="time-parse">
                    <div class="day">{{ countdown.day }}d</div>
                    :
                    <div class="hour">{{ countdown.hour }}</div>
                    :
                    <div class="minute">{{ countdown.minute }}</div>
                    :
                    <div class="second">{{ countdown.second }}</div>
                </div>
            </div>
        </div>
        <div class="entrance">
            <router-link :to="`/auction/${auctionInfo.id}/apply`"
                >Apply</router-link
            >
            <router-link :to="`/auction/${auctionInfo.id}/candidates`"
                >List</router-link
            >
        </div>
        <div class="content">
            <Thumbnail :list="list" class="content-list" />
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "@/components/AdaptiveImage";
import Thumbnail from "@/components/Thumbnail";
import page1 from "@/assets/images/temp/home-page1.jpg";
export default {
    name: "index",
    components: {
        AdaptiveImage,
        Thumbnail,
    },
    data() {
        return {
            page: page1,
            list: [],
            auctionInfo: {},
            id: this.$route.params.id,
            isSubmiting: false,
            countdown: [],
            status: "waiting",
            timeWorkId: "",
        };
    },
    created() {
        this.requestData();
    },
    beforeDestroy() {
        this.timeWorkdId ? clearInterval(this.timeWork) : "";
    },
    methods: {
        requestData() {
            this.isSubmiting = true;
            this.$http
                .globalGetAuctionInfo({}, { id: this.id })
                .then((res) => {
                    this.isSubmiting = false;
                    this.auctionInfo = res;

                    let time = new Date().getTime();
                    if (res.start_at > time + "") {
                        this.initTimeWork(res.start_at);
                        this.status = "waiting";
                    } else if (res.end_at < time + "") {
                        this.status = "end";
                    } else {
                        this.initTimeWork(res.end_at);
                        this.status = "auctioning";
                    }
                    this.requestArtData();
                })
                .catch((err) => {
                    console.log(err);
                    this.isSubmiting = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        requestArtData() {
            this.$http
                .globalGetAuctionArtInfo({}, { id: this.id })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    this.isSubmiting = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        timeLimit(inputTime) {
            if (!inputTime) return "";
            var date = new Date(inputTime * 1000);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            var d = date.getDate();
            d = d < 10 ? "0" + d : d;
            return y + "." + m + "." + d;
        },
        countdownFormat(time) {
            time = parseInt(time) * 1000;
            let jetLag = Math.abs(new Date().getTime() - time) / 1000;
            let second = parseInt(jetLag % 60),
                minute = parseInt((jetLag / 60) % 60),
                hour = parseInt((jetLag / 3600) % 24),
                day = parseInt(jetLag / 3600 / 24);
            return {
                second: second < 10 ? "0" + second : second,
                hour: hour < 10 ? "0" + hour : hour,
                minute: minute < 10 ? "0" + minute : minute,
                day,
            };
        },
        initTimeWork(time) {
            this.timeWorkId = setInterval(() => {
                this.countdown = this.countdownFormat(time);
            }, 1000);
        },
    },
};
</script>
<style lang="scss" scoped>
.banner {
    height: 469px;
    width: 100%;
    position: relative;
    .info-body {
        position: absolute;
        width: 384px;
        height: 150px;
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
            font-size: 20px;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            letter-spacing: 2px;
        }
    }
}
.title {
    margin-top: 98px;
    font-size: 39px;
    font-family: "Broadway";
    font-weight: 400;
    text-align: center;
    color: #020202;
    line-height: 63px;
    letter-spacing: 2px;
    text-transform: uppercase;
}
.date {
    margin-top: 50px;
    margin-bottom: 72px;
    .date-time {
        font-size: 28px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: center;
        color: #020202;
        line-height: 63px;
        letter-spacing: 2px;
        margin-bottom: 10px;
    }
    .time {
        color: #c61e1e;
        font-size: 30px;
        font-family: "Broadway";
        font-weight: 400;
        line-height: 63px;
        letter-spacing: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .time-parse {
        font-family: "Broadway";
        display: flex;
        align-items: center;
        margin-left: 13px;
        .day,
        .hour,
        .minute,
        .second {
            width: 76px;
            height: 47px;
            font-size: 28px;
            line-height: 47px;
            font-family: "Broadway";
            color: white;
            border-radius: 13px;
            padding: 0 10px;
            margin: 0 10px;
            background-color: #c61e1e;
        }
        .day {
            width: auto;
            min-width: 76px;
            display: inline-block;
        }
    }
}
.content {
    margin-bottom: 120px;
    .content-list {
        min-height: 300px;
    }
}
.entrance {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 102px;
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #020202;
        border: 2px solid #020202;
        background-color: transparent;
        padding: 0 10px;
        min-width: 200px;
        height: 50px;
        font-weight: 500;
        font-size: 20px;
        margin: 0 20px;
        cursor: pointer;
    }
}
</style>
