<template>
    <el-table :data="tenantInfoForm">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="id" label="租户编码"/>
    <el-table-column prop="name" label="租户名称"/>
    <el-table-column prop="status" label="租户状态"/>
    <el-table-column prop="type" label="租户类型"/>
    <el-table-column prop="email" label="邮箱"/>
    <el-table-column prop="phone" label="电话"/>
    <el-table-column prop="address" label="地址"/>
    <el-table-column prop="description" label="描述"/></el-table>
</template>

<script>
export default {
    data() {
        return {
            tenantInfoForm: [
                {
                    id:"hitwh001",
                    name:"平台运营商",
                    status:"启用",
                    type:"服务提供者",
                    email:"xxxxxxxxxxx@163.com",
                    phone:"xxxxxxxxxxx",
                    address:"文化西路2号",
                    description:"abc",
                },
                {
                    id:"hitwh002",
                    name:"平台运营商",
                    status:"启用",
                    type:"服务提供者",
                    email:"xxxxxxxxxxx@163.com",
                    phone:"xxxxxxxxxxx",
                    address:"文化西路2号",
                    description:"abc",
                }
            ],
        }
    }
}

</script>