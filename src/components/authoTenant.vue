<template>
	<el-form-item>
        <el-button type="primary" @click="openAutho">授权</el-button>
    </el-form-item>
    <el-dialog v-model="authoDialogVisible" title="租户功能授权">
		<div class="initDialogContent">
			<el-row :gutter="20">
      			<el-col :span="12">
        			<el-card class="allFunction">
            			<span>功能列表</span>
						<el-tree
							:data="functionList"
							:props="defaultProps"
							show-checkbox>
						</el-tree>
        			</el-card>
      			</el-col>
      			<el-col :span="12">
        			<el-card class="authorizedFunction">
        				<span>已授权功能</span>
						<el-tree
							:data="authorizedTreeData"
							:props="defaultProps"
							show-checkbox>
						</el-tree>
					</el-card>
				</el-col>
    		</el-row>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="savaAutho">授权</el-button>
			</div>
		</div>	
	</el-dialog>
</template>

<script>
export default {
	data() {
		return {
			authoDialogVisible: false,
			functionList: [
				{
					label: '平台管理',
					children: [
						{ label: '构建管理' },
						{ label: '服务管理' },
						{ label: '功能管理' },
						{ label: '租户类型' },
						{ label: '租户管理' },
						{ label: '系统管理' },
						{ label: '平台对接用户管理'}
					]
				},
				{
					label: '地址解析',
					children: [
						{ label: '地址解析' }
					]	
				},
				{
					label: '知识图谱管理',
					children: [
						{ label: '知识图谱维护' }
					]		
				}
			],
			authorizedFunctions: [
				
			],
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		}
	},
	methods: {
		openAutho() {
			this.authoDialogVisible = true;
		},
		savaAutho() {

		}
	}
}
</script>

<style scoped>
.dialog-footer {
  text-align: center;
}
.initDialogContent {
  max-height: 300px;
  overflow-y: auto; 
  overflow-x: hidden;
}
</style>