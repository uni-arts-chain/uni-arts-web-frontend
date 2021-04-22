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
                    <AdaptiveImage width="100%" height="400px" :url="v.url" />
                    <div class="info">
                        <div class="name">{{ v.name }}</div>
                        <RowText
                            class="desc"
                            :text="v.text"
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
import HomePage1 from "@/assets/images/temp/home-page1.jpg";
export default {
    name: "index",
    components: {
        AdaptiveImage,
        RowText,
    },
    data() {
        return {
            HomePage1,
            list: [
                {
                    name: "Ice Box",
                    url: HomePage1,
                    id: 1,
                    text:
                        "A total of 59 heroes participate in this game. Once opened, one NFT owner will be randomly obtained, which can be used for collection and resaleA total of 59 heroes participate in this game. Once opened, one NFT owner will be randomly obtained, which can be used for collection and resaleA total of 59 heroes participate in this game. Once opened, one NFT owner will be randomly obtained, which can be used for collection and resale",
                },
                {
                    name: "Ice Box",
                    url: HomePage1,
                    di: 2,
                    text:
                        "A total of 59 heroes participate in this game. Once opened, one NFT owner will be randomly obtained, which can be used for collection and resaleA total of 59 heroes participate in this game. Once opened, one NFT owner will be randomly obtained, which can be used for collection and resaleA total of 59 heroes participate in this game. Once opened, one NFT owner will be randomly obtained, which can be used for collection and resale",
                },
            ],
        };
    },
    methods: {
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
        .name {
            font-size: 34px;
            font-weight: 400;
            text-align: left;
            font-family: Broadway;
            margin-bottom: 12px;
            color: #020202;
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
