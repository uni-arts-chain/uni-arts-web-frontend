/** * Created by Lay Hunt on 2020-12-14 14:12:54. */
<template>
    <div class="purchase">
        <Order type="sala" :list="list"></Order>
    </div>
</template>
<script>
import Order from "./Order";
export default {
    name: "purchase",
    components: {
        Order,
    },
    data() {
        return {
            list: [],
        };
    },
    mounted() {
        this.requestData();
    },
    methods: {
        requestData() {
            this.$http
                .userOwnArts({
                    aasm_state: "bidding",
                })
                .then((res) => {
                    this.list = res;
                })
                .catch((err) => {
                    console.log(err);
                    this.$notify({
                        title: "Error",
                        message: err.head ? err.head.msg : err,
                        type: "error",
                    });
                });
        },
    },
};
</script>
<style lang="scss" scoped></style>
