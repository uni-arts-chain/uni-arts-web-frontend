/** * Created by Lay Hunt on 2020-11-19 15:01:35. */
<template>
    <div class="artgroupList">
        <div class="card" v-for="(v, k) in list" :key="k">
            <div class="avatar" @click="detail(v.id)">
                <AdaptiveImage
                    :url="v.avatar.url ? v.avatar.url : userImage"
                ></AdaptiveImage>
            </div>
            <div class="name">{{ v.display_name || "Anonymous" }}</div>
            <RowText class="desc" :text="v.desc || v.address" />
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "@/components/AdaptiveImage";
import RowText from "@/components/RowText";
import userImage from "@/assets/images/yin@2x.png";
export default {
    name: "artgroupList",
    components: { AdaptiveImage, RowText },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            userImage,
        };
    },
    methods: {
        detail(id) {
            this.$router.push(`/artist-detail/${id}`);
        },
    },
};
</script>
<style lang="scss" scoped>
.artgroupList {
    display: flex;
    justify-content: space-between;
}
.card {
    @media screen and (max-width: 970px) {
        width: 90%;
        margin: 0 5%;
        border: 2px solid black;
        border-radius: 8px;
        height: unset;
    }
    width: 30%;
    height: 364px;
    box-shadow: 0 0 30px 0 #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .avatar {
        @media screen and (max-width: 970px) {
            margin-top: 10px;
        }
        width: 120px;
        height: 120px;
        overflow: hidden;
        border: 4px solid black;
        border-radius: 50%;
        cursor: pointer;
    }
    .avatar.empty {
        border-color: transparent;
    }
    .name {
        @media screen and (max-width: 970px) {
            margin-top: 10px;
        }
        margin-top: 50px;
        font-size: 22px;
        font-weight: 600;
        max-width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        letter-spacing: 0px;
        text-transform: uppercase;
    }
    > .desc {
        @media screen and (max-width: 970px) {
            margin-top: 10px;
        }
        margin-top: 29px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        width: 100%;
        display: block;
        word-wrap: break-word;
        padding-left: 20px;
        padding-right: 20px;
        text-transform: uppercase;
        max-width: 100%;
        overflow: hidden;
    }
}
</style>
