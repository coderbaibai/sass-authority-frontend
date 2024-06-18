<template>
    <el-form-item>
        <el-button type="primary" @click="openInit">初始化</el-button>
    </el-form-item>
    <el-dialog v-model="initDialogVisible" title="初始化">
        <el-form :model="initTenant">
            <el-form-item label="租户ID">
                <el-input v-model="initTenant.id" style="width: 100%;"></el-input>
            </el-form-item>
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
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            initDialogVisible: false,
            initTenant: {
                id: '',
                roleName: '',
                account: '',
                userName: ''
            }
        };
    },
    methods: {
        openInit() {
            this.initDialogVisible = true;
        },
        clear() {
            this.initTenant = {
                id: '',
                roleName: '',
                account: '',
                userName: ''
            };
        },
        async initTenantSave() {
			const tenantData = JSON.parse(JSON.stringify(this.initTenant));
			this.$http.post("/tenant/initialize", tenantData, {
				headers: {
				'Content-Type': 'application/json'
			}})
			.then((res) => {
				if (res.data.code === 0) {
					this.$message({
						type: 'success',
						message: '初始化成功'
					});
					this.initDialogVisible = false;
					this.clear();
				} else {
					this.$message.error('初始化失败');
				}
			})
			.catch((error) => {
				this.$message.error('初始化出错，请重试');
			});
		}
    }
};
  </script>
  
  <style scoped>
  .dialog-footer {
    text-align: center;
  }
  </style>
  