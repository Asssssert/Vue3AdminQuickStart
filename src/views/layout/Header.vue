<script lang="ts" setup>
import {ref} from 'vue'
const realname = ref("Admin")

</script>
<template>
    <div class="e-header">
        <div class="left">
            <span class="header-title-txt">后台管理系统</span>
        </div>
        <div class="right">
            <el-dropdown size="large">
                <span class="el-dropdown-link">
                    <span class="el-dropdown-link-name">
                        {{realname}}
                    </span>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                    </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item >个人设置</el-dropdown-item>
                        <el-dropdown-item >退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<style scoped>
.header-title-txt{
    font-size: 23px;
    font-weight: bold;
    color: white;

}
.e-header{
    width: 95%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.el-dropdown-link{
    display: flex;
    font-size: 20px;
    justify-content: center;
    color: white;

}

</style>
