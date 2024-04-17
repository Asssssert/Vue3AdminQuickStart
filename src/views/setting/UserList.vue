<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ElTree } from 'element-plus'


const pagination = reactive({
    total: 0,
    page: 0,
    size: 0,
})

const userData = reactive(
    {
        data: [{ id: 1, username: "admin", realname: "Admin", email: "admin@admin.com", phone: "13212345678", createTime: "2021-01-01 00:00:00", idcard: "43101234567890123", state: 0, lastLogin: "2024-01-01 00:00:00", lastLoginIp: "221.221.221.221", sex: 0 },
        { id: 2, username: "asssert", realname: "Admin", email: "admin@admin.com", phone: "13212345678", createTime: "2021-01-01 00:00:00", idcard: "43101234567890123", state: 0, lastLogin: "2024-01-01 00:00:00", lastLoginIp: "221.221.221.221", sex: 0 },
        { id: 3, username: "lei", realname: "Admin", email: "admin@admin.com", phone: "13212345678", createTime: "2021-01-01 00:00:00", idcard: "43101234567890123", state: 0, lastLogin: "2024-01-01 00:00:00", lastLoginIp: "221.221.221.221", sex: 0 },]
    }
)

const roleData = reactive(
    {
        data: [
            { id: 1, name: "admin", nickname: "管理员" },
            { id: 2, name: "user", nickname: "普通用户" },
        ]
    }
)
const handleEdit = (row: object) => {
    console.log(row)
}

const handleDel = (row: object) => {
    console.log(row)
}

const handleRole = (row: object) => {
    dialogVisible.value = true
    console.log(roleData.data)
}

const handleSizeChange = (val: number) => {
    console.log("handleSizeChange")
}

const handleCurrentChange = (val: number) => {
    console.log("handleSizeChange")
}

//dialog
const dialogVisible = ref(false)
const settingTree = ref<InstanceType<typeof ElTree>>()

const dialogFormVisible = (flag: number) => {

    if (flag == 1) {
        const checkPerId = settingTree.value.getCheckedKeys()
        console.log(checkPerId);
    }
    dialogVisible.value = false
}

const treeProps = {
    label: 'roleName',
    children: 'child'
}

const searchKey = ref("")
import { Search } from '@element-plus/icons-vue'
import request from '@/assets/request'

const getUser = async () => {
    const userResult = await request("/user/search", { key: searchKey.value, page: 1, size: 10 })
        .then(resp => {
            const data = resp.data;
            userData.data = data.records
        })
}

const getRole = async()=>{
    const roleResult = await request("/role/list")
        .then(resp => {
            const data = resp.data;
            roleData.data = data
        })
}

onMounted(async () => {
    await getUser();
    await getRole();

})

</script>

<template>
    <div class="user-list-box">
        <el-input v-model="searchKey" size="small" style="width: 240px" placeholder="输入关键字" :prefix-icon="Search">
            <template #append>
                <el-button>搜索</el-button>
            </template>
        </el-input>
        <el-table :empty-text="'暂无数据'" :stripe="true" :data="userData.data" :highlight-current-row="true" height="700px">
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

        <el-dialog v-model="dialogVisible" title="权限" width="400">
            <el-tree ref="settingTree" :data="roleData.data" :props="treeProps" node-key="id" show-checkbox />
            <div class="setting-tree-btn-box">
                <el-button @click="dialogFormVisible(0)">取消</el-button>
                <el-button type="primary" @click="dialogFormVisible(1)">
                    提交
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style scoped></style>