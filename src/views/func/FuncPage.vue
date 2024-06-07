<template>
    <div id="main">
        <div id="buttons">
            <div class="buttonDiv"><AddButton/></div>
            <div class="buttonDiv"><EditButton/></div>
            <div class="buttonDiv"><RemoveButton/></div>
            <div class="buttonDiv"><el-button :icon="Refresh" round>刷新</el-button></div>
        </div>
        <div id="table">
            <el-table>

            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';
import AddButton from './AddButton.vue'
import EditButton from './EditButton.vue'
import RemoveButton from './RemoveButton.vue'
import { onMounted,ref } from 'vue';

const allFunctions = ref([])

onMounted(()=>{
    allFunctions
})

</script>

<style scoped>
#main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
#buttons{
    display: flex;
    height: 5%;
    width: 100%;
}
.buttonDiv{
    height: 100%;
    margin-right: 15px;
    display: flex;
}
#table{
    height: 95%;
    width: 100%;
}
</style>