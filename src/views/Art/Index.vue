/** * Created by Lay Hunt on 2020-11-17 18:30:48. */
<template>
    <div class="art">
        <div class="container">
            <div class="art-info">
                <div class="img-container">
                    <img src="@/assets/images/temp/art-detail1.webp" />
                </div>
                <div class="info">
                    <div class="title">Space travel</div>
                    <div class="price">1500 UART</div>
                    <p class="intro">Digital oil painting，100.0x100.0cm</p>
                    <div class="block-title">BLOCKCHAIN INFOMATION</div>
                    <div class="address">
                        Certificate address :
                        0xsbd354sdf4241d35sdf4241d35sdf4241d35sdf4241d35sdf4241d35
                        <i class="copy"></i>
                        <i class="qr"></i>
                    </div>
                    <div class="signature">Number of signatures : 3</div>
                    <button class="buy" @click="buy">BUY NOW</button>
                </div>
            </div>
            <div class="bid-history">
                <div class="title">Bid History</div>
                <div class="content">
                    <div class="table">
                        <div class="tr">
                            <div class="td username">13****20</div>
                            <div class="td date">2020.08.06 15:32:26</div>
                            <div class="td price">Lead 1500 UART</div>
                            <div class="td address">
                                0x1342423423423423abcd8493ac98ac89832ddba6dc
                            </div>
                        </div>
                        <div class="tr">
                            <div class="td username">13****20</div>
                            <div class="td date">2020.08.06 15:32:26</div>
                            <div class="td price">Lead 1500 UART</div>
                            <div class="td address">
                                0x1342423423423423abcd8493ac98ac89832ddba6dc
                            </div>
                        </div>
                        <div class="tr">
                            <div class="td username">13****20</div>
                            <div class="td date">2020.08.06 15:32:26</div>
                            <div class="td price">Lead 1500 UART</div>
                            <div class="td address">
                                0x1342423423423423abcd8493ac98ac89832ddba6dc
                            </div>
                        </div>
                    </div>
                    <div class="bid-info">
                        <div class="item">
                            <span class="label">Starting Price</span>
                            <span class="value">1000 ART</span>
                        </div>
                        <div class="item">
                            <span class="label">Price Increase Range</span>
                            <span class="value">1000 ART</span>
                        </div>
                        <div class="item">
                            <span class="label">Start Time</span>
                            <span class="value">08.05 12:00</span>
                        </div>
                        <div class="item">
                            <span class="label">End Time</span>
                            <span class="value">08.08 12:00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="author-info">
                <div class="title">About the author</div>
                <div class="author">
                    <div class="author-container">
                        <img src="@/assets/images/temp/avatar1.webp" />
                    </div>
                    <div class="name">Noah Schnapp</div>
                </div>
                <div class="author-intro-info">
                    <div class="author-intro">
                        Shanghai people graduated from Stanford University
                    </div>
                    <router-link class="go-detail" :to="`/art/${1}`"
                        >Go to the creator's home page<i class="arrow"></i
                    ></router-link>
                </div>
            </div>
            <div class="infomation">
                <div class="title">Art information</div>
                <div class="information-body">
                    <div class="img-container">
                        <div class="img-content">
                            <img
                                src="@/assets/images/temp/art-detail1.webp"
                                alt=""
                            />
                        </div>
                    </div>
                    <div class="art-information">
                        <div class="title">Space travel</div>
                        <div class="size">Size：100.0x100.0cm</div>
                        <div class="quality">
                            Material quality：Virtual Digital
                        </div>
                        <div class="type">
                            Type of work：Digital oil painting
                        </div>
                        <div class="date">Creation time：2020.02.20</div>
                    </div>
                </div>
            </div>
            <div class="comments">
                <div class="title">Comments on works</div>
                <div class="comment-content">
                    At all times and in all over the world, no matter what era,
                    there are few representative paintings. However, the eastern
                    and Western cultural traditions are not quite the same.
                    However, their pursuit and appreciation of beauty are the
                    same.Her painting style has decorative elements. The
                    composition of this painting is complete and the colors are
                    bright，She is used to using the cool silver tone. Although
                    noble and elegant, she makes people feel friendly. 。
                </div>
            </div>
            <div class="details">
                <div class="title">Artwork Details</div>
                <div class="comment-content"></div>
            </div>
        </div>

        <Dialog :visible.sync="dialogVisible" :close="handleClose">
            <div class="dialog-content">
                <div class="title">FIRM BID</div>
                <div class="price">
                    Current Price: <span class="number">1500 UART</span>
                </div>
                <div class="desc">
                    You have bid <span>1100 ART</span>, at least you need to
                    increase the price by <span>200 ART</span>.
                </div>
                <div class="input-body">
                    <input type="number" />
                    <span class="code">ART</span>
                </div>
                <div class="note">
                    If the auction is not successful, the bid amount will be
                    returned after the auction
                </div>
                <button @click="submit">BID NOW</button>
            </div>
        </Dialog>
    </div>
