<template>
	<div class="container">
        <div class="tenantContainer">
            <tenantSearchBar />
            <div class="function_bar">
                <addTenant/>
                <editTenant/>
                <deleteTenant/>
                <authoTenant/>
                <initTenant/>
            </div>
            <tenantList/>
        </div>
	</div>
</template>

<script>
    import tenantSearchBar from "../../../components/tenantSearchBar.vue"
    import addTenant from "../../components/addTenant.vue"
    import editTenant from "../../components/editTenant.vue"
    import authoTenant from "../../components/authoTenant.vue"
    import deleteTenant from "../../components/deleteTenant.vue"
    import initTenant from "../../components/initTenant.vue"
    import tenantList from "../../components/tenantList.vue"
    export default {
        data() {
            return{
                
            }
        },
        components: {
            tenantSearchBar,
            addTenant,
            editTenant,
            authoTenant,
            deleteTenant,
            initTenant,
            tenantList
        }
}
</script>

<style scoped>
    .tenantContainer {
        position:absolute;
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
