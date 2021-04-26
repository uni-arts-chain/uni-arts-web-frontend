/** * Created by Lay Hunt on 2021-04-22 14:43:07. */
<template>
    <div class="index">
        <div class="container">
            <div class="title">Blind Box</div>
            <div class="card-list">
                <div
                    class="card"
                    v-for="(v, i) in list"
                    :key="i"
                    @click="goDetail(v)"
                >
                    <AdaptiveImage
                        width="100%"
                        height="400px"
                        :url="v.img_path"
                    />
                    <div class="info">
                        <div class="name-body">
                            <div class="name">{{ v.title }}</div>
                            <span class="date"
                                >{{ v.start_time | dateDayFormat }} ~
                                {{ v.end_time | dateDayFormat }}</span
                            >
                        </div>
                        <RowText
                            class="desc"
                            :text="v.desc"
                            :textLength="170"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "@/components/AdaptiveImage";
import RowText from "@/components/RowText";
export default {
    name: "index",
    components: {
        AdaptiveImage,
        RowText,
    },
    data() {
        return {
            isLoading: false,
            list: [],
            // total_count: 0,
            // total_pages: 0,
        };
    },
    mounted() {
        this.requestData();
    },
    methods: {
        requestData() {
            this.$http["globalGetBlindBoxList"]({})
                .then((res) => {
                    this.isLoading = false;
                    this.list = res.list;
                    this.total_count = res.total_count;
                    this.total_pages = Math.ceil(
                        res.total_count / this.per_page
                    );
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        goDetail(item) {
            this.$router.push("/blindbox/detail/" + item.id);
        },
    },
};
</script>
<style lang="scss" scoped>
.index {
    margin-bottom: 180px;
    padding-top: 35px;
    .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        text-transform: uppercase;
        letter-spacing: 0px;
        margin-bottom: 50px;
    }
    .card {
        width: 100%;
        height: 575px;
        overflow: hidden;
        cursor: pointer;
        border-radius: 20px;
        margin-bottom: 44px;
        box-shadow: 0px 1px 11px 0px rgba(0, 0, 0, 0.15);
        .info {
            width: 100%;
            height: calc(100% - 400px);
            padding: 30px 18px;
        }
        .name-body {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .name {
            width: calc(100% - 400px);
            font-size: 34px;
            font-weight: 400;
            text-align: left;
            font-family: Broadway;
            margin-bottom: 12px;
            color: #020202;
        }
        .date {
            width: 400px;
            font-family: Broadway;
            display: block;
            font-size: 18px;
            text-align: right;
        }
        .desc {
            font-size: 24px;
            font-weight: 400;
            text-align: left;
            color: #333333;
            text-transform: none;
            letter-spacing: 0px;
        }
    }
}
</style>
