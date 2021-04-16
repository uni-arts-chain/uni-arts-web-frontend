/** * Created by Lay Hunt on 2021-04-15 20:02:38. */
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
import { hexToString } from "@polkadot/util";

export default {
    name: "SignatureList",
    computed: {
        signatureList() {
            return this.$store.state.art.signatureList;
        },
    },
    data() {
        return {};
    },
    methods: {
        hexTostring(hex) {
            return hexToString(hex);
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
