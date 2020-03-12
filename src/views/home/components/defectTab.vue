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
        <el-form-item label="缺陷等级">
          <el-select v-model="defectLevel" @change="handleChange" placeholder="请选择缺陷等级" style="width: 200px;">
            <el-option
              v-for="item in defectLevelOption"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="缺陷类型">
        <el-select v-model="defectType" @change="handleChange" placeholder="请选择缺陷类型" style="width: 200px;">
          <el-option
            v-for="item in defectTypeOption"
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
      <el-table-column prop="defectReason" label="缺陷原因分析" align="center" />
      <el-table-column prop="recommend" label="事务所整改建议" align="center" />
      <el-table-column prop="auditFirmName" label="事务所" align="center" />
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
import { loadDefectData } from '@/api'

export default {
  props:{
    processOption:{
      type:Array,
      required:true
    },
    defectLevelOption:{
      type:Array,
      required:true
    },
    defectTypeOption:{
      type:Array,
      required:true
    },
    companyOption:{
      type:Array,
      required:true
    }
  },
  data(){
    return{
      companyId:null,
      processId:null,
      defectLevel:null,
      defectType:null,
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
      data = this.defectLevel !== null ? {...data,defectLevel:this.defectLevel} : {...data}
      data = this.defectType !== null ? {...data,defectType:this.defectType} : {...data}
      const loading = this.$loading({
        lock: true,
        text: '正在加载数据',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      })
      loadDefectData(data).then(res=>{
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