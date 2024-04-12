<script setup lang="ts">
import { reactive, ref } from 'vue'
const data = reactive(
    {
        total: 50, page: 1, size: 10,
        data: [
            {
                id: 1, title: '主页', path: "index", icon: "", child: [
                    { id: 2, icon: "", title: "大屏", path: "/home/index" },
                ],

            },
            {
                id: 5, icon: "", title: "系统设置", path: "setting", child: [
                    { id: 6, icon: "", title: "用户列表", path: "/home/userList" },
                    { id: 7, icon: "", title: "角色列表", path: "/home/roleList" },
                    { id: 8, icon: "", title: "权限列表", path: "/home/permissionList" },
                    { id: 9, icon: "", title: "菜单列表", path: "/home/menuList" },

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
                            <el-table-column align="center" header-align="center" prop="title" label="标题" />
                            <el-table-column align="center" header-align="center" prop="path" label="链接" />
                            <el-table-column align="center" header-align="center" prop="icon" label="图标" />
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
            <el-table-column align="center" header-align="center" prop="title" label="标题" />
            <el-table-column align="center" header-align="center" prop="path" label="链接" />
            <el-table-column align="center" header-align="center" prop="icon" label="图标" />
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