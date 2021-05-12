/** * Created by Lay Hunt on 2020-11-19 11:37:45. */
<template>
    <div class="item">
        <router-link :to="`/art/${item.id}`" class="img-container">
            <AdaptiveView
                @imgLoaded="imgLoaded"
                :nft="item"
                :isResponsive="false"
                :isPreview="true"
            />
            <div class="aution-view" v-if="item.aasm_state == 'auctioning'">
                {{
                    computeBlockTimestamp(item.auction_start_time) | dateFormat
                }}
                ~
                {{ computeBlockTimestamp(item.auction_end_time) | dateFormat }}
            </div>
            <div
                class="aution-label"
                :style="`left: ${labelPostion.left}px;top: ${labelPostion.top}px;`"
                v-if="item.aasm_state == 'auctioning'"
            >
                IN AUCTION
            </div>
            <div class="copyright-icon" v-if="item.has_royalty">
                <div class="icon-sub">
                    <div class="sub"></div>
                    <icon-svg icon-class="copyright" />
                </div>
            </div>
        </router-link>
        <h5 class="title">{{ item.name }}</h5>
        <div class="desc">{{ materialType(item.material_id) }}</div>
        <div class="address-label">
            Certificate Address:
            <span class="address">{{ item.item_hash }}</span>
        </div>
        <div class="price" v-if="!isAuction">
            {{ item.price }} {{ item.currency_code.toUpperCase() }}
        </div>
        <div class="price" v-else>
            Starting at {{ item.price }} {{ item.currency_code.toUpperCase() }}
        </div>
    </div>
</template>
<script>
import AdaptiveView from "./AdaptiveView";
import { ComputeBlockTimestamp } from "@/utils";
export default {
    name: "thumbnail",
    components: {
        AdaptiveView,
    },
    props: {
        item: {
            type: Object,
            default: () => {},
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
        return {
            labelPostion: {
                left: 0,
                top: 0,
            },
        };
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
        imgLoaded(info) {
            info.top = info.top + 15;
            this.labelPostion.left = info.left;
            this.labelPostion.top = info.top;
        },
    },
};
</script>
<style lang="scss" scoped>
.thumbnail {
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}
.thumbnail.group {
    .item {
        margin-bottom: 115px;
    }
}
.item {
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
    min-height: 35px;
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
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    color: #666;
}
</style>
