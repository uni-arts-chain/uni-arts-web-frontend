/** * Created by Lay Hunt on 2020-11-19 11:37:45. */
<template>
    <div class="thumbnail" :class="{ group: isGroup }">
        <div class="no-data" v-if="list.length == 0">No artworks</div>
        <ThumbnailImgView
            :item="v"
            :isGroup="isGroup"
            :isAuction="isAuction"
            v-for="(v, i) in list"
            :key="i"
        />
    </div>
</template>
<script>
import ThumbnailImgView from "@/components/ThumbnailImgView";
export default {
    name: "thumbnail",
    components: {
        ThumbnailImgView,
    },
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        isGroup: {
            type: Boolean,
            default: false,
        },
        isAuction: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
<style lang="scss" scoped>
.thumbnail {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    @media screen and (max-width: 970px) {
        flex-direction: column;
    }
}
.thumbnail.group {
    .item {
        @media screen and (max-width: 970px) {
            margin-bottom: 40px;
        }
        margin-bottom: 115px;
    }
}
.item {
    @media screen and (max-width: 970px) {
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
    }
    width: 30%;
    margin-right: 60px;
    margin-bottom: 35px;
}
.item:nth-child(3n) {
    margin-right: 0;
}

.img-container {
    display: block;
    width: 100%;
    height: 270px;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 35px;
    position: relative;
    .aution-view {
        width: 100%;
        line-height: 35px;
        position: absolute;
        bottom: 0;
        color: white;
        text-align: center;
        background-color: rgba(134, 29, 57, 0.8);
    }
    .aution-label {
        line-height: 35px;
        position: absolute;
        top: 15px;
        left: 0;
        padding: 0px 16px;
        background-color: #f9b43b;
        font-size: 16px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        font-weight: 600;
        text-align: center;
        color: #ffffff;
        letter-spacing: 0px;
    }
    .copyright-icon {
        position: absolute;
        bottom: 0px;
        right: 0px;
        width: 50px;
        height: 50px;
        color: white;
        font-size: 20px;
        .icon-sub {
            position: relative;
            width: 100%;
            height: 100%;
        }
        .sub {
            position: absolute;
            border-left: 50px solid transparent;
            border-bottom: 50px solid rgba(0, 0, 0, 0.3);
            width: 0;
            height: 0;
            left: 50%;
            top: 50%;
            transform: translateY(-50%) translateX(-50%);
        }
        .svg-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            /* color: #c61e1e; */
            color: white;
        }
    }
}

.title {
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0px;
}
.desc,
.address-label {
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    line-height: 35px;
    letter-spacing: 0px;
}

.address-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-height: 35px;
}

.price {
    font-size: 22px;
    font-weight: 600;
    text-align: left;
    line-height: 30px;
    letter-spacing: 0px;
    margin-top: 8px;
}

.button-group {
    width: 100%;
    > button {
        width: 100%;
        border: 2px solid #020202;
        font-size: 16px;
        height: 47px;
        margin-top: 10px;
        display: block;
        cursor: pointer;
        font-weight: 400;
        text-align: center;
        background: transparent;
        color: #020202;
        letter-spacing: 0px;
        padding: 6px 10px;
        margin-right: 10px;
        text-transform: capitalize;
    }
}

.no-data {
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    color: #666;
}
</style>
