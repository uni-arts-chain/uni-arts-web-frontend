/** * Created by Lay Hunt on 2020-12-03 18:20:48. */
<template>
    <div class="own-arts">
        <div class="no-data" v-if="list.length == 0">No artworks</div>
        <div class="art-item" v-for="(v, i) in list" :key="i">
            <router-link :to="`/art/${getArtId(v)}`" class="img-container">
                <AdaptiveView
                    :nft="getImageResource(v)"
                    :isResponsive="false"
                    :isPreview="true"
                    width="100%"
                    height="230px"
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
                Certificate Address:
                {{ getItemHash(v) }}
            </div>
            <div class="organization-name" v-if="type === 'signature'">
                {{ getOrganizationName(v) }}
            </div>
            <div class="price" v-if="type !== 'signature'">
                {{ getArtPrice(v) || 0 }}
                {{ $store.state.global.chain.tokenSymbol }}
            </div>
            <div class="date" v-if="type == 'sold' || type == 'bought'">
                {{ type == "bought" ? "Purchased on " : "Sold on " }}
                {{ getDateTime(v) | dateFormat }}
            </div>
            <div class="address-label" v-if="type == 'all'">
                <span class="tag">
                    {{ getArtAasmState(v) }}
                </span>
            </div>
            <router-link
                :to="
                    getArtAasmState(v) == 'prepare' ? '' : `/art/${getArtId(v)}`
                "
                class="action"
                :class="{ disabled: getArtAasmState(v) != 'online' }"
                v-if="type == 'all' && getArtAasmState(v) != 'prepare'"
            >
                Auction Now
            </router-link>
            <!-- <router-link
                :to="`/account/edit/${v.id}`"
                class="action"
                v-else-if="type == 'all' && getArtAasmState(v) == 'prepare'"
            >
                Edit
            </router-link> -->
            <div class="action" v-if="type == 'signature'" @click="show(v)">
                Check
            </div>
            <div
                class="action"
                v-if="type == 'all'"
                :class="{ disabled: getArtAasmState(v) != 'online' }"
                @click="show(v)"
            >
                Transfer
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
        getImageResource(item) {
            if (
                this.type == "bought" ||
                this.type == "sold" ||
                this.type == "signature"
            ) {
                return item.art;
            } else {
                return item;
            }
        },
        getArtId(item) {
            if (
                this.type == "bought" ||
                this.type == "sold" ||
                this.type == "signature"
            ) {
                return item.art.id;
            } else {
                return item.id;
            }
        },
        getArtName(item) {
            if (
                this.type == "bought" ||
                this.type == "sold" ||
                this.type == "signature"
            ) {
                return item.art.name;
            } else {
                return item.name;
            }
        },
        getItemHash(item) {
            if (
                this.type == "bought" ||
                this.type == "sold" ||
                this.type == "signature"
            ) {
                return item.art.item_hash;
            } else {
                return item.item_hash;
            }
        },
        getOrganizationName(item) {
            if (
                this.type == "bought" ||
                this.type == "sold" ||
                this.type == "signature"
            ) {
                return item.organization.name;
            } else {
                return item.organization.name;
            }
        },
        getArtPrice(item) {
            if (
                this.type == "bought" ||
                this.type == "sold" ||
                this.type == "signature"
            ) {
                return item.art.price;
            } else {
                return item.price;
            }
        },
        getArtAasmState(item) {
            if (this.type == "signature") {
                return item.art.aasm_state;
            } else if (this.type == "bought" || this.type == "sold") {
                return item.art.aasm_state;
            } else {
                return item.aasm_state;
            }
        },
        getDateTime(item) {
            return item.buy_time;
        },
        prev() {
            if (this.hasPrev) {
                this.page--;
                this.requestData();
            }
        },
        show(item) {
            this.$emit("show", item);
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
    @media screen and (max-width: 970px) {
        min-height: unset;
        flex-direction: column;
    }
}
.art-item {
    float: left;
    width: 30%;
    margin-right: 5%;
    margin-bottom: 35px;
    @media screen and (max-width: 970px) {
        width: 90%;
    }
}
.art-item:nth-child(3n) {
    margin-right: 0;
}

.img-container {
    display: block;
    width: 100%;
    height: 230px;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 20px;
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
        font-size: 19px;
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
.organization-name {
    font-size: 17px;
    margin-top: 10px;
    font-weight: 500;
    text-align: left;
    letter-spacing: 0px;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.desc,
.address-label {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    min-height: 18px;
}
.action {
    border: 2px solid #020202;
    font-size: 16px;
    margin-top: 20px;
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

.action.disabled {
    border: 2px solid #c3c3c3;
    color: #999;
    cursor: not-allowed;
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
    font-size: 17px;
    font-weight: 600;
    text-align: left;
    line-height: 30px;
    letter-spacing: 0px;
    margin-top: 5px;
}
.date {
    text-align: left;
    margin-top: 5px;
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
