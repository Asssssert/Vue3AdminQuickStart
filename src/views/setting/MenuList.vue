<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import http from '@/assets/http'
import notice from '@/assets/notice';

// 响应式数据
const pagination = reactive({
    total: 0,
    page: 1,
    size: 50,
})

const menuOptions = ref([{ menuId: 0, menuName: "根节点" }])
const menuData = ref([
    // 初始化菜单数据...
])

const dialog = reactive({
    title: "添加菜单",
    show: false,
    width: 600,
    type: "",
})

const form = reactive({
    menuName: "",
    menuPath: "",
    parentMenuId: 0,
    menuIcon: "",
})

const formRule = {
    menuName: [
        { required: true, message: '请输入菜单名称', trigger: 'blur' },
    ],
    parentMenuId: [
        { required: true, message: '请选择父菜单', trigger: 'change' },
    ],
    menuPath: [
        { required: true, message: '请输入请求地址', trigger: 'blur' },
    ],
}

// 表单实例引用
const formRef = ref()

// 方法
/**
 * 显示对话框
 */
async function showDialog() {
    dialog.show = true
}

/**
 * 提交表单
 * @param formEl 表单元素
 */
async function submit(formEl: any) {
    if (!formEl) return
    await formEl.validate(async (valid: any, fields: any) => {
        if (valid) {
            const resp = await http.post("/menu/add", form)
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

/**
 * 获取菜单数据
 */
async function getData() {
    const resp: any = await http.get("/menu/page", { page: pagination.page, size: pagination.size })
    menuData.value = resp.data.records
    pagination.total = resp.data.total
    pagination.page = resp.data.current
    pagination.size = resp.data.size
}

/**
 * 根据父菜单ID获取子菜单
 */
async function getMenuByParentId() {
    const resp: any = await http.get("/menu/page/parentId", { parentId: 0, page: 1, size: 999 })
    if (resp.code === 200) {
        menuOptions.value = [...menuOptions.value, ...resp.data.records]
    }
}

/**
 * 分页条当前页改变事件
 * @param val 当前页码
 */
function handleCurrentChange(val: number) {
    pagination.page = val
    getData()
}

/**
 * 分页条每页显示数量改变事件
 * @param val 每页显示数量
 */
function handleSizeChange(val: number) {
    // 根据需要实现分页大小改变时的行为
}

/**
 * 删除菜单项
 * @param row 菜单项行数据
 */
async function handleDel(row: object) {
    console.log(row)
}

/**
 * 编辑菜单项
 * @param row 菜单项行数据
 */
async function handleEdit(row: object) {
    console.log(row)
}

// 组件挂载后执行的方法
onMounted(async () => {
    await getData()
    await getMenuByParentId()
})

</script>

<template>
    <div class="menu-list-box">
        <el-button type="primary" @click="showDialog">添加菜单</el-button>
        <el-table :empty-text="'暂无数据'" :stripe="true" :data="menuData" :highlight-current-row="true" height="700px">
            <el-table-column type="expand">
                <template #default="props">
                    <el-card style="width:99%; margin: auto; padding-top: 10px;padding-bottom: 10px;">
                        <el-table :empty-text="'暂无数据'" :data="props.row.child" :stripe="true"
                            :highlight-current-row="true">
                            <el-table-column align="center" header-align="center" prop="menuId" label="编号" />
                            <el-table-column align="center" header-align="center" prop="menuName" label="标题" />
                            <el-table-column align="center" header-align="center" prop="menuPath" label="URL" />
                            <el-table-column align="center" header-align="center" prop="menuIcon" label="图标" />
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
            <el-table-column align="center" header-align="center" prop="menuId" label="编号" />
            <el-table-column align="center" header-align="center" prop="menuName" label="标题" />
            <el-table-column align="center" header-align="center" prop="menuPath" label="URL" />
            <el-table-column align="center" header-align="center" prop="menuIcon" label="图标" />
            <el-table-column align="center" header-align="center" label="操作" fixed="right" width="200">
                <template #default="scope">
                    <el-button link type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button link type="primary" @click="handleDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination :current-page="pagination.page" :page-size="pagination.size" :total="pagination.total"
            small="small" layout="prev, pager, next, jumper" @update:page-size="handleSizeChange"
            @update:current-page="handleCurrentChange" />
        <el-dialog v-model="dialog.show" :title="dialog.title" :width="dialog.width">

            <div>
                <el-form :model="form" ref="formRef" :rules="formRule" label-width="80px">

                    <el-form-item label="菜单名称" prop="menuName">
                        <el-input v-model="form.menuName"></el-input>
                    </el-form-item>
                    <el-form-item label="请求地址" prop="menuPath">
                        <el-input v-model="form.menuPath"></el-input>
                    </el-form-item>
                    <el-form-item label="父菜单" prop="parentMenuId">
                        <el-select v-model="form.parentMenuId" placeholder="请选择父菜单">
                            <el-option :label="item.menuName" :key="index" :value='item.menuId'
                                v-for="(item, index) in menuOptions" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单图标" prop="menuIcon">
                        <el-input v-model="form.menuIcon"></el-input>
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