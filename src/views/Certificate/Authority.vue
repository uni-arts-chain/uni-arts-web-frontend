/** * Created by Lay Hunt on 2021-02-25 10:37:48. */
<template>
    <div class="authority container">
        <div class="title">Authority</div>
        <Organization :list="organizationList" />
    </div>
</template>
<script>
import { hexToString, isJsonObject } from "@polkadot/util";
import Organization from "./Organization";
export default {
    name: "authority",
    components: {
        Organization,
    },
    data() {
        return {
            organizationList: [],
        };
    },
    created() {
        this.requestOrganizationInfo();
    },
    methods: {
        async requestOrganizationInfo() {
            await this.$rpc.api.isReady;
            let objList = await this.$rpc.api.query.names.names.entries();
            objList.forEach((v) => {
                v[1] = v[1].toJSON();
                let expiration = v[1].expiration;
                let owner = v[1].owner;
                let value = hexToString(v[1].value);
                value = isJsonObject(value) ? JSON.parse(value) : {};
                let hash = v[0].args[0].toString();
                this.organizationList.push({
                    name: hexToString(hash),
                    hash: hash,
                    expiration,
                    owner,
                    value,
                });
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.title {
    @media screen and (max-width: 970px) {
        font-size: 24px;
        margin-bottom: 30px;
        margin-top: 10px;
    }
    margin-top: 60px;
    margin-bottom: 102px;
    font-size: 39px;
    font-family: Broadway;
    font-weight: 400;
    text-align: center;
    color: #020202;
    letter-spacing: 2px;
}
</style>
