<template>
    <div id="main">
        <div id="buttons">
            <div class="buttonDiv"><AddButton :allFunctions="allFunctions" :allServices="allServices"/></div>
            <div class="buttonDiv"><el-button :icon="Refresh" round @click="getAllFunctions">刷新</el-button></div>
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
                            <el-popconfirm :title="'确定要删除“'+scope.row.name+'”功能吗？'" @confirm="handleRemove(scope.row)">
                                <template #reference>
                                    <el-button link type="danger"  size="small">
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="新增功能" v-model="isOpen" @open="createNewFunc">
            <el-form label-width="auto" >
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="功能名称">
                            <el-input placeholder="功能名称" v-model="curFunc.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="上级功能">
                            <el-cascader
                            placeholder="选择上级功能"
                            :show-all-levels="false"
                            v-model="curFunc.parentId"
                            :options="wrapFunctions"
                            :props="{label:`name`,value:`id`,checkStrictly: true,disabled:`isLeaf`}"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="显示顺序">
                            <el-input placeholder="显示顺序" v-model="curFunc.order"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否功能项">
                            <el-switch v-model="curFunc.isLeaf"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="服务名称">
                    <el-select v-model="curFunc.serviceId" placeholder="选择对应服务">
                        <el-option v-for="(val,index) in allServices"
                        :label="val.name"
                        :value="val.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务地址">
                    <el-input v-model="curFunc.url" disabled></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="onSave()" type="primary">保存</el-button >
                <el-button @click="isOpen = false">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue';
import AddButton from './AddButton.vue'
import EditButton from './EditButton.vue'
import RemoveButton from './RemoveButton.vue'
import { onMounted,ref,getCurrentInstance,watch } from 'vue';
import { ElMessage } from 'element-plus';

const allFunctions = ref([])
const allServices = ref([])
const wrapFunctions = ref([])

const isOpen = ref(false)
const curFunc = ref({})

const instance = getCurrentInstance()

const getAllFunctions = ()=>{
    instance.appContext.config.globalProperties.$test.get("/m1/4595220-0-default/function/all")
    .then((res)=>{
        if(res.data.code == 0){
            allFunctions.value = res.data.data;
            wrapFunctions.value[0] = {
                name: "顶层功能",
                id: 0,
                children: JSON.parse(JSON.stringify(allFunctions.value)),
                isLeaf:false
            }
        }
        else{
            ElMessage.error(res.data.msg)
        }
    })
    .catch(()=>{
        ElMessage.error("服务器访问错误")
    })
}

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
    getAllFunctions()
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

const getAllParentId = (obj,id)=>{
    let res = []
    let temp = []
    try{
        obj.forEach((val,index)=>{
            if(val.id == id){
                res[0] = val.id
                throw new Error("find")
            }
            if(val.children.length!=0){
                temp = getAllParentId(val.children,id)
                console.log("temp:",temp)
                if(temp.length) {
                    res[0] = val.id
                    res = res.concat(temp)
                    console.log("res:",res)
                    throw new Error("find")
                }
            }
        })
    }catch(e){
        return res
    }
}

const handleEdit = (target)=>{
    console.log("edit:",target)
    curFunc.value = JSON.parse(JSON.stringify(target))
    curFunc.value.parentId = getAllParentId(wrapFunctions.value,curFunc.value.parentId)
    watch(curFunc.value ,(newVal,oldVal)=>{
        allServices.value.forEach((val,index)=>{
            if(val.id==newVal.serviceId) curFunc.value.url = val.url
        }),{ deep: true }
    })
    isOpen.value = true;
}

const onSave = ()=>{
    if(!curFunc.value.parentId){
        ElMessage.error("请选择上级功能")
        return
    }
    curFunc.value.parentId = curFunc.value.parentId[curFunc.value.parentId.length-1]
    instance.appContext.config.globalProperties.$test.put("/m1/4595220-0-default/function/update",curFunc.value)
    .then((res)=>{
        if(res.data.code == 0){
            isOpen.value = false;
            getAllFunctions()
        }
        else{
            ElMessage.error(res.data.msg)
        }
    })
    .catch(()=>{
        ElMessage.error("服务器访问错误")
    })
}

const handleRemove = (target)=>{
    instance.appContext.config.globalProperties.$test.delete(`/m1/4595220-0-default/function/delete/`+target.id)
    .then((res)=>{
        if(res.data.code == 0){
            getAllFunctions()
        }
        else{
            ElMessage.error(res.data.msg)
        }
    })
    .catch(()=>{
        ElMessage.error("服务器访问错误")
    })
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