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
            background-color="#A30313"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <span>评价执行</span>
              </template>
              <el-menu-item v-for="(item,index) in menus" :key="index" @click="getData(item)">{{item.companyName}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main style="min-height: calc(100vh - 65px)">
          <el-row v-if="companyId!==null">
            <el-col :span="22">
              <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="设计有效" name="first">
                  <design-tab
                    :slectOption="slectOption"
                    @changeProcessId="changeProcessId"
                  ></design-tab>
                </el-tab-pane>
                <el-tab-pane label="执行有效" name="second">
                  <execute-tab
                    :slectOption="slectOption"
                    @changeProcessId="changeProcessId"
                  ></execute-tab>
                </el-tab-pane>
                <el-tab-pane label="风险指标" name="third">
                  <riskTab
                    :slectOption="slectOption"
                    @changeProcessId="changeProcessId"
                  ></riskTab>
                </el-tab-pane>
                <el-tab-pane label="上期整改" name="fourth">
                  <rectifyTab
                    :slectOption="slectOption"
                    @changeProcessId="changeProcessId"
                  ></rectifyTab>
                </el-tab-pane>
                <el-tab-pane label="填报任务" name="fifth">
                  <upload-tab/>
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="2">
              <el-button type="danger" style="float:right" @click="showDrawer">风险提示</el-button>
            </el-col>
          </el-row>
          <div v-else class="img-cont">
            <img src="@/assets/home.jpg" alt="">
          </div>
          <el-drawer
            title="风险提示"
            :with-header="false"
            size="50%"
            direction="ltr"
            :visible.sync="drawer"
            :before-close="handleClose">
            <el-table :data="tableData" height="90vh" border style="width:100%;margin-top:5vh">
              <el-table-column type="index" label="序号" align="center" width="50px" />
              <el-table-column prop="processName" label="流程名称" align="center" width="200px"/>
              <el-table-column prop="riskContent" label="风险内容"/>
            </el-table>
          </el-drawer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { 
  loadParticipativeAuditTaskData, 
  loadAuditProcessOptionData,
  loadRiskData
  } from '@/api'
import designTab from './components/designTab'
import executeTab from './components/executeTab'
import riskTab from './components/riskTab'
import rectifyTab from './components/rectifyTab'
import uploadTab from './components/uploadTab'
export default {
  components: { designTab, executeTab,riskTab,rectifyTab,uploadTab },
  data(){
    return {
      tab:2,
      menus:[],
      activeName: 'first',
      companyId:null,
      slectOption:[],
      drawer:false,
      tableData:[],
      processId:null
    }
  },
  mounted(){
    this.getMenus()
  },
  computed: {
    ...mapGetters(['auditFirmId','auditTaskId'])
  },
  methods: {
    handleChange(val){
      if(val===1){
       this.$router.push({path:'/'})
      }
    },
    getMenus(){
      loadParticipativeAuditTaskData({auditFirmId:this.auditFirmId}).then(res=>{
        if(res.code==1){
          this.menus=res.data
          if(this.menus.length===0){
            this.menus.push({companyName:'暂无数据！！！'})
          }
          this.$store.commit('setAuditTaskId',res.data[0].auditTaskId)
        }
      })
    },
    getData(item){
      if(!item.companyId){
        return
      }
      this.companyId = item.companyId
      this.$store.commit('setCompanyId',item.companyId)
      const data={
        auditTaskId:this.auditTaskId,
        companyId:item.companyId
      }
      loadAuditProcessOptionData(data).then(res=>{
        if(res.code===1){
          this.slectOption=res.data
          this.slectOption.unshift({
            processId:null,
            processName:'全部'
          })
        }
      })
    },
    showDrawer(){
      this.drawer = true
      let data={
        auditTaskId:this.auditTaskId,
        companyId:this.companyId,
        pageNum:1,
        pageSize:50
      }
      // 判断是否需要传processId
      data=this.processId ? {...data,processId:this.processId} : data
      loadRiskData(data).then(res=>{
        this.tableData=res.data.records
      })
    },
    handleClose(done){
      done()
    },
    changeProcessId(val){
      this.processId=val
    }
  }
}
</script>

<style lang="less">
.el-menu{
  border:none;
}
</style>
<style lang="less" scoped>
  .img-cont{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>