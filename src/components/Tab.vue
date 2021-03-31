/** * Created by Lay Hunt on 2021-03-30 11:41:29. */
<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    name: "tab",
    data() {
        return {
            activeName: "first",
        };
    },
    methods: {
        handleClick() {},
    },
};
</script>
<style lang="scss" scoped></style>
