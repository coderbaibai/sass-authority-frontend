<template>
    <div id="main">
        <div id="buttons">
            <div class="buttonDiv"><AddButton :allFunctions="allFunctions" :allServices="allServices"/></div>
            <div class="buttonDiv"><el-button :icon="Refresh" round>刷新</el-button></div>
        </div>
        <div id="table">
            <el-table :data="allFunctions" default-expand-all stripe row-key="id">
                <el-table-column prop="name" show-overflow-tooltip="true" label="功能名称" width="200px" />
                <el-table-column prop="order" show-overflow-tooltip="true" label="显示顺序" width="200px" />
                <el-table-column show-overflow-tooltip="true" label="是否功能项" width="200px">
                    <template #default="scope">
                        {{ scope.row.isLeaf?'是':'否' }}
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip="true" label="服务名称" width="200px">
                    <template #default="scope">
                        {{ getServiceName(scope.row) }}
                    </template>
                </el-table-column>
                <el-table-column prop="url" show-overflow-tooltip="true" label="服务地址" width="500px" />
                <el-table-column show-overflow-tooltip="true" label="操作" width="100px" fixed="right">
                    <template #default="scope">
                        <div class="oprationDiv">
                            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">
                                修改
                            </el-button>
                            <el-button link type="danger"  size="small" @click="handleRemove(scope.row)">
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';
import AddButton from './AddButton.vue'
import EditButton from './EditButton.vue'
import RemoveButton from './RemoveButton.vue'
import { onMounted,ref,getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';

const allFunctions = ref([])
const allServices = ref([])
const instance = getCurrentInstance()

onMounted(()=>{
    instance.appContext.config.globalProperties.$test.get("/m1/4595220-0-default/service/refer")
    .then((res)=>{
        if(res.data.code == 0){
            allServices.value = res.data.data;
        }
        else{
            ElMessage.error(res.data.msg)
        }
    })
    .catch(()=>{
        ElMessage.error("服务器访问错误")
    })

    instance.appContext.config.globalProperties.$test.get("/m1/4595220-0-default/function/all")
    .then((res)=>{
        if(res.data.code == 0){
            allFunctions.value = res.data.data;
        }
        else{
            ElMessage.error(res.data.msg)
        }
    })
    .catch(()=>{
        ElMessage.error("服务器访问错误")
    })
})

const getServiceName = (target)=>{
    const res = ref("未定义")
    allServices.value.forEach((val,index)=>{
        if(val.id==target.serviceId){
            res.value = val.name
        }
    })
    return res.value;
}

const handleEdit = (target)=>{

}

const handleRemove = (target)=>{

}


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
.oprationDiv{
    width: 100%;
    display: flex;
}
</style>