<template>
    <div id="dashboard">
        <div id="header">
            <Header/>
        </div>
        <div id="navigate">
            <Navigate @navi="naviFunc" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Navigate from './Navigate.vue'
import { getCurrentInstance } from 'vue';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

const instance = getCurrentInstance()

const naviFunc = (targetPath)=>{
    console.log(instance.appContext.config.globalProperties.$router)
}

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
#navigate{
    height: 95%;
    width: 200px;
}
</style>