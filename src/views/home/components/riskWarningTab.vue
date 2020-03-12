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
        <el-form-item label="流程名称">
          <el-select v-model="processId" @change="handleChange" placeholder="请选择流程" style="width: 200px;">
            <el-option
              v-for="item in processOption"
              :key="item.processId"
              :value="item.processId"
              :label="item.processName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="预警等级">
          <el-select v-model="warningLevel" @change="handleChange" placeholder="请选择预警等级" style="width: 200px;">
            <el-option
              v-for="item in warningLevelOption"
              :key="item.label"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table :data="tableData" border height="65vh" style="width: 100%;margin-bottom:20px">
      <el-table-column prop="processName" label="所属流程" align="center" />
      <el-table-column prop="companyName" label="企业名称" align="center" />
      <el-table-column prop="indicationName" label="指标名称" align="center" />
      <el-table-column prop="indicationValue" label="指标值" align="center" />
      <el-table-column label="预警等级" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.warningLevel===0">低</span>
          <span v-if="scope.row.warningLevel===1">中</span>
          <span v-if="scope.row.warningLevel===2">高</span>
        </template>         
      </el-table-column>
      <el-table-column prop="warningStatement" label="预警说明" align="center" />
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
import { loadRiskWarningData } from '@/api'

export default {
  props:{
    companyOption:{
      type:Array,
      required:true
    },
    processOption:{
      type:Array,
      required:true
    },
    warningLevelOption:{
      type:Array,
      required:true
    }
  },
  data(){
    return{
      companyId:null,
      processId:null,
      warningLevel:null,
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
      data = this.processId !== null ? {...data,processId:this.processId} : {...data}
      data = this.warningLevel !== null ? {...data,warningLevel:this.warningLevel} : {...data}
      const loading = this.$loading({
        lock: true,
        text: '正在加载数据',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
      loadRiskWarningData(data).then(res=>{
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