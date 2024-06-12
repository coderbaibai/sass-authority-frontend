<template>
    <div>
		<el-form-item>
            <el-button type="primary" @click="openAdd">添加</el-button>
        </el-form-item>
        <el-dialog v-model="addDialogVisible" title="增加租户">
			<el-form :model="newTenant">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="租户编码">
							<el-input v-model="newTenant.code" style="width: 80%;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="租户名称">
							<el-input v-model="newTenant.name" style="width: 80%;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="租户类型">
							<el-select v-model="newTenant.type" placeholder="请选择类型">
								<el-option label="A"></el-option>
								<el-option label="B"></el-option>
								<el-option label="C"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="租户状态">
							<el-select v-model="newTenant.state" placeholder="请选择状态">
								<el-option label="启用" value="enabled"></el-option>
								<el-option label="禁用" value="disabled"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="邮箱">
							<el-input v-model="newTenant.email" style="width: 80%;"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="电话">
							<el-input v-model="newTenant.telephone" style="width: 80%;"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="地址">
					<el-input v-model="newTenant.address" style="width: 100%;"></el-input>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="newTenant.description" style="width: 100%;"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="clear">清空</el-button>
				<el-button type="primary" @click="addTenant">保存</el-button>
			</div>
    	</el-dialog>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
		return {
			addDialogVisible: false,
			newTenant: {
				code: '',
				name: '',
				type: null,
				state: null,
				email: '',
				telephone: '',
				address: '',
				description: ''
			}
    	};
  	},
    methods: {
		openAdd() {
			this.addDialogVisible = true;
		},
		clear() {
			this.newTenant = {
				code: '',
				name: '',
				type: null,
				state: null,
				email: '',
				telephone: '',
				address: '',
				description: ''
			};
		},
		async addTenant() {
			try {
				const tenantData = JSON.parse(JSON.stringify(this.newTenant));
				const response = await axios.post('http://127.0.0.1:4523/m1/4595220-4244770-default/tenant/add', tenantData, {
				headers: {
					'Content-Type': 'application/json'
				}
				});
				if (response.data.code==0) {
					this.$message({
						type: 'success',
						message: '添加成功'
					});
					this.$emit('tenant-added');
					this.addDialogVisible = false;
					this.clear();
				} else {
					this.$message.error('添加失败');
				}
			} catch (error) {
				console.error('添加出错:', error);
				this.$message.error('添加出错，请重试');
			}
		}
    }
}
</script>

<style scoped>
.dialog-footer {
  text-align: center;
}
</style>