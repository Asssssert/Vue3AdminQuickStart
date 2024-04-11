<script lang="ts" setup>
import { reactive,ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMenu } from '@/assets/menu'

const route = useRoute()

const menu  = reactive(getMenu())


</script>


<template>
    <div class="e-aside-box">
        <el-menu 
            router>
            <el-sub-menu  :index="item.path" v-for="(item,index) in menu" :key="index">
                <template #title>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item :index="i.path" v-for="(i,index) in item.children" :key="index">
                    <span>{{i.title}}</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<style  scoped>
    .e-aside-box{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .e-aside-box > ul{
        flex-grow: 1;
    }
</style>
