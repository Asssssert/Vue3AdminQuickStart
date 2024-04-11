<script setup lang="ts">
import { reactive, ref } from 'vue'

const data = reactive(
    {
        total: 50, page: 1, size: 10,
        data: [
            {
                id: 1, title: "公有权限", path: "public", method: "", parentId: 0, auth: "", createTime: '2022-01-01', type: 0, remark: "", child: [
                    { id: 2, title: "登录", path: "/public/login", auth: "auth", method: "POST", parentId: 1, createTime: '2022-01-01', type: 1, remark: "", child: [] },
                    { id: 3, title: "注销", path: "/public/logout", auth: "auth", method: "GET", parentId: 1, createTime: '2022-01-01', type: 1, remark: "", child: [] },
                    { id: 4, title: "获取自身基本信息", path: "/public/get/info", auth: "auth", method: "GET", parentId: 1, createTime: '2022-01-01', type: 1, remark: "", child: [] },
                    { id: 5, title: "修改自身基本信息", path: "/public/get/info", auth: "auth", method: "POST", parentId: 1, createTime: '2022-01-01', type: 1, remark: "", child: [] },
                ]
            },
            {
                id: 6, title: "用户权限", path: "user", method: "", parentId: 0, createTime: '2022-01-01', type: 0, remark: "", child: [
                    { id: 7, title: "根据ID获取用户信息", path: "/user/get/*", auth: "user:get", method: "GET", parentId: 6, createTime: '2022-01-01', type: 1, remark: "", child: [] },
                    { id: 8, title: "分页查找用户列表", path: "/user/page", auth: "user:page", method: "GET", parentId: 6, createTime: '2022-01-01', type: 1, remark: "", child: [] },
                    { id: 9, title: "根据ID修改用户信息", path: "/user/upd", auth: "user:upd", method: "POST", parentId: 6, createTime: '2022-01-01', type: 1, remark: "", child: [] },
                    { id: 10, title: "根据ID删除用户", path: "/user/del/*", auth: "user:del", method: "GET", parentId: 6, createTime: '2022-01-01', type: 1, remark: "", child: [] },
                ]
            }
        ]
    }
)
const handleEdit = (row: object) => {
    console.log(row)
}

const handleDel = (row: object) => {
    console.log(row)
}


const handleSizeChange = (val: number) => {
    console.log("handleSizeChange")
}

const handleCurrentChange = (val: number) => {
    console.log("handleSizeChange")
}
</script>

<template>
    <div class="menu-list-box">
        <el-table :empty-text="'暂无数据'" :stripe="true" :data="data.data" :highlight-current-row="true" height="700px">
            <el-table-column type="expand">
                <template #default="props">
                    <el-card style="width:99%; margin: auto; padding-top: 10px;padding-bottom: 10px;">
                        
                        <el-table :empty-text="'暂无数据'" :data="props.row.child" :stripe="true" :highlight-current-row="true">
                            <el-table-column align="center" header-align="center" prop="id" label="编号" />
                            <el-table-column align="center" header-align="center" prop="title" label="接口名称" />
                            <el-table-column align="center" header-align="center" prop="path" label="接口地址" />
                            <el-table-column align="center" header-align="center" prop="method" label="请求方式" />
                            <el-table-column align="center" header-align="center" prop="auth" label="权限" />
                            <el-table-column align="center" header-align="center" prop="createTime" label="创建时间" />
                            <el-table-column align="center" header-align="center" prop="type" label="权限类型" >
                                <template #default="scope">
                                    <el-tag v-if="scope.row.type === 0" type="success">菜单</el-tag>
                                    <el-tag v-else type="warning">接口</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" header-align="center" prop="remark" label="备注" />
                            <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                                <template #default="scope">
                                    <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                                    <el-button link type="primary" @click="handleDel(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-card>
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" prop="id" label="编号" />
                <el-table-column align="center" header-align="center" prop="title" label="接口名称" />
                <el-table-column align="center" header-align="center" prop="path" label="接口地址" />
                <el-table-column align="center" header-align="center" prop="method" label="请求方式" />
                <el-table-column align="center" header-align="center" prop="auth" label="权限" />
                <el-table-column align="center" header-align="center" prop="createTime" label="创建时间" />
                <el-table-column align="center" header-align="center" prop="type" label="权限类型" >
                    <template #default="scope">
                        <el-tag v-if="scope.row.type === 0" type="success">菜单</el-tag>
                        <el-tag v-else type="warning">接口</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" header-align="center" prop="remark" label="备注" />
                <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                    <template #default="scope">
                        <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button link type="primary" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="data.page" v-model:page-size="data.size" small="small"
            layout="prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
<style scoped>

</style>