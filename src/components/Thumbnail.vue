/** * Created by Lay Hunt on 2020-11-19 11:37:45. */
<template>
    <div class="thumbnail">
        <div class="item">
            <div class="img-container">
                <img :src="list[0]" />
            </div>
            <h5 class="title">Kevin Barrowman</h5>
            <div class="desc">Passionate Latin</div>
            <div class="address-label">
                Certificate Address:
                <span class="address"
                    >0xsbd354sdf44sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf</span
                >
            </div>
            <div class="price">950 UART</div>
        </div>
        <div class="item">
            <div class="img-container">
                <img :src="list[1]" />
            </div>
            <h5 class="title">Mariah Bareilles</h5>
            <div class="desc">Passionate Latin</div>
            <div class="address-label">
                Certificate Address:
                <span class="address"
                    >0xsbd354sdf44sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf</span
                >
            </div>
            <div class="price">950 UART</div>
        </div>
        <div class="item">
            <div class="img-container">
                <img :src="list[2]" />
            </div>
            <h5 class="title">Tom Cage</h5>
            <div class="desc">Passionate Latin</div>
            <div class="address-label">
                Certificate Address:
                <span class="address"
                    >0xsbd354sdf44sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf4sdf</span
                >
            </div>
            <div class="price">950 UART</div>
        </div>
    </div>
</template>
<script>
export default {
    name: "thumbnail",
    props: {
        list: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss" scoped>
.thumbnail {
    overflow: hidden;
}
.item {
    float: left;
    width: 30%;
    margin-right: 5%;
}
.item:last-child {
    margin-right: 0;
}

.img-container {
    width: 100%;
    height: 270px;
    overflow: hidden;
    border-radius: 4px;
    margin-bottom: 35px;
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
    font-size: 22px;
    font-weight: 600;
    text-align: left;
    letter-spacing: 0px;
}
.desc,
.address-label {
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    line-height: 35px;
    letter-spacing: 0px;
}

.address-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.price {
    font-size: 22px;
    font-weight: 600;
    text-align: left;
    line-height: 30px;
    letter-spacing: 0px;
    margin-top: 8px;
}
</style>
