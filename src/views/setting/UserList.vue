<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElTree } from 'element-plus'
// 弹窗
const dialog = reactive({
    title: "",
    show: false,
    width: 400,
    id: 0,
    type: "",

})

const pagination = reactive({
    total: 0,
    page: 1,
    size: 50,
})

const userData = reactive(
    {
        data: []
    }
)

const roleData = reactive(
    {data: []}
)

const treeRef = ref<InstanceType<typeof ElTree>>()


const treeProps = {
    id: 'roleId',
    value: 'roleId',
    label: 'roleName',
    children: 'children'
}

const searchKey = ref("")
import { Search } from '@element-plus/icons-vue'
import http from '@/assets/http'
import notice from '@/assets/notice';


//表单
const form = reactive({
    userId: 0,
    username: "",
    email: "",
    phoneNumber: "",
    gender: 0,
    state: 0
})

const formRule = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入邮箱', trigger: 'blur' },
    ],
    phoneNumber: [
        { required: true, message: '请输入电话号码', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'change' },
    ],
    state: [
        { required: true, message: '请选择状态', trigger: 'change' },
    ],
}


onMounted(async () => {
    await getData();
})


async function showDialog(flag: number) {
    if (flag == 1) {
        const checkPerId = treeRef.value!.getCheckedKeys()
        console.log(checkPerId);
    }
    dialog.show = false
}

async function getData() {
    http.get("/user/search", { key: searchKey.value, page: 1, size: 10 })
        .then((resp: any) => {
            const data = resp.data;
            userData.data = data.records
            pagination.total = resp.data.total
            pagination.page = resp.data.current
            pagination.size = resp.data.size
        })
}

async function getRole() {
    const resp:any = await http.get("/role/list")
    if (resp.code == 200) {
        
        dialog.show = true
        dialog.type = "role"
        dialog.width = 400
        dialog.title = "编辑角色"
        let data = resp.data;
        roleData.data = data
    }
}
async function getRoleIds() {
    const resp:any = await http.get("/user/role/"+dialog.id)
    if (resp.code == 200) {
        treeRef.value!.setCheckedKeys(resp.data, false)
    }
}


async function handleCurrentChange(val: number) {
    pagination.page = val
    getData();
}
async function handleSizeChange(val: number) {

}
async function handleDel(row: any) {
    const resp = await http.delete("/user/" + row.userId);
    if (resp.code == 200) {
        getData()
        notice("success", "提示", resp.msg)
    }
}
async function handleEdit(row: any) {
    dialog.show = true
    dialog.type = "update"
    dialog.title = "编辑用户"
    dialog.width = 800
    const resp: any = await http.get("/user/" + row.userId)
    if (resp.code == 200) {
        let respdata = resp.data
        form.userId = respdata.userId
        form.email = respdata.email
        form.gender = respdata.gender
        form.phoneNumber = respdata.phoneNumber
        form.username = respdata.username
    }


}
async function handleRole(row: any) {
    dialog.id = row.userId
    await getRole()

    await getRoleIds()

}

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
    const resp: any = await http.post("/user/add", formData)
    if (resp.code === 200) {
        notice("success", "提示", resp.msg);
        dialog.show = false;
        await getData();
    } else {
        notice("error", "提示", resp.msg);
    }
}

async function update(formData: any) {
    const resp: any = await http.put("/user/"+formData.userId, formData)
    if (resp.code === 200) {
        notice("success", "提示", resp.msg);
        dialog.show = false;
        await getData();
    } else {
        notice("error", "提示", resp.msg);
    }
}

async function dialogFormVisible  (flag: number)  {
    if(flag==1){
        let nodeData ={userId:dialog.id,roleIds:treeRef.value!.getCheckedKeys(false)}
        const resp = await http.post("/user/upd/role", nodeData)
        if (resp.code == 200) {
            notice("success", "提示", resp.msg)
        }
    }
    dialog.show = false
}

</script>

<template>
    <div class="user-list-box">
        <el-input v-model="searchKey" size="small" style="width: 240px" placeholder="输入关键字" :prefix-icon="Search">
            <template #append>
                <el-button>搜索</el-button>
            </template>
        </el-input>
        <el-table :empty-text="'暂无数据'" :stripe="true" :data="userData.data" :highlight-current-row="true"
            height="700px">
            <el-table-column align="center" header-align="center" prop="userId" label="编号" />
            <el-table-column align="center" header-align="center" prop="username" label="用户名" />
            <!-- <el-table-column align="center" header-align="center" prop="realname" label="姓名" /> -->
            <el-table-column align="center" header-align="center" prop="gender" label="性别">
                <template #default="scope">
                    <el-tag v-if="scope.row.gender == 0" type="success">男</el-tag>
                    <el-tag v-else type="danger">女</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" prop="email" label="邮箱" width="170" />
            <el-table-column align="center" header-align="center" prop="phoneNumber" label="电话" />
            <!-- <el-table-column align="center" header-align="center" prop="idcard" label="身份证" width="170" /> -->
            <el-table-column align="center" header-align="center" prop="lastLogin" label="最后登录时间" width="170" />
            <el-table-column align="center" header-align="center" prop="lastLoginIp" label="最后登录IP" width="170" />
            <el-table-column align="center" header-align="center" prop="createdAt" label="创建时间" width="170" />
            <el-table-column align="center" header-align="center" prop="state" label="账号状态">
                <template #default="scope">
                    <el-switch inline-prompt active-text="正常" inactive-text="禁用" v-model="scope.row.state"
                        :active-value="0" :inactive-value="1" />
                </template>
            </el-table-column>
            <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="handleRole(scope.row)">角色</el-button>
                    <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button link type="primary" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination :current-page="pagination.page" :page-size="pagination.size" :total="pagination.total"
            small="small" layout="prev, pager, next, jumper" @update:page-size="handleSizeChange"
            @update:current-page="handleCurrentChange" />

        <el-dialog v-model="dialog.show" :title="dialog.title" :width="dialog.width">
            <div class="dialog-show-box" v-if="dialog.type == 'role'">
                <el-tree ref="treeRef" :data="roleData.data" :props="treeProps"  node-key="roleId" show-checkbox />
                <div class="setting-tree-btn-box">
                    <el-button @click="dialogFormVisible(0)">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible(1)">
                        提交
                    </el-button>
                </div></div>
            
            <div class="setting-tree-btn-box" v-if="dialog.type == 'add' || dialog.type == 'update'">
                <el-form :model="form" ref="formRef" :rules="formRule" label-width="80px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select v-model="form.gender" placeholder="请选择性别">
                            <el-option label="男" :value='0' />
                            <el-option label="女" :value='1' />
                            <el-option label="其他" :value='2' />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="电话号码" prop="phoneNumber">
                        <el-input v-model="form.phoneNumber"></el-input>
                    </el-form-item>

                </el-form>
                <el-button @click="showDialog(0)">取消</el-button>
                <el-button type="primary" @click="submit(formRef)">
                    提交
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped></style>