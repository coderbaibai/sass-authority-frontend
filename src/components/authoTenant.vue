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
	    authorizedFunctionIds: [],
      checkedFunctionIds: [],
      checkedFunctionLeaves:[],
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
  methods: {
    getLeaf(funcNode){
      if(!funcNode.children || funcNode.children.length == 0){
        this.checkedFunctionLeaves.push(funcNode.id)
      }
      else{
        for(let i=0;i<funcNode.children.length;i++){
          this.getLeaf(funcNode.children[i])
        }
      }
    },
    openAutho() {
      if (this.tenant) {
        this.authoDialogVisible = true; 
        this.loadAllFunctions(); 
        this.loadAuthorizedFunctions();
      } else {
        this.$message.error('请先选择一个租户');
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
          // this.authorizedFunctionIds = this.authorizedFunctions.map(func => func.id);
          // this.authorizedFunctions.map(this.getLeaf);
          this.authorizedFunctionIds = []
          this.checkedFunctionLeaves = []
          for(let i=0;i<this.authorizedFunctions.length;i++)
            this.getLeaf(this.authorizedFunctions[i])
          this.authorizedFunctionIds = this.checkedFunctionLeaves
          this.checkedFunctionIds = [...this.authorizedFunctionIds];
        } else {
          this.$message.error('加载已授权功能失败'); 
        }
      } catch (error) {
        console.log(error)
        this.$message.error('加载已授权功能出错，请重试'); 
      }
    },
    handleCheckChange(node, checked, indeterminate) {
		const checkedKeys = this.$refs.functionTree.getCheckedKeys();
		this.checkedFunctionIds = checkedKeys;
    },
    clear() {
		this.checkedFunctionIds = [];
		this.$refs.functionTree.setCheckedKeys([]);
    },
    async saveAutho() {
      try {
        const res = await this.$http.post('/tenant/function/distribute', {
          tenantId: this.tenant.id,
          functionIds: this.checkedFunctionIds
        });
        if (res.data.code === 0) {
          this.$message.success('授权成功');
          this.authoDialogVisible = false; 
          this.loadAuthorizedFunctions(); 
        } else {
          this.$message.error('授权失败'); 
        }
      } catch (error) {
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
