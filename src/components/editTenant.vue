<template>
    <div>
      <el-form-item>
          <el-button type="primary" @click="openEdit" :disabled="!tenant">修改</el-button>
      </el-form-item>
      <el-dialog v-model="editDialogVisible" title="修改租户信息">
        <el-form :model="editTenantData">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="租户编码">
                <el-input v-model="editTenantData.code" style="width: 80%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租户名称">
                <el-input v-model="editTenantData.name" style="width: 80%;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="租户类型">
                <el-select v-model="editTenantData.type" placeholder="请选择类型">
                  <!-- <el-option v-for="item in tenantTypes" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                  <el-option label="平台租户" value="0"></el-option>
                  <el-option label="普通租户" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="租户状态">
                <el-select v-model="editTenantData.state" placeholder="请选择状态">
                  <!-- <el-option v-for="item in tenantStates" :key="item.value" :label="item.label" :value="item.value"></el-option> -->
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="禁用" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
				  </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input v-model="editTenantData.email" style="width: 80%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话">
                <el-input v-model="editTenantData.telephone" style="width: 80%;"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="地址">
            <el-input v-model="editTenantData.address" style="width: 100%;"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="editTenantData.description" style="width: 100%;"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clear">清空</el-button>
          <el-button type="primary" @click="editTenantSave">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
<script>
import axios from 'axios';
import { log } from 'console';
export default {
    props: {
        tenant: {
            type: Object,
            required: false
        }
    },
    data() {
        return {
            editDialogVisible: false,
            editTenantData: {
                id: '',
                code: '',
                name: '',
                type: '',
                state: '',
                email: '',
                telephone: '',
                address: '',
                description: ''
            }
            // tenantTypes: [
            //     { label: '平台租户', value: '0' },
            //     { label: '普通租户', value: '1' }
            // ],
            // tenantStates: [
            //     { label: '启用', value: '1' },
            //     { label: '禁用', value: '0' }
            // ]
        };
    },
    watch: {
        tenant: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.editTenantData = {
                      ...newVal,
                      // type: newVal.type ? newVal.type.toString() : '1', 
                      // state: newVal.state ? newVal.state.toString() : '1'
                }
            }
        }
    },
    methods: {
        openEdit() {
          console.log("Edit");
          log(this.tenant);
            if (this.tenant) {
                this.editTenantData = { 
                  ...this.tenant,
                  // type: this.tenant.type ? this.tenant.type.toString() : '1', 
                  // state: this.tenant.state ? this.tenant.state.toString() : '1'
                };
                this.editDialogVisible = true;
                console.log(editDialogVisible);
            } else {
                this.$message.error('请先选择一个租户');
            }
        },
        clear() {
            this.editTenantData = {
                id: '',
                code: '',
                name: '',
                type: '',
                state: '',
                email: '',
                telephone: '',
                address: '',
                description: ''
            };
        },
        async editTenantSave() {
            this.$http.put("/tenant/update", this.editTenantData, {
                headers: {
                'Content-Type': 'application/json'
            }})
            .then((res) => {
                if (res.data.code === 0) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                        this.editDialogVisible = false;
                        this.clear();
                } else {
                    this.$message.error('修改失败');
                }
            })
            .catch((error) => {
                this.$message.error('修改出错，请重试');
            });
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