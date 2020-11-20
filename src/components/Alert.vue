/** * Created by Lay Hunt on 2020-11-20 15:50:20. */
<template>
    <div class="alert" v-if="isShow">
        <div class="alert-content" v-html="message || defaultMessage"></div>
    </div>
</template>
<script>
import UAParser from "ua-parser-js";
export default {
    name: "alert",
    props: {
        message: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            browser: new UAParser(window.userAgent),
            isShow: false,
            defaultMessage:
                "For a better experience, please use <span>Chrome</span> or <span>Firefox</span>",
        };
    },
    created() {
        if (
            this.browser.getBrowser().name !== "Chrome" &&
            this.browser.getBrowser().name !== "Firefox"
        ) {
            this.isShow = true;
        }
    },
};
</script>
<style lang="scss" scoped>
.alert-content {
    width: 100%;
    padding: 12px 16px;
    margin: 0;
    box-sizing: border-box;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s;
    border-bottom: 1px solid #ddd;
    ::v-deep > span {
        color: #c61e1e;
        padding: 0 6px;
    }
}
</style>
