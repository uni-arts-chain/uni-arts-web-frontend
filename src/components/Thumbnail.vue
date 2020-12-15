/** * Created by Lay Hunt on 2020-11-19 11:37:45. */
<template>
    <div class="thumbnail" :class="{ group: isGroup }">
        <div class="item" v-for="(v, i) in list" :key="i">
            <router-link :to="`/art/${1}`" class="img-container">
                <AdaptiveImage :url="v.img_main_file1.url"></AdaptiveImage>
            </router-link>
            <h5 class="title">{{ v.name }}</h5>
            <div class="desc">{{ materialType(v.material_id) }}</div>
            <div class="address-label">
                Address:
                <span class="address">{{ v.member.address }}</span>
            </div>
            <div class="price">950 UART</div>
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "./AdaptiveImage";
export default {
    name: "thumbnail",
    components: {
        AdaptiveImage,
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
    },
    data() {
        return {};
    },
    methods: {
        materialType(id) {
            let item = this.$store.state.art.materials.find(
                (v) => v.code == id + ""
            );
            return item ? item.title : "";
        },
    },
};
</script>
<style lang="scss" scoped>
.thumbnail {
    overflow: hidden;
}
.thumbnail.group {
    .item {
        margin-bottom: 115px;
    }
}
.item {
    float: left;
    width: 30%;
    margin-right: 5%;
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
    img {
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
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
}

.price {
    font-size: 22px;
    font-weight: 600;
    text-align: left;
    line-height: 30px;
    letter-spacing: 0px;
    margin-top: 8px;
}
</style>
