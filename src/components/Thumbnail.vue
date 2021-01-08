/** * Created by Lay Hunt on 2020-11-19 11:37:45. */
<template>
    <div class="thumbnail" :class="{ group: isGroup }">
        <div class="no-data" v-if="list.length == 0">No artworks</div>
        <div class="item" v-for="(v, i) in list" :key="i">
            <router-link :to="`/art/${v.id}`" class="img-container">
                <AdaptiveImage :url="v.img_main_file1.url"></AdaptiveImage>
                <div class="aution-view" v-if="v.aasm_state == 'auctioning'">
                    {{
                        computeBlockTimestamp(v.auction_start_time) | dateFormat
                    }}
                    ~
                    {{ computeBlockTimestamp(v.auction_end_time) | dateFormat }}
                </div>
                <div class="aution-label" v-if="v.aasm_state == 'auctioning'">
                    AUCTIONING
                </div>
            </router-link>
            <h5 class="title">{{ v.name }}</h5>
            <div class="desc">{{ materialType(v.material_id) }}</div>
            <div class="address-label">
                Certificate Address:
                <span class="address">{{ v.item_hash }}</span>
            </div>
            <div class="price">{{ v.price }} UART</div>
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "./AdaptiveImage";
import { ComputeBlockTimestamp } from "@/utils";
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
        computeBlockTimestamp(blockNumber) {
            return ComputeBlockTimestamp(
                blockNumber,
                this.$store.state.global.chain.timestamp,
                this.$store.state.global.chain.blockHeight
            );
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
        background-color: rgba(0, 0, 0, 0.7);
    }
    .aution-label {
        line-height: 35px;
        position: absolute;
        top: 0;
        border-bottom-left-radius: 4px;
        padding: 0 10px;
        right: 0;
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
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

.no-data {
    color: #666;
}
</style>
