/** * Created by Lay Hunt on 2020-12-03 18:20:48. */
<template>
    <div class="own-arts">
        <div class="art-item" v-for="(v, i) in list" :key="i">
            <router-link :to="`/art/${v.id}`" class="img-container">
                <img :src="v.img_main_file1.url" />
            </router-link>
            <h5 class="title">{{ v.name }}</h5>
            <div class="desc">{{ v.details }}</div>
            <div class="address-label">
                {{ v.aasm_state }}
            </div>
            <div class="price">{{ v.price }} UART</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "own-arts",
    data() {
        return {
            list: [],
        };
    },
    created() {
        this.requestData();
    },
    methods: {
        requestData() {
            this.$http
                .userOwnArts({})
                .then((res) => {
                    this.list = res;
                })
                .catch((error) => {
                    this.$notify({
                        title: "Error",
                        message: error.head && error.head.msg,
                        type: "error",
                    });
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.own-arts {
    min-height: 100%;
    padding-left: 10%;
    padding-top: 30px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.art-item {
    float: left;
    width: 30%;
    margin-right: 5%;
}
.art-item:nth-child(3n) {
    margin-right: 0;
}

.img-container {
    display: block;
    width: 100%;
    height: 230px;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 20px;
    position: relative;
    img {
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateY(-50%) translateX(-50%);
    }
}

.title {
    text-transform: uppercase;
    font-size: 19px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0px;
}
.desc,
.address-label {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    line-height: 27px;
    letter-spacing: 0px;
}

.address-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.price {
    font-size: 17px;
    font-weight: 600;
    text-align: left;
    line-height: 30px;
    letter-spacing: 0px;
    margin-top: 0px;
}
</style>
