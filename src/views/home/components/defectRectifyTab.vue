<template>
  <div class="defect-tab-cont">
    <el-row>
      <el-form :inline="true" size="small">
        <el-form-item label="公司名称">
          <el-select v-model="companyId" @change="handleChange" placeholder="请选择公司" style="width: 200px">
            <el-option
              v-for="item in companyOption"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="整改状态">
          <el-select v-model="rectificationState" @change="handleChange" placeholder="请选择状态" style="width: 200px;">
            <el-option
              v-for="item in rectifyOption"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="tableData" border height="65vh" style="width: 100%;margin-bottom:20px">
      <el-table-column prop="processName" label="所属流程" align="center" />
      <el-table-column label="缺陷等级" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.defectLevel===1">重要缺陷</span>
          <span v-if="scope.row.defectLevel===0">一般缺陷</span>
          <span v-if="scope.row.defectLevel===2">重大缺陷</span>
        </template>         
      </el-table-column>
      <el-table-column prop="defectDescription" label="缺陷描述" align="center" />
      <el-table-column label="缺陷类别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.defectType===0">设计</span>
          <span v-if="scope.row.defectType===1">执行</span>
        </template>        
      </el-table-column>
      <el-table-column prop="companyName" label="缺陷单位" align="center" />
      <el-table-column prop="rectificationPlan" label="整改方案" align="center" />
      <el-table-column prop="rectificationDate" label="整改日期" align="center" />
      <el-table-column prop="rectificationState" label="是否通过整改" align="center" />
      <el-table-column label="是否通过整改" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.rectificationState===0">未通过</span>
          <span v-if="scope.row.rectificationState===1">通过</span>
        </template>        
      </el-table-column>
      <el-table-column prop="failureReason" label="未通过原因" align="center" />
      <el-table-column prop="auditFirmName" label="事务所名称" align="center" />
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadDefectRectificationData } from '@/api'

export default {
  props:{
    companyOption:{
      type:Array,
      required:true
    },
    rectifyOption:{
      type:Array,
      required:true
    }
  },
  data(){
    return{
      companyId:null,
      rectificationState:null,
      tableData:[],
      currentPage: 1,
      total: 0,
      pageSize: 10
    }
  },
  computed: {
    ...mapGetters(['auditTaskId'])
  },
  mounted(){
    this.getTableData()
  },
  methods:{
    getTableData(){
      let data={
        auditTaskId:this.auditTaskId,
        pageNum:this.currentPage,
        pageSize:this.pageSize
      }
      data = this.companyId !== null ? {...data,companyId:this.companyId} : {...data}
      data = this.rectificationState !== null ? {...data,rectificationState:this.rectificationState} : {...data}
      const loading = this.$loading({
        lock: true,
        text: '正在加载数据',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
      loadDefectRectificationData(data).then(res=>{
        if(res.code===1){
          this.tableData=res.data.records
          this.total=res.data.total
        }
      }).finally(() => {
          loading.close()
        })
    },
    handleChange(){
      this.getTableData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    }
  }
}
</script>

<style lang="less">
.defect-tab-cont{
  .el-table th {
    background: #d1d1d1;
  }
}
</style>