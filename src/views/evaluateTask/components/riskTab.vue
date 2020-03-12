<template>
  <div>
    <el-row>
      <el-select v-model="processId" clearable @change="handleChange" placeholder="请选择流程" style="width: 350px">
        <el-option
          v-for="item in slectOption"
          :key="item.processId"
          :value="item.processId"
          :label="item.processName"
        />
      </el-select>
    </el-row>
    <el-table :data="tableData" border height="500" style="width: 100%;margin:20px 0">
      <el-table-column type="index" label="序号" align="center" width="80px" />
      <el-table-column prop="indicationName" label="名称" align="center" />
      <el-table-column prop="indicationStatement" label="指标说明" align="center" />
      <el-table-column prop="indicationValue" label="指标值" align="center" />
      <el-table-column prop="warningLevel" label="预警状况" align="center" />
      <el-table-column label="预警状况" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.warningLevel===0">低</span>
          <span v-if="scope.row.warningLevel===1">中</span>
          <span v-if="scope.row.warningLevel===2">高</span>
        </template>         
      </el-table-column>
      <el-table-column prop="warningStatement" label="预警说明" align="center" />
      <el-table-column label="操作" align="center" width="80px">
        <template slot-scope="scope">
          <el-button type="text" :disabled="Boolean(scope.row.indicationValue)" @click="showDialog(scope.row)">测试</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
      style="float:right"
    ></el-pagination>
    <!-- 对话框 -->
    <risk-tab-dialog
      :dialog-visible.sync="riskDialogVisible"
      :formData="currentRow"
      @onSuccess="getTableData"
    ></risk-tab-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadProcessRiskIndicationTestItemData } from '@/api'
import riskTabDialog from '../dialog/riskTabDialog'

export default {
  props:{
    slectOption:{
      type:Array
    }
  },
  components:{ riskTabDialog },
  data(){
    return{
      processId:null,
      tableData:[],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      riskDialogVisible:false,
      currentRow:{}
    }
  },
  computed: {
    ...mapGetters(['auditFirmId','auditTaskId','companyId'])
  },
  mounted(){
    this.getTableData()
  },
  methods:{
    handleChange(val){
      this.processId=val
      this.$emit('changeProcessId',val)
      this.getTableData()
    },
    getTableData(){
      let data={
        auditTaskId:this.auditTaskId,
        companyId:this.companyId,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }
      // 判断是否需要传processId
      data=this.processId ? {...data,processId:this.processId} : data
      loadProcessRiskIndicationTestItemData(data).then(res=>{
        if(res.code===1){
          this.tableData=res.data.records
          this.total=res.data.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    showDialog(row){
      this.currentRow={...row}
      this.riskDialogVisible=true
    }
  }
}
</script>

<style>

</style>