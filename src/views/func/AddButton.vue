<template>
    <div id="main">
        <el-button type="primary" :icon="Plus" plain>增加</el-button>
    </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

</script>

<style scoped>
#main{
    height: 100%;
    width: 100%;
}
</style>