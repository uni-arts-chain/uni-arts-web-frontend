/** * Created by Lay Hunt on 2020-12-03 18:20:48. */
<template>
    <div class="own-arts">
        <div class="no-data" v-if="list.length == 0">No artworks</div>
        <div class="art-item" v-for="(v, i) in list" :key="i">
            <router-link
                :to="`/art/${type !== 'signature' ? v.id : v.art.id}`"
                class="img-container"
            >
                <AdaptiveImage
                    :url="
                        type !== 'signature'
                            ? v.img_main_file1.url
                            : v.art.img_main_file1.url
                    "
                    width="100%"
                    height="230px"
                ></AdaptiveImage>
            </router-link>
            <h5 class="title">
                {{ type !== "signature" ? v.name : v.art.name }}
            </h5>
            <div class="desc">
                Certificate Address:
                {{ type !== "signature" ? v.item_hash : v.art.item_hash }}
            </div>
            <div class="organization-name" v-if="type === 'signature'">
                {{ v.organization.name }}
            </div>
            <div class="price" v-if="type !== 'signature'">
                {{ v.price }} UART
            </div>
            <div class="address-label" v-if="type !== 'signature'">
                <span class="tag">
                    {{ v.aasm_state }}
                </span>
            </div>
            <div class="action" v-if="type == 'signature'" @click="show(v)">
                Check
            </div>
        </div>
    </div>
</template>
<script>
import AdaptiveImage from "@/components/AdaptiveImage";
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
        AdaptiveImage,
    },
    methods: {
        next() {
            if (this.hasNext) {
                this.page++;
                this.requestData();
            }
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
}

.title {
    text-transform: uppercase;
    font-size: 19px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0px;
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
}
.action {
    border: 2px solid #020202;
    font-size: 16px;
    margin-top: 20px;
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
.desc {
    display: block;
}

.tag {
    border: 2px solid #020202;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    color: #020202;
    letter-spacing: 0px;
    padding: 4px 10px;
    margin-right: 10px;
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
.no-data {
    color: #666;
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
