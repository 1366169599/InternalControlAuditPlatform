<template>
  <div class="choose-process-cont">
    <el-checkbox-group v-model="checkboxGroup" style="width:100%;height:65vh;margin-top:50px">
      <el-checkbox 
        v-for="item in tableData" 
        :key="item.processId" 
        :label="item.processId" 
        border
        style="width:16%;margin:15px 2%"
        >{{item.processName}}</el-checkbox>
    </el-checkbox-group>
    <el-row>
      <el-button type="primary" style="float:right;margin-right:2%" @click="nextStep">下一步</el-button>
      <div class="clear:both"></div>
    </el-row>
  </div>
</template>

<script>
import { loadProcessStandardData,saveAuditProcess } from '@/api'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      tableData:[],
      checkboxGroup:[]
    }
  },
  mounted(){
    this.getData()
  },
  computed: {
    ...mapGetters(['auditTaskId'])
  },
  methods:{
    getData(){
      loadProcessStandardData().then(res=>{
        if(res.code==1){
          this.tableData=res.data
        }
      })
    },
    nextStep(){
      const ids=this.checkboxGroup.join(',')
      const data={
        auditTaskId:this.auditTaskId,
        processIds:ids
      }
      if(!ids){
        this.$message.warning('请选择至少一项流程')
        return
      }
      saveAuditProcess(data).then(res=>{
        if(res.code===1){
          this.$message.success('开启成功')
          this.$store.commit('setStep',2)
        }
      })
    }
  }
}
</script>

<style lang="less">
.choose-process-cont{
  .el-table th{
    background: #d1d1d1;;
  }
  .el-checkbox{
    margin-right: 0;
  }
  .el-checkbox.is-bordered+.el-checkbox.is-bordered{
    margin-left: 0;
  }
  .el-checkbox.is-bordered {
    padding: 18px 20px 18px 10px;
    border-radius: 8px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: normal;
    height: 80px;
    text-align: center;
    background: #f0f9eb;
    border-color: #c2e7b0;
  }
.el-checkbox__label {
    display: inline-block;
    padding-left: 10px;
    line-height: 40px;
    font-size: 16px;
}
}
</style>>
