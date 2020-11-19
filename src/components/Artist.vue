/** * Created by Lay Hunt on 2020-11-19 18:32:38. */
<template>
    <div class="artist">
        <div class="profile">
            <div class="avatar">
                <img src="@/assets/images/temp/avatar1.webp" />
                <div class="info">
                    <span class="name">Noah Schnapp</span>
                    <span class="desc"
                        >Shanghai people graduated from Stanford
                        University</span
                    >
                </div>
            </div>
            <div class="works">
                <i class="zp"></i>
                <span>12 works</span>
            </div>
        </div>
        <Thumbnail class="thumbnail" :list="list"></Thumbnail>
    </div>
</template>
<script>
import Thumbnail from "@/components/Thumbnail";
export default {
    name: "artist",
    components: { Thumbnail },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 97px;
    img {
        width: 95px;
        height: 95px;
        border: 4px solid #020202;
        border-radius: 50%;
    }
}
.avatar {
    display: flex;
    align-items: center;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 32px;
    .name {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0px;
        margin-bottom: 10px;
        text-align: left;
    }
    .desc {
        font-size: 16px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 1px;
        max-width: 233px;
        line-height: 20px;
    }
}
.works {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    letter-spacing: 0px;
    .zp {
        margin-right: 12px;
        display: block;
        width: 27px;
        height: 25px;
        background: url("~@/assets/images/zuopin@2x.png") no-repeat;
        background-size: 100% auto;
    }
}
.thumbnail {
    margin-bottom: 130px;
}
</style>
