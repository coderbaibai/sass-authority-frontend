<template>
    <el-form-item>
        <el-button type="primary" @click="refresh">刷新</el-button>
    </el-form-item>
</template>  

<script>
export default {
    methods: {
        refresh() {
            this.$emit('refresh-tenant');
        }
    }
};
</script>