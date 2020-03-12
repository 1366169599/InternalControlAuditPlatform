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
      <el-table-column prop="element" label="评价要素" align="center" />
      <el-table-column prop="testContent" label="关键控制点" align="center" width="300px" />
      <el-table-column label="是否缺陷" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.defectFlag===1">是</span>
          <span v-if="scope.row.defectFlag===0">否</span>
          <span v-if="scope.row.defectFlag===-1">不适用</span>
        </template>        
      </el-table-column>
      <el-table-column prop="defectDescription" label="缺陷描述" align="center" />
      <el-table-column label="缺陷等级" align="center">
        <template v-if="scope.row.defectFlag===1" slot-scope="scope">
          <span v-if="scope.row.defectLevel===1">重要缺陷</span>
          <span v-if="scope.row.defectLevel===0">一般缺陷</span>
          <span v-if="scope.row.defectLevel===2">重大缺陷</span>
        </template>         
      </el-table-column>
      <el-table-column prop="recommend" label="整改意见" align="center" />
      <el-table-column label="得分" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.defectFlag!==-1">{{scope.row.points}}</span>
        </template>         
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" :disabled="Boolean(scope.row.defectFlag)||scope.row.defectFlag===0" @click="showDialog(scope.row)">测试</el-button>
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
    <design-dialog
      :dialog-visible.sync="designDialogVisible"
      :formData="currentRow"
      :defectType="0"
      @onSuccess="getTableData"
    ></design-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadProcessValidityTestItemData } from '@/api'
import designDialog from '../dialog/designDialog'
export default {
  props:{
    slectOption:{
      type:Array
    }
  },
  components:{ designDialog },
  data(){
    return{
      processId:null,
      tableData:[],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      designDialogVisible: false,
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
      let data= {
        auditTaskId:this.auditTaskId,
        companyId:this.companyId,
        defectType:0,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      } 
      // 判断是否需要传processId
      data=this.processId ? {...data,processId:this.processId} : data
      loadProcessValidityTestItemData(data).then(res=>{
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
      this.designDialogVisible=true
    }
  }
}
</script>

<style>

</style>