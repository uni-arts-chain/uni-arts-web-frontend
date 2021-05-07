/** * Created by Lay Hunt on 2021-05-06 10:22:40. */
<template>
    <div class="faucet">
        <div class="container">
            <h1 class="title">
                <icon-svg icon-class="bath" style="margin-right: 10px" />
                UniArts Authenticated Faucet
            </h1>
            <div class="input-body">
                <Input
                    placeholder="Your UniArts Chain address..."
                    v-model="form.address"
                />
                <button
                    v-loading="isLoading"
                    class="submit-button"
                    @click="submit"
                >
                    Give me Uart
                </button>
            </div>
            <div class="desc">
                <h3>How does this work?</h3>
                <p>
                    This UniArts faucet is running on the Test network. Anyone
                    may request funds within the permitted limits.
                </p>
                <p style="font-weight: 600">
                    Request frequency is limited to once every 24 hours
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import Input from "@/components/Input";
export default {
    name: "faucet",
    components: {
        Input,
    },
    data() {
        return {
            form: {
                address: "",
            },
            isLoading: false,
        };
    },
    methods: {
        submit() {
            if (!this.form.address) {
                this.$notify.error("Invalid address");
                return;
            }
            if (this.isLoading) {
                return;
            }
            this.isLoading = true;
            this.$http
                .globalPostFaucet({
                    address: this.form.address,
                })
                .then(() => {
                    this.isLoading = false;
                    this.form.address = "";
                    this.$notify.success("Success");
                })
                .catch((err) => {
                    console.log(err);
                    this.isLoading = false;
                    this.$notify.error(err.head ? err.head.msg : err);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.faucet {
    display: flex;
    align-items: center;
    position: relative;
    min-height: calc(100vh - 283px - 91px);
    max-width: 100%;
}
.container {
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
}
.title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 36px;
    letter-spacing: 1px;
    margin-bottom: 50px;
}
.input-body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
}
.input-box {
    width: calc(80% - 142px);
}
.submit-button {
    background-color: transparent;
    border: 2px solid #020202;
    height: 45px;
    border-left: 0px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    cursor: pointer;
}
.desc {
    width: 100%;
    margin-top: 10%;
    h3 {
        text-align: left;
        font-size: 24px;
        font-weight: 500;
        line-height: 1.1;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    p {
        text-align: left;
        font-size: 16px;
        line-height: 1.42857143;
        margin: 0 0 10px;
        color: #2d2d2d;
    }
}

::v-deep .el-loading-mask .el-loading-spinner {
    margin-top: -21px;
}

@media screen and (max-width: 768px) {
    .input-body {
        width: 95%;
    }
    .input-box {
        width: calc(95% - 142px);
    }
    .title {
        font-size: 29px;
    }
}
</style>
