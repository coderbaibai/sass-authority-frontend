<template>
    <div id="main">
        <el-button type="primary" :icon="EditPen" plain>修改</el-button>
    </div>
</template>

<script setup lang="ts">
import {EditPen } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

</script>

<style scoped>
#main{
    height: 100%;
    width: 100%;
}
</style>