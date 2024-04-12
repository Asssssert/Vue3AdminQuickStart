<script setup lang="ts">
import { reactive, ref } from 'vue'

const data = reactive(
    {
        total: 50, page: 1, size: 10,
        data: [
            { id: 1,  filename: "OJ1MA-ihcBMOTdXZp2oZTmSa9ap6iqxTO8mDQmwj09ankAA_870492.jpg", oldfilename:"hello.jpg" , filepath:"/data/img/OJ1MA-ihcBMOTdXZp2oZTmSa9ap6iqxTO8mDQmwj09ankAA_870492.jpg", username: "admin", thumbnail:"https://inews.gtimg.com/news_ls/OJ1MA-ihcBMOTdXZp2oZTmSa9ap6iqxTO8mDQmwj09ankAA_870492/0",fileType:"图片",suffix:"jpg",size:"10MB", ip: "223.73.30.234", ipFrom: "中国 广东省 东莞市", userTIme: 73, createTime: "2021-01-01 00:00:00" },
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

const searchKey = ref("")
import {Search} from '@element-plus/icons-vue'

</script>

<template>
    <div class="db-list-box">
        <div class="search-box">
            <el-input
                v-model="searchKey"
                size="small"
                style="width: 240px"
                placeholder="输入关键字" 
                :prefix-icon="Search">
                <template #append>
                    <el-button >搜索</el-button>
                </template>
            </el-input>
        </div>
        <el-table :empty-text="'暂无数据'" :stripe="true" :data="data.data" :highlight-current-row="true" height="700px">
            <el-table-column align="center" header-align="center" prop="id" label="编号" width="120" />
            <el-table-column align="center" header-align="center" prop="filename" label="文件名" :show-overflow-tooltip="true" width="200"/>
            <el-table-column align="center" header-align="center" prop="oldfilename" label="旧文件名" width="200"/>
            <el-table-column align="center" header-align="center" prop="filepath" label="文件路径" :show-overflow-tooltip="true"/>
            <el-table-column align="center" header-align="center" prop="fileType" label="文件类型" />
            <el-table-column align="center" header-align="center" prop="thumbnail" label="缩略图" >
                <template #default="scope">
                    <img :src="scope.row.thumbnail" alt="" style="max-width: 100px;">
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" prop="suffix" label="后缀名" />
            <el-table-column align="center" header-align="center" prop="size" label="文件大小" />
            <el-table-column align="center" header-align="center" prop="username" label="上传用户" />
            <el-table-column align="center" header-align="center" prop="ip" label="IP" />
            <el-table-column align="center" header-align="center" prop="ipFrom" label="IP来源" />
            <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="handleDownload(scope.row)">下载</el-button>
                    <el-button link type="primary" @click="handleRollback(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" prop="createTime" label="创建时间" width="200"/>

        </el-table>

        <el-pagination v-model:current-page="data.page" v-model:page-size="data.size" small="small"
            layout="prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />


    </div>
</template>
<style scoped></style>