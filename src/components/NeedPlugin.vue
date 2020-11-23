/** * Created by Lay Hunt on 2020-11-23 11:23:47. */
<template>
    <div class="needplugin">
        <div>
            <!-- <a class="polkadot-download" target="_blank" :href="pluginUrl"></a> -->
            Please authorize the application or install
            <a target="_blank" :href="pluginUrl">polkadot{.js} extension</a>
        </div>
    </div>
</template>
<script>
export default {
    name: "needplugin",
    data() {
        return {};
    },
    computed: {
        pluginUrl() {
            let url = "";
            switch (this.$browser.name) {
                case "Chrome":
                    url =
                        "https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd";
                    break;
                case "Firefox":
                    url =
                        "https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/";
                    break;
            }
            return url;
        },
    },
};
</script>
<style lang="scss" scoped>
.needplugin {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
    /* .polkadot-download {
        display: block;
        background: url("~@/assets/images/polkadot-js-logo.jpg") no-repeat;
        background-size: 100% auto;
        width: 100px;
        height: 53px;
        margin-bottom: 20px;
    } */
    > div > a,
    .text {
        cursor: pointer;
        font-size: 18px;
        color: #fa8903;
    }
}
</style>
