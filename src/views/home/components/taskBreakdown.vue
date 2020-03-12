<template>
  <div style="padding:30px 20px" class="task-breakdown-cont">
    <el-table
      :data="tableData"
      border
      height="65vh"
      style="width: 100%;margin:20px 0">
      <el-table-column type="index" label="序号" align="center" width="80px"/>
      <el-table-column prop="companyName" label="公司名称" align="center" width="200px"/>
      <el-table-column prop="auditProcessNames" label="涉及循环" align="center"/>
      <el-table-column label="事务所选择" align="center" width="300px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.auditFirmId" clearable placeholder="请选择事务所">
            <el-option
              v-for="item in scope.row.auditFirms"
              :key="item.auditFirmId"
              :label="item.auditFirmName"
              :value="item.auditFirmId">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" style="float:right" @click="handleSubmit">确定</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadAuditCompanyData, saveAuditFirmTask } from '@/api'

export default {
  data(){
    return{
      tableData:[],
    }
  },
  mounted(){
    this.getTableData()
  },
  computed: {
    ...mapGetters(['auditTaskId']),
  },
  methods:{
    getTableData(){
      loadAuditCompanyData({auditTaskId:this.auditTaskId}).then(res=>{
        if(res.code===1){
          this.tableData=res.data
        }
      })
    },
    handleSubmit(){
      const auditFirmIds=this.tableData.filter(item=>{
        return item.auditFirmId
      }).map(item=>{
        return item.auditFirmId
      })
      const companyIds=this.tableData.map(item=>{
        return item.companyId
      })
      if(auditFirmIds.length!==companyIds.length){
        this.$message.warning('事务所选项不能为空')
        return
      }
      const data={
        companyIds:companyIds.join(','),
        auditFirmIds:auditFirmIds.join(','),
        auditTaskId:this.auditTaskId
      }
      saveAuditFirmTask(data).then(res=>{
        if(res.code===1){
          this.$router.push({path:'taskState'})
          this.$store.commit('setStep',4)
          this.$store.dispatch('getAsideMenu')
        }
      })
    }
  }
}
</script>

<style lang="less">
.task-breakdown-cont{
  .el-table th{
    background: #d1d1d1;
  }
}
</style>