/** * Created by Lay Hunt on 2020-12-14 14:41:18. */
<template>
    <div class="own">
        <Order type="all" :list="list"></Order>
    </div>
</template>
<script>
import Order from "@/views/Account/Order";
export default {
    name: "own",
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
                    aasm_state: "paid",
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
