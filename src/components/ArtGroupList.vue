/** * Created by Lay Hunt on 2020-11-19 15:01:35. */
<template>
    <div class="artgroupList">
        <div class="card" v-for="(v, k) in list" :key="k">
            <img class="avatar" @click="detail" :src="v" />
            <div class="name">Noah Schnapp</div>
            <p>Shanghai people graduated from Stanford University</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "artgroupList",
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {};
    },
    methods: {
        detail() {
            this.$router.push("/artist-detail/1");
        },
    },
};
</script>
<style lang="scss" scoped>
.artgroupList {
    display: flex;
    justify-content: space-between;
}
.card {
    width: 30%;
    height: 364px;
    box-shadow: 0px 0px 30px 0px #ddd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .avatar {
        width: 120px;
        height: 120px;
        border: 4px solid black;
        border-radius: 50%;
        cursor: pointer;
    }
    .name {
        margin-top: 50px;
        font-size: 22px;
        font-weight: 600;
        text-align: center;
        letter-spacing: 0px;
        text-transform: uppercase;
    }
    > p {
        margin-top: 29px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        letter-spacing: 0px;
        text-transform: uppercase;
        max-width: 225px;
    }
}
</style>
