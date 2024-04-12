<script setup lang="ts">
import { reactive, ref } from 'vue'

const data = reactive(
    {
        total: 50, page: 1, size: 10,
        data: [
            { id: 1, backupName: "Backup202404122244", username: "Admin", ip: "223.73.30.234", ipFrom: "中国 广东省 东莞市", userTIme: 73, createTime: "2021-01-01 00:00:00" },
        ]
    }
)


const handleDownload = (row: object) => {
    console.log(row)
}

const handleRollback = (row: object) => {
    console.log(row)
}

const handleSizeChange = (val: number) => {
    console.log("handleSizeChange")
}

const handleCurrentChange = (val: number) => {
    console.log("handleSizeChange")
}

const timeKey = ref("")

</script>

<template>
    <div class="db-list-box">
        <div class="search-box">
            <el-date-picker v-model="timeKey" type="daterange" unlink-panels range-separator="-"
                start-placeholder="开始日期" end-placeholder="结束日期" />
            <el-button type="primary" style="margin-left: 10px;">搜索</el-button>
        </div>
        <el-table :empty-text="'暂无数据'" :stripe="true" :data="data.data" :highlight-current-row="true" height="700px">
            <el-table-column align="center" header-align="center" prop="id" label="编号" width="120" />
            <el-table-column align="center" header-align="center" prop="username" label="操作人" />
            <el-table-column align="center" header-align="center" prop="backupName" label="备份名称" />
            <el-table-column align="center" header-align="center" prop="createTime" label="备份时间" />
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
            <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="handleDownload(scope.row)">下载</el-button>
                    <el-button link type="primary" @click="handleRollback(scope.row)">回滚</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="data.page" v-model:page-size="data.size" small="small"
            layout="prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />


    </div>
</template>
<style scoped></style>