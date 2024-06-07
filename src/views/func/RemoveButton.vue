<template>
    <div id="main">
        <el-button type="danger" :icon="DeleteFilled" plain>删除</el-button>
    </div>
</template>

<script setup lang="ts">
import { DeleteFilled } from '@element-plus/icons-vue';

</script>

<style scoped>
#main{
    height: 100%;
    width: 100%;
}
</style>