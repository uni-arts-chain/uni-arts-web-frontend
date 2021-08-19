/** * Created by Lay Hunt on 2020-12-14 14:12:54. */
<template>
    <div class="purchase container">
        <div class="pc">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/account' }"
                    >Profile
                </el-breadcrumb-item>
                <el-breadcrumb-item>Purchase Order</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="title">Purchase Order</div>
        <Order v-loading="isLoading" :list="list" type="bought"></Order>
        <div v-if="hasPrev || hasNext" class="pagenation">
            <div
                :class="{ 'no-prev': !hasPrev }"
                class="prev"
                @click="prev"
            ></div>
            <div
                :class="{ 'no-next': !hasNext }"
                class="next"
                @click="next"
            ></div>
        </div>
    </div>
</template>
<script>
import Order from "./Order";

export default {
    name: "purchase",
    components: {
        Order,
    },
    data() {
        return {
            list: [],
            page: 1,
            isLoading: false,
            per_page: 18,
            total_pages: 0,
            total_count: 0,
        };
    },
    mounted() {
        this.requestData();
    },
    computed: {
        hasPrev() {
            return this.page > 1;
        },
        hasNext() {
            return this.page < this.total_pages;
        },
    },
    methods: {
        requestData() {
            this.isLoading = true;
            this.$http
                .userGetBoughtList({
                    page: this.page,
                    per_page: this.per_page,
                })
                .then((res) => {
                    this.isLoading = false;
                    this.list = res.list;
                    this.total_count = res.total_count;
                    this.total_pages = Math.ceil(
                        res.total_count / this.per_page
                    );
                })
                .catch((err) => {
                    console.log(err);
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
    },
};
</script>
<style lang="scss" scoped>
.purchase {
    margin-top: 20px;
    > .title {
        @media screen and (max-width: 970px) {
            font-size: 24px;
            margin-bottom: 0;
            margin-top: 10px;
        }
        font-family: "Broadway";
        font-size: 38px;
        font-weight: 400;
        text-align: center;
        color: #020202;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 73px;
        margin-top: 40px;
    }
}
</style>
