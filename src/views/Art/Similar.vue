/** * Created by Lay Hunt on 2021-02-01 14:02:47. */
<template>
    <div class="similar" v-loading="isLoading">
        <div class="title">Recommend Arts</div>
        <div class="content">
            <Thumbnail :list="list"></Thumbnail>
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
            isLoading: false,
            list: [],
        };
    },
    created() {
        this.requestData();
    },
    methods: {
        requestData() {
            this.isLoading = true;
            this.$http
                .userGetArtSimilar({})
                .then((res) => {
                    this.isLoading = false;
                    this.list = res;
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.similar {
    margin-bottom: 180px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
    .content {
    }
}
</style>
