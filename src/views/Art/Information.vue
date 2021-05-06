/** * Created by Lay Hunt on 2021-04-15 19:28:40. */
<template>
    <div class="infomation">
        <div class="title">Art information</div>
        <div class="information-body">
            <div class="img-container">
                <div class="img-content">
                    <AdaptiveView
                        @imgLoadedSize="imgLoaded"
                        :nft="art"
                        :isPreview="true"
                    />
                </div>
            </div>
            <div class="art-information">
                <div class="title">{{ art.name }}</div>
                <div class="size">
                    Size：{{ art.size_width }} x {{ art.size_length }}cm
                </div>
                <div class="quality">
                    Material quality：{{ getMaterial(art.material_id).title }}
                </div>
                <div class="type">Type of work：Digital oil painting</div>
                <div class="date">
                    Creation time：{{ art.created_at | dateFormat }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AdaptiveView from "@/components/AdaptiveView";

export default {
    name: "infromation",
    components: {
        AdaptiveView,
    },
    computed: {
        art() {
            return this.$store.state.art.art;
        },
    },
    data() {
        return {
            width: "",
            height: "",
        };
    },
    methods: {
        getMaterial(id) {
            let item = this.$store.state.art.materials.find((v) => v.id == id);
            return item ? item : {};
        },
        imgLoaded(info) {
            this.width = info.width;
            this.height = info.height;
        },
    },
};
</script>
<style lang="scss" scoped>
.infomation {
    margin-bottom: 180px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
    .information-body {
        display: flex;
        justify-content: center;
        .img-container {
            margin-right: 100px;
            width: 320px;
            height: 320px;
            background: url("~@/assets/images/xiangkuang@2x.png") no-repeat;
            background-size: 100% auto;
            padding-top: 40px;
            padding-left: 40px;
            padding-right: 70px;
            padding-bottom: 70px;
            .img-content {
                position: relative;
                overflow: hidden;
                height: 210px;
                width: 208px;
            }
            .adaptive-view ::v-deep .adaptive-image img {
                border-left: 2px solid #aa8740;
                border-top: 2px solid #dbdbdb;
                border-right: 2px solid #ffffff;
                border-bottom: 2px solid #e6e6e6;
            }
            img {
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
            }
        }

        .art-information {
            .title {
                font-size: 30px;
                font-weight: 600;
                text-align: left;
                color: #020202;
                letter-spacing: 0px;
                margin-bottom: 44px;
            }
            .quality,
            .size,
            .type,
            .date {
                font-size: 22px;
                font-weight: 400;
                text-align: left;
                letter-spacing: 0px;
                margin-bottom: 24px;
            }
        }
    }
}
</style>
