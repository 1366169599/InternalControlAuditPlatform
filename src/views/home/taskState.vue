<template>
  <div style="padding:30px 20px" class="task-breakdown-cont">
    <el-row>
      <el-col :span="2" style="line-height:40px;text-align:right;padding-right:10px">任务状态</el-col>
      <el-col :span="5">
        <el-select v-model="taskState" @change="handleChange" placeholder="请选择" style="width: 250px">
          <el-option
            v-for="item in slectOption"
            :key="item.taskState"
            :value="item.value"
            :label="item.label"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" border height="65vh" style="width: 100%;margin:20px 0">
      <el-table-column type="index" label="序号" align="center" width="80px" />
      <el-table-column prop="companyName" label="公司名称" align="center" width="200px" />
      <el-table-column prop="auditProcessNames" label="涉及循环" align="center" />
      <el-table-column prop="auditFirmName" label="评价事务所" align="center" />
      <el-table-column label="状态" align="center" width="150px">
        <template slot-scope="scope">
          <span v-if="scope.row.taskState===0">未完成</span>
          <span v-else-if="scope.row.taskState===1">未完成</span>
          <span v-else>无状态</span>
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
    <!-- <el-button type="primary" style="float:right" @click="handleSubmit">确定</el-button> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { loadAuditTaskProgressData } from '@/api'

export default {
  data() {
    return {
      tableData: [],
      slectOption: [
        { value: null, label: '全部' },
        { value: 0, label: '未完成' },
        { value: 1, label: '已完成' }
      ],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      taskState: null
    }
  },
  mounted() {
    this.getTableData()
  },
  computed: {
    ...mapGetters(['auditTaskId'])
  },
  methods: {
    getTableData() {
      const data = {
        auditTaskId: this.auditTaskId,
        taskState: this.taskState,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      loadAuditTaskProgressData(data).then(res=>{
        if(res.code==1){
          this.tableData=res.data.records
          this.total=res.data.total
        }
      })
    },
    handleChange(val) {
      this.taskState = val
      this.getTableData()
    },
    handleSubmit() {},
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
.task-breakdown-cont {
  .el-table th {
    background: #d1d1d1;
  }
}
</style>