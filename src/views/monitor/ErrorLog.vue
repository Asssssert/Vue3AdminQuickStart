<script setup lang="ts">
import { reactive, ref } from 'vue'

const data = reactive(
    {
        total: 50, page: 1, size: 10,
        data: [
            { id: 1, username: "admin", path: "/login", title: "登录失败", createTime: "2021-01-01 00:00:00", ip: "223.73.30.234", ipFrom: "中国 广东省 东莞市", userTIme: 73, browser: "Chrome" },
            { id: 2, username: "admin", path: "/get/userInfo", title: "无权限", createTime: "2021-01-01 00:00:00", ip: "223.73.30.234", ipFrom: "中国 广东省 东莞市", userTIme: 450, browser: "Chrome" },
            { id: 3, username: "admin", path: "/login", title: "登录失败", createTime: "2021-01-01 00:00:00", ip: "223.73.30.234", ipFrom: "中国广东省东莞市", userTIme: 1530, browser: "Chrome" },
            { id: 4, username: "admin", path: "/get/userInfo", title: "无权限", createTime: "2021-01-01 00:00:00", ip: "223.73.30.234", ipFrom: "中国广东省东莞市", userTIme: 720, browser: "Chrome" },
        ]
    }
)



const handleSizeChange = (val: number) => {
    console.log("handleSizeChange")
}

const handleCurrentChange = (val: number) => {
    console.log("handleSizeChange")
}


</script>

<template>
    <div class="logs-list-box">

        <el-table :empty-text="'暂无数据'" :stripe="true" :data="data.data" :highlight-current-row="true" height="700px">
            <el-table-column align="center" header-align="center" prop="id" label="编号" width="120" />
            <el-table-column align="center" header-align="center" prop="username" label="用户名" />
            <el-table-column align="center" header-align="center" prop="path" label="接口地址" />
            <el-table-column align="center" header-align="center" prop="title" label="描述" />
            <el-table-column align="center" header-align="center" prop="browser" label="浏览器" />
            <el-table-column align="center" header-align="center" prop="ip" label="IP" />
            <el-table-column align="center" header-align="center" prop="ipFrom" label="IP来源" />
            <el-table-column align="center" header-align="center" prop="userTIme" label="耗时">
                <template #default="scope">
                    <el-tag v-if="scope.row.userTIme < 100">{{ scope.row.userTIme }}ms</el-tag>
                    <el-tag type="success" v-else-if="scope.row.userTIme < 500">{{ scope.row.userTIme }}ms</el-tag>
                    <el-tag type="warning" v-else-if="scope.row.userTIme < 1000">{{ scope.row.userTIme }}ms</el-tag>
                    <el-tag type="danger" v-else="scope.row.userTIme > 1000">{{ scope.row.userTIme }}ms</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" header-align="center" prop="createTime" label="创建时间" width="170" />
        </el-table>

        <el-pagination v-model:current-page="data.page" v-model:page-size="data.size" small="small"
            layout="prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />


    </div>
</template>
<style scoped></style>