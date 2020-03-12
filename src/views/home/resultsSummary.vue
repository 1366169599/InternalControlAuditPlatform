<template>
  <div>
    <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="缺陷汇总" name="first">
          <defect-tab
            :processOption="processOption"
            :defectLevelOption="defectLevelOption"
            :defectTypeOption="defectTypeOption"
            :companyOption="companyOption"
          ></defect-tab>
        </el-tab-pane>
        <el-tab-pane label="整改汇总" name="second">
          <defect-rectify-tab
            :companyOption="companyOption"
            :rectifyOption="rectifyOption"
          ></defect-rectify-tab>          
        </el-tab-pane>
        <el-tab-pane label="预警汇总" name="third">
          <risk-warning-tab
            :companyOption="companyOption"
            :processOption="processOption"
            :warningLevelOption="warningLevelOption"
          ></risk-warning-tab>          
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import defectTab from './components/defectTab'
import defectRectifyTab from './components/defectRectifyTab'
import riskWarningTab from './components/riskWarningTab'
import { loadProcessStandardData } from '@/api'

export default {
  components: { defectTab, defectRectifyTab,riskWarningTab },
  data() {
    return {
      activeName: 'first',
      processOption:[],
      defectLevelOption:[
        {
          value:null,
          label:'全部'
        },
        {
          value:0,
          label:'一般缺陷'
        },
        {
          value:1,
          label:'重要缺陷'
        },
        {
          value:2,
          label:'重大缺陷'
        }
      ],
      defectTypeOption:[
        {
          value:null,
          label:'全部'
        },
        {
          value:0,
          label:'设计缺陷'
        },
        {
          value:1,
          label:'执行缺陷'
        }
      ],
      companyOption:[
        {
          value:null,
          label:'全部'
        }
      ],
      rectifyOption:[
        {
          value:null,
          label:'全部'
        },
        {
          value:0,
          label:'未整改'
        },
        {
          value:1,
          label:'已整改'
        }        
      ],
      warningLevelOption:[
        {
          value:null,
          label:'全部'
        },
        {
          value:0,
          label:'低级'
        },
        {
          value:1,
          label:'中级'
        },
        {
          value:2,
          label:'高级'
        }         
      ]
    };
  },
  mounted(){
    this.getProcessOption()
  },
  methods:{
    handleChangeProcess(){},
    getProcessOption(){
      loadProcessStandardData().then(res=>{
        if(res.code===1){
          this.processOption=res.data
          this.processOption.unshift({processId:null,processName:'全部'})
        }
      })
    }
  }
}
</script>

<style>

</style>