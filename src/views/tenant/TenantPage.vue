<template>
    <div class="container">
      <div class="tenantContainer">
        <tenantSearchBar @search-results="handleSearchResults" />
        <div class="function_bar">
          <addTenant/>
          <editTenant :tenant="selectedTenant"/>
          <deleteTenant :tenant="selectedTenant"/>
          <authoTenant :tenant="selectedTenant"/>
          <initTenant />
        </div>
        <tenantList :tenants="tenants" @selected_tenant="setSelectedTenant" />
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import tenantSearchBar from "../../components/tenantSearchBar.vue";
import addTenant from "../../components/addTenant.vue";
import editTenant from "../../components/editTenant.vue";
import authoTenant from "../../components/authoTenant.vue";
import deleteTenant from "../../components/deleteTenant.vue";
import initTenant from "../../components/initTenant.vue";
import tenantList from "../../components/tenantList.vue";

export default {
    data() {
        return {
          tenants: [],
          selectedTenant: null
        };
    },
    components: {
        tenantSearchBar,
        addTenant,
        editTenant,
        authoTenant,
        deleteTenant,
        initTenant,
        tenantList
    },
    methods: {
        async getAllTenants() {
            console.log("all");
            // this.$test.get("/m1/4595220-4244770-default/tenant/all");
            this.$http.get("/tenant/all")
            .then((res) => {
				if (res.data.code === 0) {
					this.tenants = res.data.data;
				} else {
					console.error('读取失败', res.data.msg);
				}
			})
			.catch((error) => {
				console.error('无法读取', error);
			});
        },
        handleSearchResults(results) {
            this.tenants = results;
        },
        setSelectedTenant(tenant) {
            this.selectedTenant = tenant;
        }
    },
    mounted() {
        console.log("Component mounted");
        this.getAllTenants();
    }
};
</script>
  
<style scoped>
.tenantContainer {
    position: absolute;
    background: white;
    height: 100%;
    width: 100%;
    bottom: 0px;
    right: 0px;
    padding: 16px;
}

.function_bar {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
}
</style>
  