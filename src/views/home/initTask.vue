<template>
  <div>
    <el-steps :active="step" finish-status="success" simple>
      <el-step title="开启任务" ></el-step>
      <el-step title="循环选择" ></el-step>
      <el-step title="公司抽样" ></el-step>
      <el-step title="任务细分" ></el-step>
    </el-steps>
    <!-- 步骤组件 -->
    <start-task v-if="step===0"></start-task>
    <choose-process v-if="step===1"></choose-process>
    <company-sampling v-if="step===2"></company-sampling>
    <task-breakdown v-if="step===3"></task-breakdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import startTask from './components/startTask'
import chooseProcess from './components/chooseProcess'
import companySampling from './components/companySampling'
import taskBreakdown from './components/taskBreakdown'

export default {
  components: { startTask, chooseProcess, companySampling, taskBreakdown },
  data(){
    return{

    }
  },
  computed: {
    ...mapGetters(['asideMenu', 'auditTaskId', 'step'])
  },
}
</script>

<style>

</style>