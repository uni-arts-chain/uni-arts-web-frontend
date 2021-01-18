/** * Created by Lay Hunt on 2021-01-18 15:44:06. */
<template>
    <div class="candidates container">
        <div class="title">Candidates</div>
        <div class="content">
            <Thumbnail :list="list" />
        </div>
    </div>
</template>
<script>
import Thumbnail from "@/components/Thumbnail";
export default {
    name: "candidates",
    components: {
        Thumbnail,
    },
    data() {
        return {
            id: this.$route.params.id,
            list: [],
            total_count: 0,
        };
    },
    created() {
        this.requestData();
    },
    methods: {
        requestData() {
            this.$http
                .userGetAuctionApplyList({}, { id: this.id })
                .then((res) => {
                    this.list = res.list;
                    this.total_count = res.total_count;
                })
                .catch((err) => {
                    console.log(err);
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.title {
    margin-top: 70px;
    font-size: 48px;
    font-family: "Broadway";
    font-weight: 400;
    line-height: 40px;
    text-align: left;
    letter-spacing: 0px;
    margin-bottom: 103px;
}
</style>
