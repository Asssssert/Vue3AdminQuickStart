<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElTree } from 'element-plus'

const data = reactive(
    {
        total: 50, page: 1, size: 10,
        data: [{ id: 1, username: "admin", realname: "Admin", email: "admin@admin.com", phone: "13212345678", createTime: "2021-01-01 00:00:00", idcard: "43101234567890123", state: 0, lastLogin: "2024-01-01 00:00:00", lastLoginIp: "221.221.221.221", sex: 0 },
        { id: 2, username: "asssert", realname: "Admin", email: "admin@admin.com", phone: "13212345678", createTime: "2021-01-01 00:00:00", idcard: "43101234567890123", state: 0, lastLogin: "2024-01-01 00:00:00", lastLoginIp: "221.221.221.221", sex: 0 },
        { id: 3, username: "lei", realname: "Admin", email: "admin@admin.com", phone: "13212345678", createTime: "2021-01-01 00:00:00", idcard: "43101234567890123", state: 0, lastLogin: "2024-01-01 00:00:00", lastLoginIp: "221.221.221.221", sex: 0 },]
    }
)

const roleData = reactive(
    {
        total: 50, page: 1, size: 10,
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
    
    if(flag==1){
        const checkPerId = settingTree.value.getCheckedKeys()
        console.log(checkPerId);
    }
    dialogVisible.value = false
}

const treeProps = {
    label: 'nickname',
    children: 'child'
}

const searchKey = ref("")
import {Search} from '@element-plus/icons-vue'

</script>

<template>
    <div class="user-list-box">
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
        <el-table :empty-text="'暂无数据'" :stripe="true" :data="data.data" :highlight-current-row="true" height="700px">
            <el-table-column align="center" header-align="center" prop="id" label="编号" />
            <el-table-column align="center" header-align="center" prop="username" label="用户名" />
            <el-table-column align="center" header-align="center" prop="realname" label="姓名" />
            <el-table-column align="center" header-align="center" prop="sex" label="性别" />
            <el-table-column align="center" header-align="center" prop="email" label="邮箱" width="170" />
            <el-table-column align="center" header-align="center" prop="phone" label="电话" />
            <el-table-column align="center" header-align="center" prop="idcard" label="身份证" width="170" />
            <el-table-column align="center" header-align="center" prop="lastLogin" label="最后登录时间" width="170" />
            <el-table-column align="center" header-align="center" prop="lastLoginIp" label="最后登录IP" width="170" />
            <el-table-column align="center" header-align="center" prop="createTime" label="创建时间" width="170" />
            <el-table-column align="center" header-align="center" prop="state" label="账号状态">
                <template #default="scope">
                    <el-switch inline-prompt active-text="正常" inactive-text="禁用" v-model="scope.row.state" :active-value="0" :inactive-value="1" />
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

        <el-pagination v-model:current-page="data.page" v-model:page-size="data.size" small="small"
            layout="prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />

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
<style scoped>

</style>