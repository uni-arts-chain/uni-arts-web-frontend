/** * Created by Lay Hunt on 2020-12-03 18:20:48. */
<template>
    <div class="own-arts">
        <div class="no-data" v-if="list.length == 0">No artworks</div>
        <div class="art-item" v-for="(v, i) in list" :key="i">
            <router-link :to="`/art/${getArtId(v)}`" class="img-container">
                <AdaptiveView
                    :nft="v.art"
                    :isResponsive="true"
                    :isPreview="true"
                    width="100%"
                    height="270px"
                />
                <div class="copyright-icon" v-if="v.has_royalty">
                    <div class="icon-sub">
                        <div class="sub"></div>
                        <icon-svg icon-class="copyright" />
                    </div>
                </div>
            </router-link>
            <h5 class="title">
                <span class="title-name">{{ getArtName(v) }}</span>
            </h5>
            <div class="desc">
                NFT Address:
                {{ getItemHash(v) }}
            </div>
            <div class="date">
                Opening time:
                {{ getOpentime(v) | dateDayFormat }}
            </div>
            <div class="price">
                <span style="color: #c61e1e; margin-right: 10px">{{
                    getArtPrice(v)
                }}</span
                >{{ $store.state.global.chain.tokenSymbol }}
            </div>
        </div>
    </div>
</template>
<script>
import AdaptiveView from "@/components/AdaptiveView";
export default {
    name: "order",
    props: {
        list: {
            type: Array,
            default: () => [],
        },
        type: {
            type: String,
            default: "all",
        },
    },
    components: {
        AdaptiveView,
    },
    methods: {
        next() {
            if (this.hasNext) {
                this.page++;
                this.requestData();
            }
        },
        getArtId(item) {
            return item.art.id;
        },
        getArtName(item) {
            return item.art.name;
        },
        getItemHash(item) {
            return item.art.item_hash;
        },
        getArtPrice(item) {
            return item.price ? item.price : 0;
        },
        getOpentime(item) {
            return item.created_at;
        },
        prev() {
            if (this.hasPrev) {
                this.page--;
                this.requestData();
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.own-arts {
    min-height: 100%;
    padding-top: 30px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.art-item {
    float: left;
    width: 30%;
    margin-right: 5%;
    margin-bottom: 35px;
}
.art-item:nth-child(3n) {
    margin-right: 0;
}

.img-container {
    display: block;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 30px;
    position: relative;
    img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
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
    width: 100%;
    display: flex;
    align-items: center;
    .title-name {
        /* max-width: calc(100% - 40px); */
        max-width: 100%;
        text-transform: uppercase;
        font-size: 20px;
        font-weight: 600;
        text-align: left;
        letter-spacing: 0px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 10px;
    }
    /* .copyright-icon {
        font-size: 20px;
        color: black;
    } */
}
.desc,
.address-label {
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
}

.desc {
    display: block;
}

.tag {
    border: 2px solid #c3c3c3;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #999;
    letter-spacing: 0px;
    padding: 4px 10px;
    margin-right: 10px;
    cursor: default;
    text-transform: capitalize;
}

.price {
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    line-height: 30px;
    letter-spacing: 0px;
    margin-top: 10px;
}
.date {
    text-align: left;
    margin-top: 10px;
    font-size: 18px;
}
.no-data {
    color: #666;
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
