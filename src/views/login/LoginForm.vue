<template>
    <div id="form">
        <div class="innerDiv">
            <div class="pre">租户tenant：</div>
            <el-select placeholder="请输入租户名称" v-model="info.tenantId">
                <el-option v-for="(val,index) in tenants"
                :key="val.id"
                :label="val.name"
                :value="val.id"></el-option>
            </el-select>
        </div>
        <div class="innerDiv">
            <div class="pre">用户名username：</div>
            <el-input size="large" placeholder="请输入用户名" v-model="info.username"></el-input>
        </div>
        <div class="innerDiv">
            <div class="pre">密码password：</div>
            <el-input size="large" placeholder="请输入密码" v-model="info.password" type="password"></el-input>
        </div>
        <div class="innerDiv" id="buttonDiv">
            <el-button type="primary" style="width:100%;height:40px" size="large" @click="loginFunc()">登录</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted,getCurrentInstance,ref,reactive} from "vue";
const info = reactive({
    tenantId:null,
    username:"",
    password:"",
})
const instance = getCurrentInstance();
const tenants = ref([])

const loginFunc = ()=>{
    if(info.tenantId===null){
        ElMessage.error("请选择租户")
        return
    }
    if(info.username===""){
        ElMessage.error("请填写用户名")
        return
    }
    if(info.password===""){
        ElMessage.error("请填写密码")
        return
    }
    instance.appContext.config.globalProperties.$test.post("/m1/4595220-0-default/login",info)
    .then((res)=>{
        if(res.data.code == 0){
            instance.appContext.config.globalProperties.$router.push("/dashboard");
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
    instance.appContext.config.globalProperties.$test.get("/m1/4595220-0-default/tenants")
    .then((res)=>{
        if(res.data.code == 0){
            tenants.value = res.data.data;
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
#form{
    display: flex;
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    flex-direction: column;
}
.innerDiv{
    width: 90%;
    margin-left: 20px;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
}
.pre{
    color: #303133;
    line-height: 40px;
}
#buttonDiv{
    margin-top: 30px;
    display: flex;
    flex-direction: row;
}
</style>