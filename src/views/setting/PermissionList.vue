<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

const pagination = reactive({
    total: 0,
    page: 1,
    size: 50,
})

const permissionOptions = ref([{ permissionId: 0, permissionName: "权限菜单" }])

const data = reactive(
    {
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



const dialog = reactive({
    title: "添加权限",
    show: false,
    width: 400,
    type: "",

})

const form = reactive({
    permissionId: 0,
    permissionName: "",
    permissionParentId: 0,
    permissionCode: "",
    permissionDesc: "",
    permissionMethod: "",
    permissionApi: ""
})

const formRule = reactive({
    permissionName: [
        { required: true, message: '请输入权限名称', trigger: 'blur' },
    ],
    permissionParentId: [
        { required: true, message: '请选择权限类别', trigger: 'change' },
    ],
    permissionCode: [
        { required: true, message: '请输入权限代码', trigger: 'blur' },
    ],
    permissionApi: [
        { required: true, message: '请输入请求地址', trigger: 'blur' },
    ],
})

import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance>()




import http from '@/assets/http';
import notice from '@/assets/notice';


// 组件挂载后执行的方法
onMounted(async () => {
    await getData()
    await getPerByParentId();
})


async function showDialog() {
    dialog.title = "添加权限"
    dialog.show = true
    dialog.type = "add"
    form.permissionId = 0
    form.permissionName = ""
    form.permissionParentId = 0
    form.permissionApi = ""
    form.permissionCode = ""
    form.permissionMethod = ""


}
async function getData() {
    http.get("/permission/page", { page: pagination.page, size: pagination.size })
        .then((resp: any) => {
            pagination.total = resp.data.total;
            pagination.page = resp.data.page;
            pagination.size = resp.data.size;
            data.data = resp.data.records;

        })
}
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
    const resp: any = await http.post("/permission/add", formData)
    if (resp.code == 200) {
        notice("success", "提示", resp.msg);
        dialog.show = false;
        getData()
    }
}

async function update(formData: any) {
    const resp: any = await http.post("/permission/upd", formData)
    if (resp.code == 200) {
        notice("success", "提示", resp.msg);
        dialog.show = false;
        getData()
    }
}

async function handleCurrentChange(val: number) {
    pagination.page = val
    await getData();

}
async function handleSizeChange(val: number) {

}
async function handleDel(row: any) {
    const resp = await http.delete("/permission/" + row.permissionId );
    if (resp.code == 200) {
        getData()
        notice("success", "提示", resp.msg)
    }
}
async function handleEdit(row: any) {
    dialog.title = "编辑权限"
    dialog.type = "update"
    dialog.show = true

    const resp: any = await http.get("/permission/" + row.permissionId)
    if (resp.code == 200) {
        let respData = resp.data
        form.permissionId = respData.permissionId
        form.permissionApi = respData.permissionApi
        form.permissionCode = respData.permissionCode
        form.permissionDesc = respData.permissionDesc
        form.permissionName = respData.permissionName
        form.permissionMethod = respData.permissionMethod
        form.permissionParentId = respData.permissionParentId

    }
    
}
/**
 * 根据父权限ID获取子权限
 */
async function getPerByParentId() {
    const resp: any = await http.get("/permission/page/parentId", { parentId: 0, page: 1, size: 999 })
    if (resp.code === 200) {
        permissionOptions.value = [...permissionOptions.value, ...resp.data.records]
    }
}



</script>

<template>
    <div class="menu-list-box">
        <el-button type="primary" @click="showDialog">添加权限</el-button>
        <el-table :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :empty-text="'暂无数据'" :stripe="true"
            :data="data.data" :highlight-current-row="true" height="700px">
            <el-table-column type="expand">
                <template #default="props">
                    <el-card style="width:99%; margin: auto; padding-top: 10px;padding-bottom: 10px;">
                        <el-table :empty-text="'暂无数据'" :data="props.row.children" :stripe="true"
                            :highlight-current-row="true">
                            <el-table-column align="center" header-align="center" prop="permissionId" label="编号" />
                            <el-table-column align="center" header-align="center" prop="permissionName" label="接口名称" />
                            <el-table-column align="center" header-align="center" prop="permissionApi" label="接口地址" />
                            <el-table-column align="center" header-align="center" prop="permissionMethod"
                                label="请求方式" />
                            <el-table-column align="center" header-align="center" prop="permissionCode" label="权限" />
                            <el-table-column align="center" header-align="center" prop="permissionParentId"
                                label="权限类型">
                                <template #default="scope">
                                    <el-tag v-if="scope.row.permissionParentId === 0" type="success">分类</el-tag>
                                    <el-tag v-else permissionParentId="warning">接口</el-tag>
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
            <el-table-column align="center" header-align="center" prop="permissionId" label="编号" />
            <el-table-column align="center" header-align="center" prop="permissionName" label="接口名称" />
            <el-table-column align="center" header-align="center" prop="permissionApi" label="接口地址" />
            <el-table-column align="center" header-align="center" prop="permissionMethod" label="请求方式" />
            <el-table-column align="center" header-align="center" prop="permissionCode" label="权限" />
            <el-table-column align="center" header-align="center" prop="permissionParentId" label="权限类型">
                <template #default="scope">
                    <el-tag v-if="scope.row.permissionParentId === 0" type="success">分类</el-tag>
                    <el-tag v-else permissionParentId="warning">接口</el-tag>
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

        <el-pagination v-model:current-page="pagination.page" v-model:page-size="pagination.size" small="small"
            layout="prev, pager, next, jumper" :total="pagination.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />

        <el-dialog v-model="dialog.show" :title="dialog.title" :width="dialog.width">
            <div>
                <el-form :model="form" ref="formRef" :rules="formRule" label-width="80px">
                    <el-form-item label="权限名称" prop="permissionName">
                        <el-input v-model="form.permissionName"></el-input>
                    </el-form-item>
                    <el-form-item label="权限类型" prop="permissionParentId">
                        <el-select v-model="form.permissionParentId" placeholder="请选择选项类型">
                            <el-option :label="item.permissionName" :key="index" :value='item.permissionId'
                                v-for="(item, index) in permissionOptions" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="权限代码" prop="permissionCode">
                        <el-input v-model="form.permissionCode"></el-input>
                    </el-form-item>
                    <el-form-item label="请求地址" prop="permissionApi">
                        <el-input v-model="form.permissionApi"></el-input>
                    </el-form-item>
                    <el-form-item label="权限描述" prop="permissionDesc">
                        <el-input v-model="form.permissionDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="请求方式" prop="permissionMethod">
                        <el-input v-model="form.permissionMethod"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="setting-tree-btn-box">
                            <el-button @click="dialog.show = false">取消</el-button>
                            <el-button type="primary" @click="submit(formRef)">
                                提交
                            </el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped></style>
