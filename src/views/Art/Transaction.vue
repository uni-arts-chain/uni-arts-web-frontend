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
                        bought it for {{ v.price | priceFormat }} UART,
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
    props: {
        transactionList: {
            type: Array,
            default: () => [],
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
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
    .title {
        margin-bottom: 70px;
    }
    .transaction-body {
        display: flex;
        justify-content: space-between;
        .bid-title {
            font-size: 22px;
            font-weight: 600;
            text-align: left;
            margin-bottom: 39px;
            color: #020202;
        }
        .ul {
            li {
                font-size: 18px;
                font-weight: 400;
                text-align: left;
                margin-bottom: 25px;
                color: #020202;
                display: flex;
            }
        }
    }
}
</style>
