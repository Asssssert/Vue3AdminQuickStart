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

const treePermissionData =reactive({
    data:[]
})
const treeMenuData =reactive({
    data:[]
})
const treePermissionProps = {
    id: 'permissionId',
    value: 'permissionId',
    label: 'permissionName',
    children: 'children'
}

const treeMenuProps = {
    id: 'menuId',
    value: 'menuId',
    label: 'menuName',
    children: 'children'
}

async function handleEdit(row: any) {
    dialog.title = "编辑角色"
    dialog.type = "update"
    dialog.show = true

    const resp: any = await http.get("/role/" + row.roleId)
    if (resp.code == 200) {
        let respData = resp.data
        form.roleId = respData.roleId
        form.roleName = respData.roleName
        form.roleDescription = respData.roleDescription
    }
}

async function handleDel(row: any) {
    const resp = await http.delete("/role/" + row.roleId);
    if (resp.code == 200) {
        getData()
        notice("success", "提示", resp.msg)
    }
}

async function handlePermission(val: any) {
    dialog.id = val.roleId
    await getPermissions()
    await getPermissionIds()

}


async function handleMenu(val: any) {
    dialog.id = val.roleId
    await getMenu()
    await getMenuIds()
}

async function showDialog(val: any) {
    dialog.title = "添加角色"
    dialog.width = 800
    dialog.type = "add"
    dialog.show = true
}


async function handleSizeChange(val: number) {
    console.log('handleSizeChange', val)
}

async function handleCurrentChange(val: number) {
    pagination.page = val
    await getData();
}




const treeRef = ref<InstanceType<typeof ElTree>>()


const dialog = reactive({
    title: "",
    show: false,
    width: 400,
    type: "",
    id:0,

})



async function dialogFormVisible  (flag: number)  {
    if(flag==1){
        if(dialog.type=="permission"){
        let nodeData ={roleId:dialog.id,permissionIds:treeRef.value!.getCheckedKeys(false)}
        const resp = await http.post("/role/upd/permission", nodeData)
        if (resp.code == 200) {
            notice("success", "提示", resp.msg)
        }
    }

        if(dialog.type=="menu"){
            let nodeData ={roleId:dialog.id,menuIds:treeRef.value!.getCheckedKeys(false)}
            const resp = await http.post("/role/upd/menu", nodeData)
            if (resp.code == 200) {
                console.log(resp);
                notice("success", "提示", resp.msg)
            }
        }
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
    roleId: 0,
    roleName: "",
    roleDescription: ""
})

const formRule = {
    roleName: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
    ],
}

import notice from '@/assets/notice'
import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance>()

async function submit(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            if (dialog.type == "add") {
                add(form)
            }
            if (dialog.type == "update") {
                update(form)
            }
        }
    })
}

async function add(formData: any) {
    const resp: any = await http.post("/role/add", formData)
    if (resp.code === 200) {
        notice("success", "提示", resp.msg);
        dialog.show = false;
        await getData();
    } else {
        notice("error", "提示", resp.msg);
    }
}

async function update(formData: any) {
    const resp: any = await http.post("/role/upd", formData)
    if (resp.code === 200) {
        notice("success", "提示", resp.msg);
        dialog.show = false;
        await getData();
    } else {
        notice("error", "提示", resp.msg);
    }
}


 async function getPermissions() {
    const resp: any = await http.get("/permission/page", {  page: 1, size: 999 })
    if (resp.code === 200) {
        dialog.title = "权限"
        dialog.width = 400
        dialog.type = "permission"
        dialog.show = true
        treePermissionData.data = resp.data.records
    }
}
 async function getPermissionIds() {
    const resp: any = await http.get("/role/permission/"+dialog.id)
    if (resp.code === 200) {
        treeRef.value!.setCheckedKeys(resp.data, false)
    }
}

 async function getMenu() {
    const resp: any = await http.get("/menu/page", {  page: 1, size: 999 })
    if (resp.code === 200) {
        dialog.title = "菜单"
        dialog.width = 400
        dialog.type = "menu"
        dialog.show = true
        treeMenuData.data = resp.data.records
    }
}
 async function getMenuIds() {
    const resp: any = await http.get("/role/menu/"+dialog.id)
    if (resp.code === 200) {
        treeRef.value!.setCheckedKeys(resp.data, false)
    }
}

</script>

<template>
    <el-button type="primary" @click="showDialog">添加角色</el-button>
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
            <div class="dialog-show-box" v-if="dialog.type == 'permission'">
                <el-tree ref="treeRef" :data="treePermissionData.data" :props="treePermissionProps" node-key="permissionId" show-checkbox />
                <div class="setting-tree-btn-box">
                    <el-button @click="dialogFormVisible(0)">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible(1)">
                        提交
                    </el-button>
                </div>
            </div>
            <div class="dialog-show-box" v-if="dialog.type == 'menu'">
                <el-tree ref="treeRef" :data="treeMenuData.data" :props="treeMenuProps" node-key="menuId" show-checkbox />
                <div class="setting-tree-btn-box">
                    <el-button @click="dialogFormVisible(0)">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible(1)">
                        提交
                    </el-button>
                </div>
            </div>
            <div v-if="dialog.type=='add'||dialog.type=='update'">
                <el-form :model="form" ref="formRef" :rules="formRule" label-width="80px">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="form.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDescription">
                        <el-input v-model="form.roleDescription"></el-input>
                    </el-form-item>
                </el-form>
                <div class="setting-tree-btn-box">
                    <el-button @click="dialog.show = false">取消</el-button>
                    <el-button type="primary" @click="submit(formRef)">
                        提交
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped></style>