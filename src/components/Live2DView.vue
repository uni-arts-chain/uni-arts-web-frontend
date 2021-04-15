/** * Created by Lay Hunt on 2021-03-30 10:00:48. */
<template>
    <div
        class="live2dview"
        v-loading="isLoading"
        :style="`width: ${width};height: ${height};`"
        ref="canvasWrapper"
    >
        <canvas ref="canvas"></canvas>
    </div>
</template>
<script>
import live2D from "@uniarts/live2d";

export default {
    name: "live2dview",
    props: {
        width: {
            type: String,
            default: "100%",
            required: true,
        },
        height: {
            type: String,
            default: "230px",
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        modelName: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            live2dInstance: {},
            isLoading: false,
            reset: () => {},
            manager: {},
        };
    },
    watch: {
        path(value) {
            if (value) {
                this.release();
                this.init();
            }
        },
    },
    destroyed() {
        this.destroy();
        console.log("Live2d Destroyed");
    },
    mounted() {
        this.live2dInstance = new live2D();
        this.reset = this.release;
        if (this.path) {
            this.release();
            this.init();
        }
        console.log("Live2d Created");
    },
    methods: {
        init() {
            this.isLoading = true;
            this.live2dInstance
                .initialize({
                    canvasWrapper: this.$refs.canvasWrapper,
                    canvas: this.$refs.canvas,
                    bgPath: "https://ipfs.uniarts.me/ipfs",
                    bgName:
                        "QmdboSbc3eHqRT5aFHejL5njke6oaoeKb9HQpPD9xg8yAx/white.png",
                })
                .then((manager) => {
                    manager
                        .addModel({
                            path: this.path,
                            modelName: this.modelName,
                        })
                        .then(() => {
                            this.isLoading = false;
                            this.$emit("shotCanvas", this.$refs.canvas);
                        });
                })
                .catch((err) => {
                    this.isLoading = false;
                    console.log(err);
                });
        },
        release() {
            this.live2dInstance && this.live2dInstance.release();
        },
        destroy() {
            this.live2dInstance && this.live2dInstance.destroy();
        },
    },
};
</script>
<style lang="scss" scoped></style>
