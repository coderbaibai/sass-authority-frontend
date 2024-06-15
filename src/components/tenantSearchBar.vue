<template>
    <div class="tenantSearchBar">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="租户名称">
                <el-input v-model="name" placeholder="请输入租户名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="state" placeholder="请选择状态" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            state: '',
            tenants: []
        };
    },
    methods: {
        async search() {
            try {
                console.log('搜索参数:', { name: this.name, state: this.state });
                const res = await this.$test.get("/tenant/search", {
                    params: {
                        name: this.name,
                        state: this.state
                    }
                });
                console.log(res.data);
                this.tenants = res.data.data;
            } catch (error) {
                console.error('Failed', error);
            }
        }
    }
};
</script>
