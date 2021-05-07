/** * Created by Lay Hunt on 2021-04-22 17:44:27. */
<template>
    <div class="history">
        <div class="container" v-loading="isLoading">
            <div class="title">Open Record</div>
            <Order :list="list" />
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
import Order from "./Order";
export default {
    name: "history",
    components: {
        Order,
    },
    data() {
        return {
            list: [],
            isLoading: false,
            page: 1,
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
                .userGetBoxDraws({
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
.history {
    margin-bottom: 180px;
    padding-top: 55px;
    .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        text-transform: uppercase;
        letter-spacing: 0px;
        margin-bottom: 50px;
    }
}
.pagenation {
    margin-top: 100px;
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
