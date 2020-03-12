<template>
  <div style="padding:30px 20px" class="company-sampling-cont">
    <el-row>
      <el-select v-model="processId" @change="handleChange" placeholder="请选择" style="width: 350px;float:left">
      <el-option
        v-for="item in slectOption"
        :key="item.processId"
        :value="item.value"
        :label="item.label"/>
      </el-select>
      <el-form :inline="true" :model="formInline" size="mini" style="float:right">
        <el-form-item label="单家占比">
          <el-input disabled v-model="formInline.independentProportion" style="width:80px"></el-input>
        </el-form-item>
        <el-form-item label="累计占比">
          <el-input disabled v-model="formInline.cumulativeProportion" style="width:80px"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      border
      height="65vh"
      :row-class-name="tableRowClassName"
      style="width: 100%;margin:20px 0">
      <el-table-column type="index" label="序号" align="center" width="80px"/>
      <el-table-column prop="companyName" label="公司名称" align="center"/>
      <el-table-column prop="proportion" :label="samplingStandard" align="center"/>
      <el-table-column label="是否选择" align="center" width="120px">
        <template slot-scope="scope">
          <el-switch :disabled="scope.row.edit" v-model="scope.row.selectFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="三年内是否选过" align="center" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.selectedFlag">已选过</span>
          <span v-else>未选过</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button v-if="notSetAuditProcessCount===0" type="primary" size="mini" style="float:right;margin-left:15px" @click="nextStep">下一步</el-button>
    <el-button type="primary" size="mini" :disabled="globalEdit" style="float:right;margin-left:15px" @click="handleSubmit">确 定</el-button>
    <span class="span" style="background:#E6A23C">{{total}}</span>
    <span class="span">累计抽样</span>
  </div>
</template>

<script>
import { 
  loadSelectedProcessData,
  loadCompanyData,
  saveSelectCompanys
  } from '@/api'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      formInline:{},
      tableData:[],
      slectOption:[],
      processId:null,
      samplingStandard:'资金占比',
      globalEdit:false,
      notSetAuditProcessCount:null
    }
  },
  mounted(){
    this.getSlectOption()
  },
  computed: {
    ...mapGetters(['auditTaskId']),
    total(){
      const data=this.tableData.filter(item=>{
        return item.selectFlag
      }).map(item=>{
        return item.number
      }).reduce((pre,cur)=>pre+cur,0)
      return data+'%'
    }
  },
  methods:{
    handleChange(val){
      this.processId=val
      const data=this.slectOption.filter(item=>{
        return item.value===val
      })
      this.formInline={
        independentProportion:data[0].independentProportion+'%',
        cumulativeProportion:data[0].cumulativeProportion+'%'
      }
      this.samplingStandard=data[0].samplingStandard
      this.getTableData()
    },
    // 查询下拉框数据
    getSlectOption(){
      loadSelectedProcessData({auditTaskId:this.auditTaskId}).then(res=>{
        if(res.code===1){
          this.slectOption=res.data.map(item=>{
            return {
              ...item,
              value:item.processId,
              label:item.processName
            }
          })
          this.processId=this.slectOption[0].value
          this.formInline={
            independentProportion:this.slectOption[0].independentProportion+'%',
            cumulativeProportion:this.slectOption[0].cumulativeProportion+'%'
          }
          this.samplingStandard=this.slectOption[0].samplingStandard
          this.getTableData()
        }
      })
    },
    // 获取表格数据
    getTableData(){
      const data={
        auditTaskId:this.auditTaskId,
        processId:this.processId
      }
      loadCompanyData(data).then(res=>{
        if(res.code===1){
          this.tableData=res.data.records.map(item=>{
            return {
              ...item,
              proportion:item.proportion+'%',
              number:item.proportion, // 为了计算方便
              selectFlag:Boolean(item.selectFlag),
              selectedFlag:Boolean(item.selectedFlag),
              edit:Boolean(item.selectFlag) // 是否可编辑
            }
          })
          this.globalEdit=Boolean(res.data.setState)
        }
      })
    },
    // 动态设置表格背景颜色
    tableRowClassName({row}){
      if(row.edit){
        return 'not-edit'
      }
    },
    handleSubmit(){
      const number1=this.formInline.cumulativeProportion.slice(0,-1)
      const number2=this.total.slice(0,-1)
      if(+number1>+number2){
        this.$message.warning('累计抽样必须大于累计占比')
        return
      }
      const companyIds=this.tableData.filter(item=>{
        return item.selectFlag
      }).map(item=>{
        return item.companyId
      }).join(',')
      const data={
        auditTaskId:this.auditTaskId,
        processId:this.processId,
        companyIds:companyIds
      }
      saveSelectCompanys(data).then(res=>{
        if(res.code===1){
          this.notSetAuditProcessCount=res.data.notSetAuditProcessCount
          if(this.notSetAuditProcessCount>0){
            this.$message.warning(`还有${this.notSetAuditProcessCount}项未处理`)
          }
          this.globalEdit=true
        }
      })
    },
    nextStep(){
      this.$store.commit('setStep',3)
    }
  }
}
</script>

<style lang="less">
.company-sampling-cont{
  .el-table th{
    background: #d1d1d1;
  }
  .el-table .not-edit {
    background: #E6A23C;
  }
  .span{
    float:right;
    width:70px;
    height:28px;
    font-size:14px;
    line-height:28px;
    margin-left:15px;
    text-align: center;
    border-radius: 3px;
    box-sizing: border-box;
  }
}
</style>