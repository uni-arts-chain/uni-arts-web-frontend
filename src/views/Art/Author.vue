/** * Created by Lay Hunt on 2021-04-15 19:20:53. */
<template>
    <div class="author-info">
        <div class="title">About the author</div>
        <div class="author">
            <div class="author-container">
                <AdaptiveImage
                    :url="
                        authorInfo.avatar && authorInfo.avatar.url
                            ? authorInfo.avatar.url
                            : yin_2x
                    "
                ></AdaptiveImage>
                <img src="@/assets/images/yin@2x.png" />
            </div>
            <div class="name">
                {{
                    authorInfo.display_name
                        ? authorInfo.display_name
                        : "Anonymous"
                }}
            </div>
        </div>
        <div class="author-intro-info">
            <RowText
                class="author-intro"
                :textLength="60"
                :text="authorInfo.desc"
            />
            <router-link
                class="go-detail"
                :to="`/artist-detail/${authorInfo.id}`"
                >Go to the creator's home page<i class="arrow"></i
            ></router-link>
        </div>
    </div>
</template>
<script>
import RowText from "@/components/RowText";
import AdaptiveImage from "@/components/AdaptiveImage";
import yin_2x from "@/assets/images/yin@2x.png";

export default {
    name: "author",
    components: {
        RowText,
        AdaptiveImage,
    },
    props: {
        authorInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            yin_2x,
        };
    },
};
</script>
<style lang="scss" scoped>
.author-info {
    overflow: hidden;
    margin-bottom: 180px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
    .author {
        float: left;
        width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #020202;
        .author-container {
            width: 103px;
            height: 103px;
            overflow: hidden;
            position: relative;
            border-radius: 50%;
            border: 3px solid #020202;
            margin-bottom: 26px;
        }
        .author-container.empty {
            border-color: transparent;
        }
        .name {
            font-size: 26px;
            max-width: 300px;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
            letter-spacing: 0px;
        }
    }
    .author-intro-info {
        float: left;
        width: calc(100% - 501px);
        padding-left: 103px;
        height: 166px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .author-intro {
            font-size: 24px;
            font-weight: 400;
            text-align: left;
            line-height: 36px;
            letter-spacing: 1px;
            margin-bottom: 30px;
            max-width: 480px;
            text-transform: uppercase;
        }
        .go-detail {
            font-size: 24px;
            font-weight: 600;
            text-align: left;
            color: #5d96ff;
            letter-spacing: 0px;
            text-transform: uppercase;
            min-width: 480px;
            i.arrow {
                margin-left: 15px;
                width: 24px;
                height: 17px;
                display: inline-block;
                background: url("~@/assets/images/jiantou@2x.png") no-repeat;
                background-size: 100% auto;
            }
        }
    }
}
</style>
