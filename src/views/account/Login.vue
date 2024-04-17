<script lang="ts" setup>

import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const form = reactive({
    username: '',
    password: '',
    rememberMe: false,
})

const loginRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
};

const onSubmit = () => {
    router.push({
        name: 'home'
    })
}

</script>

<template>
    <div class="login-container">
        <el-card>
            <template #header>
                <div class="title">登录</div>
            </template>
            <el-form :model="form" ref="loginForm" :rules="loginRules" label-position="left" label-width="80px"
                style="width: 400px; margin: 10px auto;">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" show-password />
                </el-form-item>
                <el-form-item label="记住我">
                    <el-checkbox v-model="form.rememberMe"></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <!-- <el-col :span="12">
                        <el-button type="primary" @click="onSubmit" width="100">注册</el-button>
                    </el-col> -->
                    <el-col :span="12">
                        <el-button type="primary" @click="onSubmit">登录</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
}
</style>