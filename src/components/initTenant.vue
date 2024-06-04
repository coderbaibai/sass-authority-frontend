<template>
    <el-form-item>
        <el-button type="primary" @click="openInit">初始化</el-button>
    </el-form-item>
    <el-dialog v-model="initDialogVisible" title="初始化">
        <el-form :model="initTenant">
            <el-form-item label="初始角色">
                <el-input v-model="initTenant.character" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="初始账号">
                <el-input v-model="initTenant.account" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item label="初始密码">
                <el-input v-model="initTenant.password" style="width: 100%;"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="initTenant">保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default{
    data() {
        return {
            initDialogVisible: false
        }
    },
    methods: {
        openInit() {
            this.initDialogVisible = true;
        },
        initTenant() {

        }
    }
}

</script>

<style scoped>
.dialog-footer {
  text-align: center;
}
</style>