<template>
    <div id="dashboard">
        <div id="header">
            <Header/>
        </div>
        <div id="mainWindow">
            <div id="navigate">
                <Navigate @navi="naviFunc" />
            </div>
            <div id="pageWindow" v-if="curPages.length!=0">
                <el-tabs
                    id="tabs"
                    v-model="curIndex"
                    type="border-card"
                    closable
                    @tab-remove="handleTabsRemove"
                >
                    <el-tab-pane
                    class="panes"
                    v-for="(val,index) in curPages"
                        :key="index"
                        :label="val.name"
                        :name="val.gindex"
                    >
                    <div class="innerPanes">
                        <RouterView></RouterView>
                    </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Navigate from './Navigate.vue'
import { getCurrentInstance,ref,watch} from 'vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const instance = getCurrentInstance()

const AllPages = ref([])

const dashboardIndex = ref(0)
instance.appContext.config.globalProperties.$router.options.routes.forEach((val,index)=>{
    if(val.name=='dashboard') dashboardIndex.value = index;
})

instance.appContext.config.globalProperties.$router.options.routes[dashboardIndex.value].children?.forEach((val,index)=>{
    AllPages.value.push({
        name: val.cname,
        path: val.path,
        gindex: index,
    })
})

const curPages = ref([])

const curIndex = ref(0);

const errorPage = ref({});

AllPages.value.forEach(element => {
    if(element.path=='/error'){
        errorPage.value = element
    }
});

const naviFunc = (targetPath)=>{
    let isSuccess = false;
    try{
        AllPages.value.forEach((val,index)=>{
            // 如果存在这个路径
            if(val.path == targetPath){
                curPages.value.forEach((cVal,cIndex)=>{
                    // 如果在当前页面
                    if(cVal.path == targetPath){
                        curIndex.value = cVal.gindex
                        throw new Error("find");
                    }
                })
                // 如果不在当前页面
               curPages.value.push(val)
               curIndex.value = val.gindex
               isSuccess = true;
            }
        })
        if(isSuccess) return;
        // 不存在这个路径，导航到ErrorPage
        curPages.value.forEach((cVal,cIndex)=>{
            // 如果在当前页面
            if(cVal.path =="/error"){
                curIndex.value = cVal.gindex
                throw new Error("find");
            }
        })
        // 如果不在当前页面
        curPages.value.push(errorPage.value)
        curIndex.value = errorPage.value.gindex
    }catch(e){
        console.log(e)
    }
}

const handleTabsRemove =(index)=>{
    try{
        curPages.value.forEach((val,ind)=>{
            if(val.gindex == index){
                curPages.value.splice(ind,1)
                curIndex.value = curPages.value[ind<=curPages.value.length-1?ind:curPages.value.length-1].gindex
                throw new Error("close")
            }
        })
    }catch(e){
        console.log(e)
    }
}

watch(curIndex ,(newVal,oldVal)=>{
    try{
        curPages.value.forEach((val,index)=>{
            if(val.gindex==curIndex.value){
                instance?.appContext.config.globalProperties.$router.push(val.path)
                throw new Error("route")
            }
        })
    }catch(e){
        console.log(e)
    }
})

</script>

<style scoped>
#dashboard{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
#header{
    width: 100%;
    height: 5%;
}
#mainWindow{
    height: 95%;
    width: 100%;
    display: flex;
}
#navigate{
    height: 100%;
    width: 12%;
    margin-left: 10px;
}
#pageWindow{
    height: 100%;
    flex-grow: 1;
    padding-top: 10px;
    position: relative;
}
#tabs{
    height: 100%;
    width: 100%;
}
.innerPanes{
    position: fixed;
    width: 85%;
    height: 88%;
}
</style>