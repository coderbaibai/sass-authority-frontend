<template>
    <div>
        <el-form-item>
            <el-button type="primary" @click="openInit" :disabled="!tenant">初始化</el-button>
        </el-form-item>
        <el-dialog v-model="initDialogVisible" title="初始化">
            <el-form :model="initTenant">
                <el-form-item label="初始角色名">
                    <el-input v-model="initTenant.roleName" style="width: 100%;"></el-input>
                </el-form-item>
                <el-form-item label="初始账号">
                    <el-input v-model="initTenant.account" style="width: 100%;"></el-input>
                </el-form-item>
                <el-form-item label="初始用户名">
                    <el-input v-model="initTenant.userName" style="width: 100%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clear">清空</el-button>
                <el-button type="primary" @click="initTenantSave">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        tenant: {
            type: Object,
            required: false,
            default: null
        }
    },
    data() {
        return {
            initDialogVisible: false,
            initTenant: this.getInitialTenantData()
        };
    },
    watch: {
        tenant(newTenant) {
            if (newTenant) {
                this.initTenant.tenantId = newTenant.id;
            }
        }
    },
    methods: {
        getInitialTenantData() {
            return {
                roleName: '',
                account: '',
                userName: '',
                tenantId: null
            };
        },
        openInit() {
            if (this.tenant) {
                this.initTenant = this.getInitialTenantData();
                this.initTenant.tenantId = this.tenant.id;
                this.initDialogVisible = true;
            } else {
                this.$message.error('请先选择一个租户');
            }
        },
        clear() {
            this.initTenant = this.getInitialTenantData();
        },
        async initTenantSave() {
            try {
                const payload = {
                    roleName: this.initTenant.roleName,
                    account: this.initTenant.account,
                    userName: this.initTenant.userName,
                    tenantId: this.initTenant.tenantId
                };
                const res = await this.$http.post('/tenant/initialize', payload, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (res.data.code === 0) {
                    this.$message.success('初始化成功');
                    this.initDialogVisible = false;
                    this.clear();
                } else {
                    this.$message.error('初始化失败');
                }
            } catch (error) {
                this.$message.error('初始化出错');
            }
        }
    }
};
</script>

<style scoped>
.dialog-footer {
    text-align: center;
}
</style>
