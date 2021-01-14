/** * Created by Lay Hunt on 2021-01-13 18:29:40. */
<template>
    <div class="transaction" v-if="transactionList.length > 0">
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
import { ComputeBlockTimestamp } from "@/utils";
export default {
    name: "transaction",
    components: {
        Chart,
    },
    props: {
        collection_id: {
            type: Number,
            default: 0,
        },
        item_id: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            transactionList: [],
        };
    },
    created() {
        this.getTransactionData();
    },
    methods: {
        async getTransactionData() {
            await this.$rpc.api.isReady;
            let obj = await this.$rpc.api.query.nft.historySaleOrderList(
                this.collection_id,
                this.item_id
            );
            obj = obj
                .toJSON()
                .sort((a, b) => b.buy_time - a.buy_time)
                .map((v) => {
                    v.sign_timestamp = ComputeBlockTimestamp(
                        v.buy_time,
                        this.$store.state.global.chain.timestamp,
                        this.$store.state.global.chain.blockHeight
                    );
                    return v;
                });
            this.transactionList = obj;
        },
    },
};
</script>
<style lang="scss" scoped>
.transaction {
    margin-bottom: 100px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
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
