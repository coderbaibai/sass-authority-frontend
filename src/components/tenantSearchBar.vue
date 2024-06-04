<template>
    <div class="tenantSearchBar">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="租户名称">
                <el-input v-model="tenantName" placeholder="请输入租户名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="status" placeholder="请选择状态" style="width: 200px;">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="enabled"></el-option>
                    <el-option label="禁用" value="disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
	</div>
</template>

<script>

</script>
