/** * Created by Lay Hunt on 2020-11-20 15:50:20. */
<template>
    <div class="uni__alert">
        <div
            v-if="noteType === 'NeedBrowser'"
            class="alert-content"
            v-html="defaultMessage"
        ></div>
        <NeedPlugin
            v-else-if="noteType === 'NeedPlugin'"
            @author="author"
        ></NeedPlugin>
        <div v-else class="alert-content" v-html="message"></div>
    </div>
</template>
<script>
import NeedPlugin from "@/components/NeedPlugin";

export default {
    name: "alert",
    components: { NeedPlugin },
    props: {
        message: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            noteType: "",
            author: () => {},
            defaultMessage:
                "For a better experience, please use <span>Chrome</span> or <span>Firefox</span>",
        };
    },
    created() {
        if (
            this.$browser.name !== "Chrome" &&
            this.$browser.name !== "Firefox"
        ) {
            this.noteType = "NeedBrowser";
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
