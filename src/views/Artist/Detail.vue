/** * Created by Lay Hunt on 2020-11-18 09:55:47. */
<template>
    <div class="detail">
        <div class="container">
            <div class="author">
                <div class="avatar-container">
                    <div class="avatar">
                        <AdaptiveImage
                            :url="getImg(author)"
                            width="236px"
                            height="236px"
                        ></AdaptiveImage>
                    </div>
                </div>
                <div class="info">
                    <h2>
                        {{
                            author.display_name
                                ? author.display_name
                                : author.address || "Anonymous"
                        }}
                    </h2>
                    <RowText
                        class="desc"
                        :textLength="100"
                        :text="author.desc"
                    />
                </div>
            </div>
            <div class="content">
                <div class="title">Personal works</div>
                <Thumbnail
                    style="padding-left: 0"
                    :list="list"
                    :isGroup="true"
                    v-loading="isLoading"
                ></Thumbnail>
                <div class="pagenation" v-if="hasPrev || hasNext">
                    <div
                        class="prev"
                        @click="prev"
                        :class="{ 'no-prev': !hasPrev }"
                    ></div>
                    <div
                        class="next"
                        @click="next"
                        :class="{ 'no-next': !hasNext }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Thumbnail from "@/components/Thumbnail";
import AdaptiveImage from "@/components/AdaptiveImage";
import RowText from "@/components/RowText";
import avatar from "@/assets/images/yin@2x.png";
export default {
    name: "detail",
    components: {
        Thumbnail,
        AdaptiveImage,
        RowText,
    },
    data() {
        return {
            optionActive: "1",
            menuActive: "0",
            authorId: this.$route.params.id,
            list: [],
            isLoading: false,
            author: {},
            avatar,
        };
    },
    created() {
        this.requestData();
    },
    computed: {
        hasPrev() {
            return this.page > 1;
        },
        hasNext() {
            return this.page < this.total_pages;
        },
    },
    methods: {
        requestData() {
            this.isLoading = true;
            this.$http
                .globalGetAuthorArts({}, { id: this.authorId })
                .then((res) => {
                    this.isLoading = false;
                    this.list = res.total_count ? res.list : res;
                    this.author = this.list[0] ? this.list[0].author : {};
                })
                .catch((err) => {
                    this.isLoading = false;
                    this.$notify({
                        title: "Error",
                        message: err.head ? err.head.msg : err,
                        type: "error",
                    });
                });
        },
        getImg(obj) {
            return obj.avatar && obj.avatar.url ? obj.avatar.url : avatar;
        },
        next() {
            if (this.hasNext) {
                this.page++;
                this.requestData();
            }
        },
        prev() {
            if (this.hasPrev) {
                this.page--;
                this.requestData();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.detail {
    padding-top: 80px;
    padding-bottom: 80px;
}
.author {
    height: 469px;
    width: 100%;
    background: url(~@/assets/images/ren-bg2@2x.png) no-repeat;
    background-size: auto 100%;
    margin-bottom: 120px;
    position: relative;
    .avatar-container {
        transform: translateX(185px) translateY(105px);
        width: 262px;
        height: 262px;
        padding: 12px;
        border: 1px solid white;
        border-radius: 50%;
    }
    .avatar {
        width: 236px;
        height: 236px;
        border-radius: 50%;
        overflow: hidden;
    }
    .info {
        position: absolute;
        color: white;
        text-align: left;
        left: 550px;
        top: 150px;
        > h2 {
            font-size: 40px;
            font-family: "Broadway";
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            letter-spacing: 0px;
            margin-bottom: 30px;
            width: 600px;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .desc {
            font-size: 24px;
            font-weight: 400;
            text-align: left;
            max-width: 400px;
            color: #ffffff;
            letter-spacing: 1px;
        }
    }
}
.content {
    min-height: 400px;
    .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        line-height: 40px;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 103px;
    }
}
.pagenation {
    margin-top: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 133px;
    .prev {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/zuo@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .next {
        width: 110px;
        height: 70px;
        background: url("~@/assets/images/you@2x.png") no-repeat;
        background-size: 100% auto;
        margin: 0 91px;
        cursor: pointer;
    }
    .prev.no-prev,
    .next.no-next {
        opacity: 0.3;
        cursor: not-allowed;
    }
}
</style>
