/** * Created by Lay Hunt on 2021-01-13 19:22:58. */
<template>
    <div class="signature-info" v-if="signatureList.length > 0">
        <div class="title">SIGNING RECORDS</div>
        <div class="signature-body">
            <div class="recent-signature">
                <div class="ul">
                    <li v-for="(v, i) in signatureList" :key="i">
                        <div class="header">
                            <div class="org-img"></div>
                            <div class="org-name">
                                {{ hexTostring(v.names) }}
                            </div>
                            <div class="timestamp">
                                {{ v.sign_timestamp | dateFormat }}
                            </div>
                        </div>
                        <div class="address">{{ v.names }}</div>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ComputeBlockTimestamp } from "@/utils";
import { hexToString } from "@polkadot/util";
export default {
    name: "signature",
    model: {
        prop: "value",
        event: "change",
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
        value: {
            type: Array,
            default: () => [],
        },
        status: {
            type: String,
            default: "prepare",
        },
    },
    data() {
        return {
            signatureList: [],
        };
    },
    watch: {
        collection_id() {
            this.getSignatureData();
        },
        signatureList() {
            this.$emit("change", this.signatureList);
        },
        status() {
            this.getSignatureData();
        },
    },
    created() {
        this.getSignatureData();
    },
    methods: {
        async getSignatureData() {
            if (
                !this.collection_id ||
                !this.item_id ||
                this.status == "prepare"
            )
                return;
            await this.$rpc.api.isReady;
            let obj = await this.$rpc.api.query.nft.signatureList(
                this.collection_id,
                this.item_id
            );
            let jsonData = obj.toJSON();
            jsonData.map((v) => {
                v.sign_timestamp = ComputeBlockTimestamp(
                    v.sign_time,
                    this.$store.state.global.chain.timestamp,
                    this.$store.state.global.chain.blockHeight
                );
                return v;
            });
            this.signatureList = jsonData.reverse();
        },
        hexTostring(string) {
            return hexToString(string);
        },
    },
};
</script>
<style lang="scss" scoped>
.signature-info {
    margin-bottom: 180px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
}

.signature-info .title {
    margin-bottom: 70px;
}
.signature-info .recent-signature {
    .ul {
        li {
            border-bottom: 1px solid #272727;
            padding: 31px 0;
        }
        .header {
            display: flex;
            align-items: flex-end;
            margin-bottom: 22px;
            .org-img {
                height: 30px;
                width: 39px;
                background: url(~@/assets/images/jianzhu@2x.png) no-repeat;
                background-size: 100% 100%;
                margin-right: 18px;
            }
            .org-name {
                width: calc(100% - 200px);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 22px;
                font-weight: 600;
                text-align: left;
                color: #020202;
                letter-spacing: 0px;
            }
            .timestamp {
                width: 200px;
                line-height: 30px;
            }
        }
        .address {
            font-size: 20px;
            font-weight: 400;
            text-align: left;
            color: #020202;
            letter-spacing: 0px;
        }
    }
}
</style>
