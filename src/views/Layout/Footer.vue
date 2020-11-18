/** * Created by Lay Hunt on 2020-11-17 18:22:12. */
<template>
    <footer>
        <div class="container">
            <div class="bottom-logo">
                <span class="logo">Uniarts</span>
                <span class="desc">@2019-2020 uniarts.me</span>
            </div>
            <div class="bottom-nav">
                <ul>
                    <span class="title">Abstract</span>
                    <li><router-link to="/">Questions</router-link></li>
                    <li><router-link to="/">Contact Us</router-link></li>
                </ul>
                <ul>
                    <span class="title">Technology</span>
                    <li><router-link to="/">White Pape</router-link></li>
                    <li><router-link to="/">Telemetry</router-link></li>
                </ul>
                <ul>
                    <span class="title">Products</span>
                    <li><router-link to="/">Uniarts Chain</router-link></li>
                    <li><router-link to="/">QTS</router-link></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "footerbar",
};
</script>

<style lang="scss" scoped>
footer {
    background: linear-gradient(#380302 0%, #020202 100%);
}
.container {
    min-height: 283px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
}
.bottom-logo {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .logo {
        font-family: "Broadway";
        font-size: 33px;
        font-weight: 400;
        margin-bottom: 30px;
    }
    .desc {
        font-size: 17px;
        line-height: 30px;
    }
}
.bottom-nav {
    width: 66%;
    display: flex;
    align-items: center;
    ul {
        overflow: hidden;
        width: 33%;
        display: block;
        text-align: left;
        .title {
            display: inline-block;
            font-size: 18px;
            font-weight: 600;
            line-height: 30px;
            padding-bottom: 23px;
            border-bottom: 1px solid #cfb9b9;
            min-width: 137px;
        }
        li {
            display: block;
            margin-top: 23px;
            font-size: 14px;
        }
    }
}
</style>
