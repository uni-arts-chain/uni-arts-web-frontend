/** * Created by Lay Hunt on 2021-04-15 19:37:14. */
<template>
    <div class="comments" v-if="art.details">
        <div class="title">Comments on works</div>
        <div class="comment-content">
            {{ art.details }}
        </div>
    </div>
</template>
<script>
export default {
    name: "comment",
    computed: {
        art() {
            return this.$store.state.art.art;
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.comments {
    margin-bottom: 180px;
    @media screen and (max-width: 970px) {
        width: 100%;
        margin-bottom: 30px;
    }
    > .title {
        @media screen and (max-width: 970px) {
            margin-bottom: 30px;
            font-size: 24px;
            margin-left: 5%;
        }
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
    .comment-content {
        @media screen and (max-width: 970px) {
            width: 90%;
            margin-bottom: 30px;
            font-size: 18px;
            margin-left: 5%;
            margin-right: 5%;
            letter-spacing: 0;
            line-height: 20px;
        }
        font-size: 23px;
        font-weight: 400;
        text-align: left;
        line-height: 36px;
        letter-spacing: 1px;
    }
}
</style>
