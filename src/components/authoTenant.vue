<template>
	<el-form-item>
	  	<el-button type="primary" @click="openAutho" :disabled="!tenant">授权</el-button>
	</el-form-item>
	<el-dialog v-model="authoDialogVisible" title="租户功能授权" @close="clear">
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
			functionList: [],
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
				this.loadAuthorizedFunctions();
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
				this.loadAllFunctions();
				this.loadAuthorizedFunctions();
			} else {
				this.$message.error('请先选择一个租户');
			}
		},
		clear() {
			this.authorizedFunctions = [];
			if (this.$refs.functionTree) {
				this.$refs.functionTree.setCheckedKeys([]);
			}
		},
		async loadAllFunctions() {
			try {
				const res = await this.$http.get('/function/all');
			if (res.data.code === 0) {
				this.functionList = res.data.data;
			} else {
				this.$message.error('加载全部功能失败');
			}
			} catch (error) {
				this.$message.error('加载全部功能出错');
			}
		},
		async loadAuthorizedFunctions() {
			if (!this.tenant) return;
			try {
				const res = await this.$http.get('/tenant/functions', {
					params: {
					tenantId: this.tenant.id
					}
				});
				if (res.data.code === 0) {
					this.authorizedFunctions = res.data.data;
				} else {
					this.$message.error('加载已授权功能失败');
				}
			} catch (error) {
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
			console.log(ids);
			return ids;
		},
		async saveAutho() {
			try {
				const res = await this.$http.post('/tenant/function/distribute', {
					tenantId: this.tenant.id,
					functionIds: this.authorizedFunctionIds
				});
				console.log(res);
				if (res.data.code === 0) {
					this.$message({
						type: 'success',
						message: '授权成功'
					});
					this.$emit('tenant-authoed');
					this.authoDialogVisible = false;
					this.authorizedFunctions = [];
				} else {
					this.$message.error('授权失败，请重试');
				}
				} catch (error) {
					this.$message.error('授权出错，请重试');
				}
		},
		handleCheckChange(node, checked) {
			if (checked) {
				this.addAuthorizedFunction(node);
			} else {
				this.removeAuthorizedFunction(node);
				this.removeChildren(node);
			}
		},
		removeChildren(node) {
			if (node.children && node.children.length > 0) {
			node.children.forEach(child => {
				const index = this.authorizedFunctions.findIndex(func => func.id === child.id);
				if (index !== -1) {
					this.authorizedFunctions.splice(index, 1);
				}
				this.removeChildren(child);
			});
			}
		},
		addAuthorizedFunction(node) {
			if (!this.authorizedFunctions.some(func => func.id === node.id)) {
				const parentNode = this.findParentNode(node);
			if (parentNode) {
				const existingNode = this.findNodeInAuthorized(parentNode.id);
				if (existingNode) {
					return;
				}
			}
			this.authorizedFunctions.push(node);
			this.removeChildren(node);
			}
		},
		removeAuthorizedFunction(node) {
			this.authorizedFunctions = this.authorizedFunctions.filter(func => func.id !== node.id);
		},
		
		findParentNode(node) {
			const findNodeRecursively = (currentNode, targetNode) => {
			if (!currentNode.children) return null;
			for (const child of currentNode.children) {
				if (child.id === targetNode.id) {
					return currentNode;
				}
				const result = findNodeRecursively(child, targetNode);
				if (result) {
					return result;
				}
			}
			return null;
			};
			for (const rootNode of this.functionList) {
				const result = findNodeRecursively(rootNode, node);
				if (result) {
					return result;
				}
			}
			return null;
		},
		findNodeInAuthorized(id) {
			const findNodeRecursively = (nodes, id) => {
			for (const node of nodes) {
				if (node.id === id) {
					return node;
				}
				if (node.children) {
					const result = findNodeRecursively(node.children, id);
				if (result) {
					return result;
				}
				}
			}
			return null;
			};
			return findNodeRecursively(this.authorizedFunctions, id);
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
  