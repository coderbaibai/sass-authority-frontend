<template>
    <el-table :data="tenants" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="code" label="租户编码" width="80"></el-table-column>
      <el-table-column prop="name" label="租户名称" width="100"></el-table-column>
      <el-table-column prop="state" label="租户状态" :formatter="formatState" width="80"></el-table-column>
      <el-table-column prop="type" label="租户类型" :formatter="formatType" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="150"></el-table-column>
      <el-table-column prop="telephone" label="电话" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="250"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
    </el-table>
  </template>
  
  <script>
  export default {
    props: {
      tenants: {
        type: Array,
        required: true
      }
    },
    methods: {
      handleSelectionChange(val) {
        if (val.length > 1) {
          this.$emit('selected_tenant', null);
          this.$message.error('只能选中一个租户');
        } else {
          this.$emit('selected_tenant', val[0] || null);
        }
      },
      formatState(row, column, cellValue) {
        return cellValue === 1 ? '启用' : '禁用';
      },
      formatType(row, column, cellValue) {
        return cellValue === 1 ? '平台用户' : '普通用户';
      }
    }
  };
  </script>
  