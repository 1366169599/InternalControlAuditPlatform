<template>
  <div>
    <el-container>
      <el-header style="background-color:#A30313;height:65px">
        <el-row style="line-height:65px;">
          <h2 style="color:#fff;float:left">内控评价系统(事务所版)</h2>
          <i class="el-icon-s-tools" style="line-height:65px;float:right;color:#fff;font-size:35px;cursor:pointer;"></i>
          <el-select v-model="tab" @change="handleChange" style="width: 120px;float:right;margin-right:15px">
          <el-option
            v-for="item in [{value: 1,label: '主审事务所'},{value: 2,label: '评价任务'}]"
            :key="item.value"
            :value="item.value"
            :label="item.label"/>
          </el-select>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="250px" style="background-color:#A30313">
          <el-menu
            @open="handleOpen"
            background-color="#A30313"
            text-color="#fff"
            router
            active-text-color="#ffd04b">
            <el-submenu v-for="(item,index) in asideMenu" :key="item.auditTaskId" :index="index+1+''">
              <template slot="title">
                <span>{{item.groupName}}</span>
              </template>
                <el-menu-item 
                  v-for="(menu,index2) in subMenu"
                  :disabled="(item.taskStep>3&&index2===0)||(item.taskStep<3&&index2===1)"
                  :index = "menu.path" 
                  :key = "index2">
                  {{menu.title}}
                </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="min-height: calc(100vh - 65px)">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { loadPrincipalAuditTaskData } from '@/api'
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      tab:1,
      subMenu:[
        {
          title: '任务初始化',
          path: '/initTask'
        },
        {
          title: '任务状态',
          path: '/taskState'
        },
        {
          title: '结果汇总',
          path: '/resultsSummary'
        },
        {
          title: '成熟度评价',
          path: '/waiting'
        }
      ]
    }
  },
  mounted(){

  },
  computed: {
    ...mapGetters(['asideMenu', 'auditTaskId','step']),
  },
  methods: {
    handleOpen(key) {
      // 步骤
      const step=this.asideMenu[+key-1].taskStep
      // 审核任务id
      const id=this.asideMenu[+key-1].auditTaskId
      this.$store.commit('setAuditTaskId',id)
      this.$store.commit('setStep',step)

    },
    getMenu(){
      let data={auditFirmId:1}
      loadPrincipalAuditTaskData(data).then(res=>{
        if(res.code===1){
          this.asideMenu=res.data
        }
      }).catch(e => {
        console.log(e);
      })
    },
    handleChange(val){
      if(val===2){
       this.$router.push({path:'/evaluateTask'})
      }
    },
    routeStartTask(){
      this.$router.push({path:'/startTask'})
    }
  }
}
</script>

<style lang="less">
.el-menu{
  border:none;
}
</style>
