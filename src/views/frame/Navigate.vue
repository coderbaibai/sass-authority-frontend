<template>
    <div id="main">
        <el-menu :default-openeds="[0,1,2,3,4,5,6]" background-color="#FAFAFA">
            <el-sub-menu v-for="(pvalue,pindex) in allItems" :index="pindex">
                <template #title>
                    <span>{{pvalue.node}}</span>
                </template>
                <el-menu-item v-for="(cvalue,cindex) in pvalue.children" 
                :index="''+pindex+cindex" 
                @click="handleSelect(pindex,cindex)"
                >
                    {{cvalue.leafname}}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup lang="ts">
import { onMounted,getCurrentInstance,ref } from 'vue';
const instance = getCurrentInstance()
const allItems = ref([])
const curParentIndex = ref(0)
const curChildIndex = ref(0)

const emit = defineEmits(['navi'])

const handleOpen = (index)=>{
    curParentIndex.value = index;
}

const handleSelect = (pindex,cindex)=>{
    curParentIndex.value = pindex
    curChildIndex.value = cindex;
    emit("navi",allItems.value[pindex].children[cindex].uri)
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