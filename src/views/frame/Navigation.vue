<template>
    <div id="main">
        <el-menu :default-openeds="[0,1,2,3,4,5,6]" background-color="#FAFAFA" style="overflow-x: hidden;">
            <MenuItem v-for="(val,index) in allItems" :key="index" :item="val" @select="onSelect">
            </MenuItem>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { onMounted,getCurrentInstance,ref } from 'vue';
import MenuItem from './MenuItem.vue';
const instance = getCurrentInstance()
const allItems = ref([])

const emit = defineEmits(['navi'])

let getObjById = (objArray,id)=>{
    let res = null
    let temp = null
    try{
        objArray.forEach((val,index)=>{
            if(val.id == id){
                res = val
                throw new Error("find")
            }
            if(val.children.length!=0){
                temp = getObjById(val.children,id)
                if(temp) {
                    res = temp
                    throw new Error("find")
                }
            }
        })
    }catch(e){
        return res
    }
}

const onSelect = (id)=>{
    let target = getObjById(allItems.value,id)
    emit('navi',target.uri,target.id,target.name)
}

onMounted(() => {
    instance.appContext.config.globalProperties.$test.get("/m1/4595220-0-default/navigation")
    .then((res)=>{
        if(res.data.code == 0){
            allItems.value = res.data.data;
        }
        else{
            ElMessage.error(res.data.msg)
        }
    })
    .catch(()=>{
        ElMessage.error("服务器访问错误")
    })
})
</script>

<style scoped>
#main{
    height: 100%;
    position: relative;
    overflow-y: scroll;
}
</style>