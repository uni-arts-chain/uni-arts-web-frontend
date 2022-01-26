/** * Created by Lay Hunt on 2021-04-15 19:36:40. */
<template>
    <div class="transaction-info" v-if="transactionList.length > 0">
        <div class="title">Transaction records</div>
        <div class="transaction-body">
            <div class="recent-bid">
                <div class="bid-title">Recent bid records</div>
                <div class="ul">
                    <li v-for="(v, i) in transactionList" :key="i">
                        <span
                            style="
                                display: inline-block;
                                width: 270px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            "
                            >{{ v.buyer }}</span
                        >
                        bought it for {{ v.price | priceFormat }}
                        {{ currencyCode.toUpperCase() }},
                        {{ v.sign_timestamp | dateFormat }}
                    </li>
                </div>
            </div>
            <div class="recent-price">
                <div class="bid-title">
                    Price trend of recent five transactions
                </div>
                <div class="chart">
                    <Chart :list="transactionList"></Chart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Chart from "./Chart";

export default {
    name: "transaction",
    components: {
        Chart,
    },
    computed: {
        transactionList() {
            return this.$store.state.art.transactionList;
        },
        currencyCode() {
            return this.$store.getters["art/currencyCode"];
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.transaction-info {
    margin-bottom: 180px;
    @media screen and (max-width: 970px) {
        width: 100%;
        margin-bottom: 30px;
    }
    > .title {
        @media screen and (max-width: 970px) {
            margin-bottom: 30px;
            font-size: 24px;
            margin-left: 5%;
        }
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
    .title {
        @media screen and (max-width: 970px) {
            margin-bottom: 10px;
        }
        margin-bottom: 70px;
    }
    .transaction-body {
        width: 90%;
        margin: 0 5%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        .bid-title {
            @media screen and (max-width: 970px) {
                font-size: 16px;
                margin-bottom: 8px;
            }
            font-size: 22px;
            font-weight: 600;
            text-align: left;
            margin-bottom: 39px;
            color: #020202;
        }
        .ul {
            li {
                @media screen and (max-width: 970px) {
                    font-size: 15px;
                    flex-direction: column;
                }
                font-size: 18px;
                font-weight: 400;
                text-align: left;
                margin-bottom: 25px;
                color: #020202;
                display: flex;
                span {
                    @media screen and (max-width: 970px) {
                        width: 100% !important;
                    }
                }
            }
        }
    }
}
</style>
