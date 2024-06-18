<template>
  <div id="main">
    <router-view>
    </router-view>
  </div>
</template>
<script setup lang="ts">
import { onMounted,getCurrentInstance } from "vue";

const instance = getCurrentInstance();

onMounted(()=>{
  if(!instance?.appContext.config.globalProperties.$cookies.get("SESSION")){
    instance?.appContext.config.globalProperties.$router.push("/login")
  }
  else{
    instance?.appContext.config.globalProperties.$router.push("/dashboard")
  }
})
</script>
<style scoped>
#main{
  position:absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>