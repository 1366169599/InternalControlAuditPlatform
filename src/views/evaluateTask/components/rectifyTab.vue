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
      <el-table-column prop="processName" label="流程名称" align="center" width="100px"/>
      <el-table-column label="缺陷类型" align="center" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.defectType===0">设计</span>
          <span v-if="scope.row.defectType===1">执行</span>
        </template> 
      </el-table-column>
      <el-table-column prop="defectDescription" label="缺陷描述" align="center" />
      <el-table-column label="缺陷等级" align="center" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.defectLevel===1">重要缺陷</span>
          <span v-if="scope.row.defectLevel===0">一般缺陷</span>
          <span v-if="scope.row.defectLevel===2">重大缺陷</span>
        </template>
      </el-table-column>
      <el-table-column prop="rectificationPlan" label="整改方案" align="center" />
      <el-table-column label="整改状态" align="center" width="80px">
        <template slot-scope="scope">
          <span v-if="scope.row.rectificationState===1">通过</span>
          <span v-if="scope.row.rectificationState===0">未通过</span>
        </template>        
      </el-table-column>
      <el-table-column prop="failureReason" label="未整改说明" align="center" />
      <el-table-column label="操作" align="center" width="80px">
        <template slot-scope="scope">
          <el-button 
          type="text"
          :disabled="Boolean(scope.row.rectificationState)||scope.row.rectificationState===0" 
          @click="showDialog(scope.row)">测试</el-button>
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
    <rectify-tab-dialog
      :dialog-visible.sync="rectifyDialogVisible"
      :formData="currentRow"
      @onSuccess="getTableData"
    ></rectify-tab-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadDefectRectificationTestItemData } from '@/api'
import rectifyTabDialog from '../dialog/rectifyTabDialog'

export default {
  props:{
    slectOption:{
      type:Array
    }
  },
  components:{ rectifyTabDialog },
  data(){
    return{
      processId:null,
      tableData:[],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      rectifyDialogVisible:false,
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
      loadDefectRectificationTestItemData(data).then(res=>{
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
      this.rectifyDialogVisible=true
    }
  }
}
</script>

<style>

</style>