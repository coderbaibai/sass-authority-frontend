<template>
    <div id="main">
        <div id="title">SaaS 平台</div>
        <div id="detail">
            <div class="but">
                <Lock style="width: 1.5em; height: 1.5em;position:relative;"/>
                <div class="butInner">{{userInfo.tenantName}}</div>  
            </div>
            <div class="but">
                <Key style="width: 1.5em; height: 1.5em;position:relative;"/>
                <div class="butInner">{{userInfo.roleNames[0]}}</div>  
            </div>
            <div class="but">
                <UserFilled style="width: 1.5em; height: 1.5em;position:relative;"/>
                <div class="butInner">{{userInfo.userName}}</div>  
            </div>
            <div class="but">
                <SwitchButton style="width: 1.5em; height: 1.5em;position:relative;"/>
                <div class="butInner" @click="handleExit()">退出</div>  
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Lock,UserFilled,Key,SwitchButton} from '@element-plus/icons-vue';
import { getCurrentInstance,ref,onMounted } from 'vue';
const instance = getCurrentInstance()
const userInfo  = ref({
    tenantName:"",
    roleNames:[],
    username:""
})
onMounted(() => {
    // instance.appContext.config.globalProperties.$test.get("/m1/4595220-0-default/userinfo")
    instance.appContext.config.globalProperties.$http.get("/userinfo")
    .then((res)=>{
        if(res.data.code == 0){
            userInfo.value = res.data.data;
        }
        else{
            ElMessage.error(res.data.msg)
        }
    })
    .catch(()=>{
        ElMessage.error("服务器访问错误")
    })
})
const handleExit = ()=>{
    // instance.appContext.config.globalProperties.$test.get("/m1/4595220-0-default/logout")
    instance.appContext.config.globalProperties.$http.get("/logout")
    .then((res)=>{
        if(res.data.code == 0){
            instance.appContext.config.globalProperties.$cookies.remove("SESSION")
            instance.appContext.config.globalProperties.$router.push('/login')
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
    justify-content: space-between;
    align-items: center;
    background-color: #1E54C1;
}
#title{
    min-width: 300px;
    margin-left: 10px;
    font-size: 30px;
    font-weight: 600;
    color: #D4D7DE;
}
#detail{
    display: flex;
    color: #D4D7DE;
    height: 70%;
}
.but{
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    max-width: 130px;
    margin-left: 5px;
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    position:relative;
}
.butInner{
    width: 80%;
    overflow:hidden;
    text-overflow:ellipsis;
}
</style>