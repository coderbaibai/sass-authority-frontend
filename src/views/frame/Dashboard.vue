<template>
    <div id="dashboard">
        <div id="header">
            <Header/>
        </div>
        <div id="mainWindow">
            <div id="navigate">
                <Navigation @navi="naviFunc"/>
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
                    v-for="(val,index) in curPages"
                        :key="index"
                        :label="val.name"
                        :name="val.id"
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
import Navigation from './Navigation.vue'
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

const naviFunc = (targetPath,id,name)=>{
    try{
        curPages.value.forEach((cVal,cIndex)=>{
            // 如果在当前页面
            if(cVal.id == id){
                curIndex.value = cVal.id
                throw new Error("find");
            }
        })
       // 如果不在当前页面
        let target = errorPage.value;

        AllPages.value.forEach((val,index)=>{
            // 如果存在这个路径
            if(val.path == targetPath){
                target = val;
            }
        })
        // 不存在这个路径，导航到ErrorPage
        let temp = JSON.parse(JSON.stringify(target));
        temp.name = name
        temp.id = id
        curPages.value.push(temp)
        curIndex.value = temp.id
    }catch(e){
        console.log(e)
    }
}

const handleTabsRemove =(index)=>{
    try{
        curPages.value.forEach((val,ind)=>{
            if(val.id == index){
                curPages.value.splice(ind,1)
                curIndex.value = curPages.value[ind<=curPages.value.length-1?ind:curPages.value.length-1].id
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
            if(val.id==curIndex.value){
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
    position: relative;
    background-color: #fff;
    height: 100%;
    width: 12%;
}
#pageWindow{
    height: 100%;
    flex-grow: 1;
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
    overflow-y: scroll;
}
</style>