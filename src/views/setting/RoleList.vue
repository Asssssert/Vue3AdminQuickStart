<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElTree } from 'element-plus'

const roleData = reactive(
    {
        data: []
    }
)

const pagination = reactive({
    total: 0,
    page: 1,
    size: 50,
})

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

const treeData = reactive({})

async function handleEdit(row: object) {
    console.log(row)
}

async function handleDel(row: object) {
    console.log(row)
}

async function handlePermission(val: number) {
    dialog.title = "权限"
    dialog.width = 400
    dialog.type = "permission"
    treeData.value = perData
    dialog.show = true
}

async function handleMenu(val: number) {
    dialog.title = "菜单"
    dialog.width = 400
    dialog.type = "menu"
    treeData.value = menuData
    dialog.show = true
}

async function showDailog(val: number) {
    dialog.title = "添加角色"
    dialog.width = 800
    dialog.type = "role"

    dialog.show = true
}


async function handleSizeChange(val: number) {
    console.log('handleSizeChange', val)
}

async function handleCurrentChange(val: number) {
    pagination.page = val
    await getData();
}


const treeProps = {
    label: 'title',
    children: 'child'
}

const settingTree = ref<InstanceType<typeof ElTree>>()


const dialog = reactive({
    title: "",
    show: false,
    width: 400,
    type: "",

})

const dialogFormVisible = (flag: number) => {

    if (flag == 1) {
        const checkPerId = settingTree.value.getCheckedKeys()
        console.log(checkPerId);
    }
    dialog.show = false
}

import http from '@/assets/http';

async function getData() {
    const resp: any = await http.get("/role/page", { page: pagination.page, size: pagination.size })
    roleData.data = resp.data.records
    pagination.total = resp.data.total
    pagination.page = resp.data.current
    pagination.size = resp.data.size

}
// 组件挂载后执行的方法
onMounted(async () => {
    await getData()
})

const form = reactive({
    roleName: "",
    roleDescription: ""
})

const formRule = {
    roleName: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
    ],
}



import notice from '@/assets/notice'

async function submit(formEl: any) {
    if (!formEl) return
    await formEl.validate(async (valid: any, fields: any) => {
        if (valid) {
            const resp: any = http.post("/role/add", form)
            if (resp.code === 200) {
                notice("success", "提示", resp.msg);
                dialog.show = false;
                await getData();
            } else {
                notice("error", "提示", resp.msg);
            }

        }
    })
}



</script>

<template>
    <el-button type="primary" @click="showDailog">添加角色</el-button>
    <div class="menu-list-box">

        <el-table :empty-text="'暂无数据'" :stripe="true" :data="roleData.data" :highlight-current-row="true"
            height="700px">
            <el-table-column align="center" header-align="center" prop="roleId" label="编号" width="150" />
            <el-table-column align="center" header-align="center" prop="roleName" label="角色" />
            <el-table-column align="center" header-align="center" prop="roleDescription" label="描述" />
            <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="handlePermission(scope.row)">权限</el-button>
                    <el-button link type="primary" @click="handleMenu(scope.row)">菜单</el-button>
                    <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button link type="primary" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :current-page="pagination.page" :page-size="pagination.size" :total="pagination.total"
            small="small" layout="prev, pager, next, jumper" @update:page-size="handleSizeChange"
            @update:current-page="handleCurrentChange" />

        <el-dialog v-model="dialog.show" :title="dialog.title" :width="dialog.width">
            <div class="dialog-show-box" v-if="dialog.type != 'role'">
                <el-tree ref="settingTree" :data="treeData.value.data" :props="treeProps" node-key="id" show-checkbox />
                <div class="setting-tree-btn-box">
                    <el-button @click="dialogFormVisible(0)">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible(1)">
                        提交
                    </el-button>
                </div>
            </div>
            <div v-else>
                <el-form :model="form" :rules="formRule" label-width="80px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDescription">
                        <el-input v-model="form.roleDescription"></el-input>
                    </el-form-item>
                </el-form>
                <div class="setting-tree-btn-box">
                    <el-button @click="dialog.show = false">取消</el-button>
                    <el-button type="primary" @click="submit">
                        提交
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped></style>