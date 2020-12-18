/** * Created by Lay Hunt on 2020-11-18 09:55:47. */
<template>
    <div class="detail">
        <div class="container">
            <div class="header">
                <div class="profile">
                    <img src="@/assets/images/yin@2x.png" alt="" />
                    <div class="profile-info">
                        <span class="name">{{
                            author.display_name
                                ? author.display_name
                                : author.address
                        }}</span>
                        <div class="score">
                            Score:
                            <span class="score-number">0</span>
                            <span class="help">?</span>
                        </div>
                    </div>
                </div>
                <div class="option">
                    <div
                        class="option-title"
                        @click="optionActive = '1'"
                        :class="{ active: optionActive == '1' }"
                    >
                        Work Collection
                    </div>
                </div>
            </div>
            <div class="body">
                <div class="content">
                    <OwnArts style="padding-left: 0" :list="list"></OwnArts>
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
    </div>
</template>

<script>
import OwnArts from "@/views/Account/Order";
export default {
    name: "detail",
    components: {
        OwnArts,
    },
    data() {
        return {
            optionActive: "1",
            menuActive: "0",
            authorId: this.$route.params.id,
            list: [],
            author: {},
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
            this.$http
                .globalGetAuthorArts({}, { id: this.authorId })
                .then((res) => {
                    this.list = res.list;
                    this.author = res[0] ? res[0].author : {};
                })
                .catch((err) => {
                    this.$notify({
                        title: "Error",
                        message: err.head ? err.head.msg : err,
                        type: "error",
                    });
                });
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
.header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .profile {
        display: flex;
        align-items: center;
        margin-right: 200px;
        > img {
            overflow: hidden;
            border-radius: 50%;
            border: 4px solid #020202;
            width: 109px;
            height: 109px;
            margin-right: 40px;
            margin-left: 30px;
        }
        .profile-info {
            display: flex;
            flex-direction: column;
            .name {
                font-size: 22px;
                font-weight: 600;
                letter-spacing: 0px;
                margin-bottom: 20px;
                max-width: 300px;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .score {
                font-size: 22px;
                font-weight: 400;
                letter-spacing: 0px;
                display: flex;
                align-items: center;
            }
            .score-number {
                margin-left: 15px;
                font-weight: 600;
            }
            .help {
                display: block;
                margin-left: 15px;
                width: 19px;
                height: 19px;
                font-size: 16px;
                line-height: 18px;
                color: #1a7fc6;
                border: 1px solid #1a7fc6;
                border-radius: 50%;
                cursor: pointer;
            }
        }
    }
    .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .option-title {
            font-size: 20px;
            font-weight: 400;
            letter-spacing: 0px;
            color: #999999;
            margin: 0 45px;
            cursor: pointer;
            position: relative;
        }
        .option-title.active {
            color: #020202;
        }
        .option-title.active::after {
            content: "";
            position: absolute;
            height: 4px;
            background: #020202;
            width: 83px;
            bottom: -13px;
            left: 50%;
            transform: translateX(-50%);
        }
    }
}

.body {
    display: flex;
    justify-content: center;
    .content {
        /* width: calc(100% - 170px); */
        width: 90%;
        .homepage {
            padding-top: 78px;
            font-size: 18px;
            font-weight: 400;
            letter-spacing: 0px;
            .update {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url("~@/assets/images/xie@2x.png") no-repeat;
                background-size: 20px;
                cursor: pointer;
            }
            .more-button {
                display: block;
                padding: 17px 80px;
                margin: 0 auto;
                color: black;
                font-size: 22px;
                font-weight: 600;
                background: transparent;
                border: 3px solid black;
                text-transform: uppercase;
                margin-top: 93px;
                cursor: pointer;
            }
        }
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
