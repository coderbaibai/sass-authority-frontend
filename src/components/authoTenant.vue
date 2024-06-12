<template>
	<el-form-item>
	  	<el-button type="primary" @click="openAutho" :disabled="!tenant">授权</el-button>
	</el-form-item>
	<el-dialog v-model="authoDialogVisible" title="租户功能授权">
		<div class="authoTenantData">
			<el-row :gutter="20">
				<el-col :span="12">
					<el-card class="allFunction">
					<span>功能列表</span>
					<el-tree
							ref="functionTree"
							:data="functionList"
							:props="defaultProps"
							show-checkbox
							node-key="id"
							@check-change="handleCheckChange"
							:default-checked-keys="authorizedFunctionIds">
					</el-tree>
					</el-card>
				</el-col>
				<el-col :span="12">
					<el-card class="authorizedFunction">
					<span>已授权功能</span>
					<el-tree
						:data="authorizedFunctions"
						:props="defaultProps"
						node-key="id">
					</el-tree>
					</el-card>
				</el-col>
			</el-row>
			<div slot="footer" class="dialog-footer">
			<el-button @click="clear">清空</el-button>
			<el-button type="primary" @click="saveAutho">授权</el-button>
			</div>
		</div>
	</el-dialog>
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
	data() {
	  return {
		authoDialogVisible: false,
		functionList: [	],
		authorizedFunctions: [],
		defaultProps: {
		  children: 'children',
		  label: 'name'
		}
	  };
	},
	watch: {
		tenant: {
			immediate: true,
			handler(newVal) {
				if (newVal) {
					this.loadAllFunctions();
				}
			}
		}
	},
	computed: {
		authorizedFunctionIds() {
			return this.getAuthorizedFunctionIds(this.authorizedFunctions);
		}
	},
	methods: {
		openAutho() {
			if (this.tenant) {
				this.authoDialogVisible = true;
			} else {
				this.$message.error('请先选择一个租户');
			}
	  	},
		clear() {
			this.authorizedFunctions = [];
			this.$refs.functionTree.setCheckedKeys([]);
		},
		async loadAllFunctions() {
			try {
				const response = await axios.get('http://127.0.0.1:4523/m1/4595220-4244770-default/function/all');
					if (response.data.code === 0) {
					this.functionList = response.data.data;
				} else {
					this.$message.error('加载全部功能失败');
				}
			} catch (error) {
				console.error('加载全部功能出错:', error);
				this.$message.error('加载全部功能出错，请重试');
			}
		},
		async loadAuthorizedFunctions() {
			if (!this.tenant) return;
			try {
				const response = await axios.get(`http://127.0.0.1:4523/m1/4595220-4244770-default/tenant/functions`);
				if (response.data.code === 0) {
					this.authorizedFunctions = response.data.data;
				} else {
					this.$message.error('加载已授权功能失败');
				}
			} catch (error) {
				console.error('加载已授权功能出错:', error);
				this.$message.error('加载已授权功能出错，请重试');
			}
		},
		getAuthorizedFunctionIds(functions) {
			let ids = [];
			functions.forEach(func => {
				ids.push(func.id);
				if (func.children && func.children.length > 0) {
					ids = ids.concat(this.getAuthorizedFunctionIds(func.children));
				}
			});
			return ids;
		},
		handleCheckChange(node, checked) {
			if (checked) {
				this.addAuthorizedFunction(node);
			} else {
				this.removeAuthorizedFunction(node);
			}
		},
		addAuthorizedFunction(node) {
			this.authorizedFunctions.push(node);
		},
		removeAuthorizedFunction(node) {
			this.authorizedFunctions = this.authorizedFunctions.filter(func => func.id !== node.id);
		},
		async saveAutho() {
			try {
				const response = await axios.post(`http://127.0.0.1:4523/m1/4595220-4244770-default/tenant/function/distribute`, {
					tenantId: this.tenant.id,
					functions: this.authorizedFunctions
				});
				if (response.data.code === 0) {
					this.$message({
						type: 'success',
						message: '授权成功'
					});
					this.$emit('tenant-authoed');
					this.authoDialogVisible = false;
				} else {
					this.$message.error('授权失败，请重试');
				}
			} catch (error) {
				console.error('授权出错:', error);
				this.$message.error('授权出错，请重试');
			}
		}
	}
};
</script>
  
<style scoped>
.dialog-footer {
	text-align: center;
}
.authoTenantData {
	max-height: 300px;
	overflow-y: auto;
	overflow-x: hidden;
}
</style>
  