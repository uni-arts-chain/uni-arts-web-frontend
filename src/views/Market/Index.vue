/** * Created by Lay Hunt on 2020-11-18 09:55:23. */
<template>
    <div class="index">
        <div class="container">
            <h2 class="title">market</h2>
            <div class="search">
                <Input
                    v-model="searchContent"
                    @enter="search()"
                    class="input"
                    placeholder="Please enter keywords to search works"
                />
                <img @click="search" src="@/assets/images/search@2x.png" />
            </div>
            <div class="filter">
                <div class="name">
                    <div
                        class="name-item"
                        :class="{ active: active_cate == 'markets' }"
                        @click="active_cate = 'markets'"
                    >
                        Market
                    </div>
                    <div
                        class="name-item"
                        :class="{ active: active_cate == 'materials' }"
                        @click="active_cate = 'materials'"
                    >
                        Classification
                    </div>
                    <div
                        class="name-item"
                        @click="active_cate = 'themes'"
                        :class="{ active: active_cate == 'themes' }"
                    >
                        Theme
                    </div>
                    <div
                        class="name-item"
                        @click="active_cate = 'categories'"
                        :class="{ active: active_cate == 'categories' }"
                    >
                        Category
                    </div>

                    <div
                        class="name-item"
                        @click="active_cate = 'royalty'"
                        :class="{ active: active_cate == 'royalty' }"
                    >
                        Royalty
                    </div>
                </div>
                <div class="catetory">
                    <div
                        class="catetory-item"
                        @click="requestFilterData(v)"
                        v-for="(v, i) in categoryList"
                        :key="i"
                        :class="{
                            active:
                                active_cate == 'markets'
                                    ? currentMarket == v.id
                                    : active_subcate == v.id &&
                                      current_cate == v.cate_label,
                        }"
                    >
                        <div v-if="active_cate == 'markets'">
                            {{ v.title }}
                        </div>
                        <div v-else>
                            {{ v.title || "unknown" }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="content" v-loading="isLoading">
                <Thumbnail :list="list" :isGroup="true"></Thumbnail>
            </div>
            <div class="pagenation" v-if="hasPrev || hasNext">
                <div
                    class="prev"
                    @click="prev"
                    :class="{ 'no-prev': !hasPrev }"
                ></div>
                <div
                    class="next"
                    @click="next"
                    :class="{ 'no-next': !hasNext }"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import Input from "@/components/Input";
import Thumbnail from "@/components/Thumbnail";
export default {
    name: "index",
    components: { Thumbnail, Input },
    data() {
        return {
            list: [],
            page: 1,
            markets: [
                {
                    cate_label: "markets",
                    code: this.$store.state.global.symbol.toLowerCase(),
                    desc: this.$store.state.global.symbol.toUpperCase(),
                    id: "uart",
                    title: this.$store.state.global.symbol.toUpperCase(),
                },
                // {
                //     cate_label: "markets",
                //     code: "rmb",
                //     desc: "RMB",
                //     id: "rmb",
                //     title: "RMB",
                // },
            ],
            per_page: 18,
            total_pages: 0,
            total_count: 0,
            category_id: "",
            theme_id: "",
            material_id: "",
            isRoyalty: false,
            currentMarket: "uart",
            // price_gte: "",
            // price_lt: "",
            active_cate: "",
            active_subcate: "",
            current_cate: "",
            isLoading: true,

            searchContent: "",
        };
    },
    created() {
        // this.requsetPriceLimit();
    },
    computed: {
        categoryList() {
            if (this.active_cate == "markets") {
                return this.markets;
            } else if (this.active_cate == "themes") {
                return this.$store.state.art.themes;
            } else if (this.active_cate == "categories") {
                return this.$store.state.art.categories;
            } else if (this.active_cate == "royalty") {
                return [
                    {
                        cate_label: "royalty",
                        id: "royalty1",
                        title: "Royalty",
                    },
                ];
            } else {
                return this.$store.state.art.materials;
            }
        },
        materials() {
            return this.$store.state.art.materials;
        },
        hasPrev() {
            return this.page > 1;
        },
        hasNext() {
            return this.page < this.total_pages;
        },
    },
    watch: {
        materials(value) {
            if (value.length > 0) {
                this.requestData();
            }
        },
    },
    mounted() {
        this.requestData();
    },
    methods: {
        // need to fix
        requestData() {
            this.isLoading = true;
            this.list = [];
            let obj = {
                page: this.page,
                per_page: this.per_page,
            };
            if (this.category_id) {
                obj.category_id = this.category_id;
            } else if (this.theme_id) {
                obj.theme_id = this.theme_id;
            } else if (this.material_id) {
                obj.material_id = this.material_id;
            }
            if (this.isRoyalty) {
                obj.has_royalty = true;
            }
            // if (this.price_gte) {
            //     obj.price_gte = this.price_gte;
            // }
            // if (this.price_lt) {
            //     obj.price_lt = this.price_lt;
            // }
            this.$http
                .globalGetSellingArt(obj)
                .then((res) => {
                    this.isLoading = false;
                    this.current_cate = this.active_cate;
                    this.list = res.list;
                    this.total_count = res.total_count;
                    this.total_pages = Math.ceil(
                        this.total_count / this.per_page
                    );
                })
                .catch((err) => {
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
        search() {
            if (this.isLoading) return;
            this.active_cate = "";
            this.active_subcate = "";
            this.page = 1;
            this.list = [];
            this.isLoading = true;
            this.$http
                .globalGetSearchMarket({
                    q: this.searchContent,
                    page: this.page,
                })
                .then((res) => {
                    this.isLoading = false;
                    this.current_cate = this.active_cate;
                    this.list = res.list ? res.list : res;
                    this.total_count = res.total_count;
                    this.total_pages = Math.ceil(
                        this.total_count / this.per_page
                    );
                })
                .catch((err) => {
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
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
        requestFilterData(item) {
            this.page = 1;
            this.searchContent = "";
            if (
                this.active_cate != item.cate_label ||
                this.active_subcate != item.id
            ) {
                this.active_cate = item.cate_label;
                this.active_subcate = item.id;
            } else {
                // this.active_cate = "";
                this.active_subcate = "";
            }
            this.resetActive_cate(item);
            this.requestData();
        },
        // requsetPriceLimit() {
        //     this.$http
        //         .globalGetPriceInterval({})
        //         .then((res) => {
        //             this.priceInterval = res.map((v, i) => {
        //                 v.id = i + 1;
        //                 v.cate_label = "price";
        //                 return v;
        //             });
        //             this.requestData();
        //         })
        //         .catch((err) => {
        //             this.$notify.error(err.head ? err.head.msg : err);
        //         });
        // },
        resetForm() {
            this.category_id = "";
            this.material_id = "";
            this.price_gte = "";
            this.price_lt = "";
            this.theme_id = "";
            this.isRoyalty = false;
        },
        resetActive_cate(item) {
            this.resetForm();
            // reset
            if (!this.active_subcate) return;

            switch (this.active_cate) {
                case "materials":
                    this.material_id = item.id;
                    break;
                case "themes":
                    this.theme_id = item.id;
                    break;
                case "categories":
                    this.category_id = item.id;
                    break;
                case "price":
                    this.price_gte = item.gte || "";
                    this.price_lt = item.lt || "";
                    break;
                case "royalty":
                    this.isRoyalty = item;
                    break;
                case "markets":
                    this.currentMarket = item.id;
                    break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.index {
    padding-top: 60px;
    @media screen and (max-width: 970px) {
        padding-top: 0px;
        margin-top: 0px;
    }
}
.container {
    min-height: 100px;
}
h2.title {
    font-family: "Broadway";
    font-size: 44px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 60px;
    @media screen and (max-width: 970px) {
        font-size: 24px;
        margin-bottom: 30px;
    }
}
.search {
    width: 100%;
    position: relative;
    text-align: left;
    margin-bottom: 60px;
    @media screen and (max-width: 970px) {
        margin-bottom: 15px;
        text-align: center;
    }
    > img {
        cursor: pointer;
        width: 34px;
        height: 34px;
        position: absolute;
        left: 840px;
        top: 50%;
        transform: translateY(-50%);
        @media screen and (max-width: 970px) {
            left: calc(89% - 15px);
            width: 25px;
            height: 25px;
        }
    }
    .input {
        width: 900px;
        @media screen and (max-width: 970px) {
            width: 90%;
            height: 34px;
            margin-left: 5%;
            margin-right: 5%;
            font-size: 15px;
        }
        height: 69px;
        font-size: 22px;
        ::v-deep input {
            padding-right: 70px;
        }
    }
}
.filter {
    display: flex;
    flex-direction: column;
    .name {
        display: flex;
        @media screen and (max-width: 970px) {
            flex-wrap: wrap;
            margin-bottom: 10px;
            margin-left: 5%;
            margin-right: 1%;
        }
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 40px;
    }
    .name-item {
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 0;
        margin-right: 82px;
        color: #606060;
        cursor: pointer;
        @media screen and (max-width: 970px) {
            margin: 0 4% 0 0;
            font-size: 15px;
        }
    }
    .name-item.active {
        color: black;
    }
    .name-item:hover {
        color: black;
    }
    .catetory {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 71px;
        @media screen and (max-width: 970px) {
            margin-bottom: 20px;
            margin-left: 5%;
            margin-right: 1%;
        }
    }
    .catetory-item {
        border: 2px solid #606060;
        padding: 7px 15px;
        margin-right: 50px;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        letter-spacing: 0px;
        min-width: 150px;
        color: #606060;
        cursor: pointer;
        @media screen and (max-width: 970px) {
            margin-right: 4%;
            margin-bottom: 5px;
            padding: 3px;
            min-width: unset;
            font-size: 15px;
        }
    }
    .catetory-item.active {
        color: black;
        border-color: black;
    }
    .catetory-item:hover {
        color: black;
        border-color: black;
    }
}

.content {
    @media screen and (max-width: 970px) {
        margin-bottom: 0px;
    }
    margin-bottom: 100px;
    min-height: 100px;
}

.pagenation {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 133px;
    .prev {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/zuo@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .next {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/you@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .prev.no-prev,
    .next.no-next {
        opacity: 0.3;
        cursor: not-allowed;
    }
}
</style>
