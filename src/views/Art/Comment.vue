/** * Created by Lay Hunt on 2021-04-15 19:37:14. */
<template>
    <div class="comments">
        <div class="title">Comments on works</div>
        <div class="comment-content">
            {{ art.details }}
        </div>
    </div>
</template>
<script>
export default {
    name: "comment",
    props: {
        art: {
            type: Object,
            default: () => {},
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
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
    .comment-content {
        font-size: 23px;
        font-weight: 400;
        text-align: left;
        line-height: 36px;
        letter-spacing: 1px;
    }
}
</style>
