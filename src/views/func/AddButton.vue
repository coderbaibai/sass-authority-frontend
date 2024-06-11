<template>
    <div id="main">
        <el-button type="primary" :icon="Plus" @click="isOpen = true">增加</el-button>
        <el-dialog title="新增功能" v-model="isOpen" @open="createNewFunc">
            <el-form label-width="auto" >
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="功能名称">
                            <el-input placeholder="功能名称" v-model="newFunc.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="上级功能">
                            <el-cascader
                            placeholder="选择上级功能"
                            :show-all-levels="false"
                            v-model="newFunc.parentId"
                            :options="wrapFunctions"
                            :props="{label:`name`,value:`id`,checkStrictly: true,disabled:`isLeaf`}"
                            />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="显示顺序">
                            <el-input placeholder="显示顺序" v-model="newFunc.order"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2">
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="是否功能项">
                            <el-switch v-model="newFunc.isLeaf"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="服务名称">
                    <el-select v-model="newFunc.serviceId" placeholder="选择对应服务">
                        <el-option v-for="(val,index) in props.allServices"
                        :label="val.name"
                        :value="val.id"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="服务地址">
                    <el-input v-model="serviceURL" disabled></el-input>
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
import { Plus } from '@element-plus/icons-vue';
import { isLeaf } from 'element-plus/es/utils/index.mjs';
import { ref,watch,getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
  allFunctions: {
    type: Array,
    default: [],
  },
  allServices: {
    type: Array,
    default: [],
  },
});

const isOpen = ref(false)

const newFunc = ref({
  name: "",
  parentId: null,
  isLeaf: false,
  order: null,
  url: "",
  serviceId: null
})

const wrapFunctions = ref([])



const serviceURL = ref("")

const createNewFunc = ()=>{
    wrapFunctions.value[0] = {
        name: "顶层功能",
        id: 0,
        children: JSON.parse(JSON.stringify(props.allFunctions)),
        isLeaf:false
    }
    newFunc.value = {
        name: "",
        parentId: null,
        isLeaf: false,
        order: null,
        url: "",
        serviceId: null
    }
    watch(newFunc.value ,(newVal,oldVal)=>{
        props.allServices.forEach((val,index)=>{
            if(val.id==newVal.serviceId) serviceURL.value = val.url
        }),{ deep: true }
    })
    serviceURL.value = ""
}

const instance = getCurrentInstance()

const onSave = ()=>{
    if(!newFunc.value.parentId){
        ElMessage.error("请选择上级功能")
        return
    }
    newFunc.value.parentId = newFunc.value.parentId[newFunc.value.parentId.length-1]
    instance.appContext.config.globalProperties.$test.post("/m1/4595220-0-default/function/add",newFunc.value)
    .then((res)=>{
        if(res.data.code == 0){
            isOpen.value = false;
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
    height: 100%;
    width: 100%;
}
</style>