<template>
    <el-sub-menu v-if="!props.item.isLeaf" :index="props.item.id">
      <template #title>
        {{ props.item.name }}
      </template>
  
      <menu-item
        v-for="(child, childIndex) in props.item.children"
        :key="childIndex"
        :item="child"
        @select="handleSelect"
      />
    </el-sub-menu>
  
    <el-menu-item v-else :index="props.item.id" @click="$emit('select',props.item.id)">
      {{ props.item.name }}
    </el-menu-item>
  </template>

<script setup lang="ts">

const emit = defineEmits(['select'])

const handleSelect = (id)=>{
    emit('select',id)
}

const props = defineProps({
  item: {
    type: Object,
    default: {},
  }
});

</script>

<style scoped>

</style>