<template>
  <div>
    <el-row type="flex" justify="center" style="margin:25px 0">
      <el-col :span="12" style="text-align: center">
        <h2>评价任务通知(主审)</h2>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="任务名称">
            <el-input disabled v-model="form.taskName"></el-input>
          </el-form-item>
          <el-form-item label="任务编号">
            <el-input disabled v-model="form.taskCode"></el-input>
          </el-form-item>
          <el-form-item label="集团公司">
            <el-input disabled v-model="form.groupName"></el-input>
          </el-form-item>
          <el-form-item label="主审事务所">
            <el-input disabled v-model="form.auditFirmName"></el-input>
          </el-form-item>
          <el-form-item label="评价时间">
            <el-col :span="11">
              <el-date-picker disabled type="date" placeholder="选择日期" v-model="form.taskBeginDate" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="11">
              <el-date-picker disabled type="date" placeholder="选择日期" v-model="form.taskEndDate" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="任务说明">
            <el-input
              disabled
              v-model="form.taskStatement"
              :rows="5"
              style="margin-top: 5px"
              class="input-item"
              type="textarea"
              placeholder="备注"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin:25px 0">
      <el-col :span="12" style="text-align: center">
        <el-button type="primary" @click="startTask">任务启动</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { loadAuditTaskDetail, startAuditTask } from '@/api'
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      form:{}
    }
  },
  mounted(){
    this.getData()
  },
  computed: {
    ...mapGetters(['auditTaskId'])
  },
  methods:{
    // 获取数据
    getData(){
      let data={auditTaskId:this.auditTaskId}
      loadAuditTaskDetail(data).then(res=>{
        if(res.code===1){
          this.form=res.data
        }
    })
    },
    startTask(){
      let data={auditTaskId:this.auditTaskId}
      startAuditTask(data).then(res=>{
        if(res.code===1){
          this.$message.success('启动成功')
          this.$store.commit('setStep',1)
        }else{
          this.$message.warning('启动失败')         
        }      
      })
    }
  }
}
</script>

<style>

</style>