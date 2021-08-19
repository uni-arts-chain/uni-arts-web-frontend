/** * Created by Lay Hunt on 2021-02-01 14:02:47. */
<template>
    <div
        class="similar"
        v-if="similarList.length > 0"
        v-loading="isSmilarLoading"
        :list="similarList"
    >
        <div class="title">Recommend Arts</div>
        <div class="content">
            <Thumbnail :list="similarList"></Thumbnail>
        </div>
    </div>
</template>
<script>
import Thumbnail from "@/components/Thumbnail";
export default {
    name: "similar",
    components: {
        Thumbnail,
    },
    data() {
        return {
            isSmilarLoading: false,
            similarList: [],
        };
    },
    mounted() {
        this.requestSimilarData();
    },
    methods: {
        requestSimilarData() {
            if (!this.$store.state.user.info.address) {
                return;
            }
            this.isSmilarLoading = true;
            this.$http
                .userGetArtSimilar({})
                .then((res) => {
                    this.isSmilarLoading = false;
                    this.similarList = res;
                })
                .catch((err) => {
                    console.log(err);
                    this.isSmilarLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.similar {
    @media screen and (max-width: 970px) {
        width: 100%;
        margin-bottom: 30px;
    }
    margin-bottom: 180px;
    > .title {
        @media screen and (max-width: 970px) {
            font-size: 24px;
            margin-left: 5%;
            margin-bottom: 30px;
        }
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
}
</style>
