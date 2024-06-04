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
							<el-input v-model="newTenant.id" style="width: 80%;"></el-input>
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
							<el-select v-model="newTenant.status" placeholder="请选择状态">
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
							<el-input v-model="newTenant.phone" style="width: 80%;"></el-input>
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
export default {
  data() {
    return {
      addDialogVisible: false,
      newTenant: {
        id: '',
        name: '',
        type: '',
        status: '',
        email: '',
        phone: '',
        address: '',
        description: ''
      }
    };
  },
  methods: {
    openAdd() {
        this.addDialogVisible = true;
    },
    addTenant() {

    }
  }
}
</script>

<style scoped>
.dialog-footer {
  text-align: center;
}
</style>