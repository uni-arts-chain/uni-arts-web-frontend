/** * Created by Lay Hunt on 2021-01-29 17:13:31. */
<template>
    <div class="following container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/account' }"
                >Profile</el-breadcrumb-item
            >
            <el-breadcrumb-item>Following</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">Following</div>
        <div class="list">
            <div class="profile" v-for="(member, i) in list" :key="i">
                <div class="avatar">
                    <router-link
                        :to="`/artist-detail/${member.id}`"
                        class="avatar-img"
                    >
                        <AdaptiveImage
                            :url="
                                member.avatar.url ? member.avatar.url : yin_2x
                            "
                        />
                    </router-link>
                    <div class="info">
                        <span class="name">{{
                            member.display_name || "Anonymous"
                        }}</span>
                        <RowText
                            class="desc"
                            :textLength="70"
                            :text="member.desc || member.address"
                        />
                    </div>
                </div>
                <div class="works">
                    <i class="zp"></i>
                    <span>{{ art_count }} works</span>
                </div>
            </div>
        </div>
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
</template>
<script>
export default {
    name: "following",
    data() {
        return {
            list: [],
            page: 1,
            isLoading: false,
            per_page: 18,
            total_pages: 0,
            total_count: 0,
        };
    },
    mounted() {
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
                .userGetUserFollowing({
                    page: this.page,
                    per_page: this.per_page,
                })
                .then((res) => {
                    this.isLoading = false;
                    this.list = res.list;
                    this.total_count = res.total_count;
                    this.total_pages = Math.ceil(
                        res.total_count / this.per_page
                    );
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
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
.following {
    padding: 40px;
    padding-top: 70px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: left;
    > .title {
        font-family: "Broadway";
        font-size: 38px;
        font-weight: 400;
        text-align: left;
        color: #020202;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 73px;
        margin-top: 40px;
    }
}

.profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 97px;
    .avatar-img {
        width: 95px;
        height: 95px;
        overflow: hidden;
        border: 4px solid #020202;
        border-radius: 50%;
        cursor: pointer;
    }
    .avatar-img.empty {
        border-color: transparent;
    }
}
.avatar {
    display: flex;
    align-items: center;
}
.info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 32px;
    .name {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 0px;
        margin-bottom: 10px;
        text-align: left;
    }
    .desc {
        font-size: 16px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 1px;
        width: 800px;
        line-height: 20px;
    }
}
.works {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    text-align: left;
    letter-spacing: 0px;
    .zp {
        margin-right: 12px;
        display: block;
        width: 27px;
        height: 25px;
        background: url("~@/assets/images/zuopin@2x.png") no-repeat;
        background-size: 100% auto;
    }
}
</style>
