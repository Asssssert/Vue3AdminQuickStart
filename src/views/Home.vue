<script lang="ts" setup>
import Aside from './layout/Aside.vue'
import Footer from './layout/Footer.vue'
import Main from './layout/Main.vue'
import Header from './layout/Header.vue'
</script>
<template>
    <div class="common-layout">
        <el-container class="e-container">
            <el-header height="80px" class="e-header">
                <Header/>
            </el-header>
            <el-container>
                <el-aside width="200px" class="e-aside">
                    <Aside/>
                </el-aside>
                <el-container>
                    <el-main class="e-main">
                        <Main/>
                    </el-main>
                    <el-footer class="e-footer">
                        <Footer/>
                    </el-footer>
                </el-container>
            </el-container>
            
        </el-container>
    </div>
</template>
<style scoped>

.e-aside{
    display: flex;
    flex-direction: column;
}
.e-container{
    height: 100vh;
}
.e-header{
    background-color: #545c64;
}
.e-footer{
    /* background-color: #e0dede; */
}

</style>