</template>
<script>
import Dialog from "@/components/Dialog/Dialog";
export default {
    name: "art",
    components: { Dialog },
    data() {
        return {
            dialogVisible: false,
            art: {},
        };
    },
    created() {
        this.requestData();
    },
    methods: {
        requestData() {
            this.$http
                .globalGetArtById(
                    {},
                    {
                        id: 1,
                    }
                )
                .then((res) => {
                    this.art = res;
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
        handleClose() {
            this.dialogVisible = false;
        },
        buy() {
            this.dialogVisible = true;
        },
        submit() {
            this.dialogVisible = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.art {
    padding-top: 80px;
}

.art-info {
    overflow: hidden;
    .img-container {
        float: left;
        width: 550px;
        height: 550px;
        margin-right: 50px;
        overflow: hidden;
        position: relative;
        img {
            position: absolute;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
        }
    }
}
.info {
    float: left;
    width: 550px;
    margin-left: 50px;
    text-align: left;
    margin-bottom: 171px;
    .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        line-height: 40px;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 35px;
    }

    .price {
        font-size: 24px;
        font-weight: 600;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 17px;
    }

    .intro {
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 85px;
    }

    .block-title {
        font-size: 26px;
        font-weight: 600;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 34px;
    }

    .address {
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 21px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right: 50px;
        position: relative;
        i.copy {
            position: absolute;
            top: 3px;
            right: 33px;
            display: inline-block;
            width: 19px;
            height: 19px;
            background: url("~@/assets/images/fuzhi@2x.png") no-repeat;
            background-size: 100%;
            cursor: pointer;
        }
        i.qr {
            right: 0px;
            top: 3px;
            position: absolute;
            display: inline-block;
            width: 19px;
            height: 19px;
            background: url("~@/assets/images/ma@2x.png") no-repeat;
            background-size: 100%;
            cursor: pointer;
        }
    }

    .signature {
        font-size: 20px;
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 94px;
    }

    .buy {
        cursor: pointer;
        border: 3px solid #020202;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #020202;
        letter-spacing: 0px;
        padding: 17px 40px;
        width: 400px;
        background: transparent;
    }
}
.author-info,
.infomation,
.comments,
.details,
.bid-history {
    margin-bottom: 180px;
    > .title {
        font-size: 48px;
        font-family: "Broadway";
        font-weight: 400;
        text-align: left;
        letter-spacing: 0px;
        margin-bottom: 110px;
    }
}

.author-info {
    overflow: hidden;
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
            img {
                height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateY(-50%) translateX(-50%);
            }
        }
        .name {
            font-size: 26px;
            font-weight: 600;
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
        justify-content: flex-end;
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

.infomation {
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
            .img-content {
                position: relative;
                overflow: hidden;
                height: 210px;
                width: 208px;
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

.comments {
    .comment-content {
        font-size: 23px;
        font-weight: 400;
        text-align: left;
        line-height: 36px;
        letter-spacing: 1px;
    }
}

.details {
    .comment-content {
        min-height: 300px;
    }
}

.bid-history {
    .content {
        .table {
            display: flex;
            flex-direction: column;
            margin-bottom: 80px;
        }
        .tr {
            border-bottom: 1px solid #020202;
            display: flex;
            justify-content: space-between;
            font-size: 18px;
            font-weight: 400;
            text-align: center;
            letter-spacing: 0px;
            padding: 30px 16px;
        }
        .tr:last-child {
            border-bottom: none;
        }
        .address {
            max-width: 240px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        .bid-info {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .item {
                background-color: #eee;
                padding: 16px 0px;
                width: 540px;
                font-size: 18px;
                font-weight: 400;
                text-align: center;
                letter-spacing: 0px;
                margin-bottom: 37px;
                overflow: hidden;
                .label {
                    float: left;
                    display: block;
                    width: 60%;
                    text-align: center;
                }
                .value {
                    float: left;
                    display: block;
                    width: 40%;
                    text-align: left;
                }
            }
        }
    }
}

.dialog-content {
    font-size: 26px;
    text-align: left;
    letter-spacing: 0px;
    text-align: center;
    color: #020202;
    .title {
        font-weight: 600;
        margin-bottom: 30px;
    }
    .price {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 25px;
    }
    .number {
        font-size: 24px;
        color: #c61e1e;
    }
    .desc {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 37px;
    }
    .input-body {
        position: relative;
        margin-bottom: 37px;
        input {
            width: 100%;
            height: 75px;
            font-size: 26px;
            border: 2px solid #020202;
            padding: 14px 34px;
            text-align: center;
        }
        .code {
            font-size: 26px;
            font-weight: 600;
            text-align: left;
            letter-spacing: 0px;
            position: absolute;
            right: 34px;
            top: 19px;
        }
    }
    .note {
        font-size: 20px;
        margin-bottom: 25px;
    }
    > button {
        background: #020202;
        width: 307px;
        height: 75px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        letter-spacing: 0px;
        cursor: pointer;
    }
}
</style>
