<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElTree } from 'element-plus'

const data = reactive(
    {
        total: 50, page: 1, size: 10,
        data: [
            { id: 1, name: "admin", nickname: "管理员" },
            { id: 2, name: "user", nickname: "普通用户" },
        ]
    }
)

const perData = reactive(
    {
        total: 50, page: 1, size: 10,
        data: [
            {
                id: 1, title: "公有权限", api: "public", method: "", parentId: 0, per: "", createTime: '', type: 0, remark: "", child: [
                    { id: 2, title: "登录", api: "/public/login", per: "auth", method: "POST", parentId: 1, createTime: '', type: 1, remark: "", child: [] },
                    { id: 3, title: "注销", api: "/public/logout", per: "auth", method: "GET", parentId: 1, createTime: '', type: 1, remark: "", child: [] },
                    { id: 4, title: "获取自身基本信息", api: "/public/get/info", per: "auth", method: "GET", parentId: 1, createTime: '', type: 1, remark: "", child: [] },
                    { id: 5, title: "修改自身基本信息", api: "/public/get/info", per: "auth", method: "POST", parentId: 1, createTime: '', type: 1, remark: "", child: [] },
                ]
            },
            {
                id: 6, title: "用户权限", api: "user", method: "", parentId: 0, createTime: '', type: 0, remark: "", child: [
                    { id: 7, title: "根据ID获取用户信息", api: "/user/get/*", per: "user:get", method: "GET", parentId: 6, createTime: '', type: 1, remark: "", child: [] },
                    { id: 8, title: "分页查找用户列表", api: "/user/page", per: "user:page", method: "GET", parentId: 6, createTime: '', type: 1, remark: "", child: [] },
                    { id: 9, title: "根据ID修改用户信息", api: "/user/upd", per: "user:upd", method: "POST", parentId: 6, createTime: '', type: 1, remark: "", child: [] },
                    { id: 10, title: "根据ID删除用户", api: "/user/del/*", per: "user:del", method: "GET", parentId: 6, createTime: '', type: 1, remark: "", child: [] },
                ]
            }
        ]
    }
)

const menuData = reactive(
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

const  dialogType = ref('')
const treeData = reactive({})

const handleEdit = (row: object) => {
    console.log(row)
}

const handleDel = (row: object) => {
    console.log(row)
}

const handlePermission = (val: number) => {
    dialogType.value="permission"
    treeData.value = perData
    dialogVisible.value = true
}

const handleMenu = (val: number) => {
    dialogType.value="menu"
    treeData.value = menuData
    dialogVisible.value = true
}


const handleSizeChange = (val: number) => {
    console.log("handleSizeChange")
}

const handleCurrentChange = (val: number) => {
    console.log("handleSizeChange")
}

const treeProps = {
    label: 'title',
    children: 'child'
}

const settingTree = ref<InstanceType<typeof ElTree>>()

const dialogVisible = ref(false)

const dialogFormVisible = (flag: number) => {
    
    if(flag==1){
        const checkPerId = settingTree.value.getCheckedKeys()
        console.log(checkPerId);
    }
    dialogVisible.value = false
}

</script>

<template>
    <div class="menu-list-box">
        <el-table :empty-text="'暂无数据'" :stripe="true" :data="data.data" :highlight-current-row="true" height="700px">
            <el-table-column align="center" header-align="center" prop="id" label="编号" width="150" />
            <el-table-column align="center" header-align="center" prop="name" label="角色名" />
            <el-table-column align="center" header-align="center" prop="nickname" label="名称" />
            <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="handlePermission(scope.row)">权限</el-button>
                    <el-button link type="primary" @click="handleMenu(scope.row)">菜单</el-button>
                    <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button link type="primary" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination v-model:current-page="data.page" v-model:page-size="data.size" small="small"
            layout="prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        <el-dialog v-model="dialogVisible" title="权限" width="400">
            <el-tree ref="settingTree" :data="treeData.value.data" :props="treeProps" node-key="id" show-checkbox />
            <div class="setting-tree-btn-box">
                <el-button @click="dialogFormVisible(0)">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible(1)">
                    提交
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped>

</style>