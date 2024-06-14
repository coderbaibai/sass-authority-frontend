<template>
    <el-button type="danger" @click="checkDelete" :disabled="!tenant">删除</el-button>
  </template>
  
<script>
import axios from 'axios';
export default {
    props: {
        tenant: {
            type: Object,
            required: false
        }
    },
    methods: {
        async checkDelete() {
            if (!this.tenant) {
                this.$message.error('请先选择一个租户');
                return;
            }
            try {
                // const res = await this.$test.get("/m1/4595220-4244770-default/tenant/business", {
                const res = await this.$http.get("/tenant/business", {
                    params: {
                        tenantId: this.tenant.id
                    }
                });
                if (res.data.code === 0) {
                    if (res.data.data) {
                        this.$message({
                            type: 'error',
                            message: '该租户有业务数据，无法删除'
                        });
                    } else {
                        await this.deleteTenant();
                    }
                } else {
                    this.$message.error('请重试');
                }
            } catch (error) {
                this.$message.error('检查出错，请重试');
            }
        },
        async deleteTenant() {
            // this.$test.delete("/m1/4595220-4244770-default/tenant/delete", {
            this.$http.delete("/tenant/delete", {
                params: {
                    tenantId: this.tenant.id
                }
            })
            .then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                } else {
                    this.$message.error('删除失败，请重试');
                }
            })
            .catch((error) => {
                this.$message.error('删除出错，请重试');
            });
        }
    }
};
</script>
  