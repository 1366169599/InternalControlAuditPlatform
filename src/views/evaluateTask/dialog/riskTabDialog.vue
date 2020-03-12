<template>
  <div class="risk-dialog-cont">
    <el-dialog :visible="dialogVisible" width="800px" center top="20vh" title="测试风险指标"  @close="handleCancel">
      <div>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="名称">
            <el-input v-model="formData.indicationName" disabled size="mini" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="指标说明">
            <el-input 
            v-model="formData.indicationStatement"
            disabled   
            type="textarea"
            :rows="2"
            resize="none"
            size="mini" 
            style="width:500px"/>
          </el-form-item>
          <el-form-item label="指标值" prop="indicationValue">
            <el-input 
            v-model="formData.indicationValue"   
            size="mini"
            placeholder="0～100" 
            style="width:100px"/>
          </el-form-item>
          <el-form-item label="预警状况" prop="warningLevel">
            <el-radio-group v-model="formData.warningLevel">
              <el-radio :label="0">低</el-radio>
              <el-radio :label="1">中</el-radio>
              <el-radio :label="2">高</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="预警说明" prop="warningStatement">
            <el-input 
            v-model="formData.warningStatement"   
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容" 
            size="mini" 
            style="width:500px"/>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" style="margin-right:20px" @click="handleSubmit">保 存</el-button>
        <el-button size="small" @click="handleCancel">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { saveRiskWarningData } from '@/api'
import { mapGetters } from 'vuex'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    formData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      rules: {
        indicationValue: [{ required: true, message: '请输入指标值', trigger: 'blur' }],
        warningLevel: [{ required: true, message: '请选择预警等级', trigger: 'change' }],
        warningStatement: [{ required: true, message: '请输入预警说明', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['auditFirmId','auditTaskId','companyId'])
  },
  methods: {
    handleCancel () {
      this.$refs['form'].resetFields()
      this.$emit('update:dialogVisible', false)
    },
    handleSubmit(){
      this.$refs.form.validate((valid)=>{
        if(valid){
          const data={
            ...this.formData,
            auditTaskId:this.auditTaskId,
            companyId:this.companyId,
            auditFirmId:this.auditFirmId
          }
          saveRiskWarningData(data).then(res=>{
            if(res.code===1){
              this.$message.success('保存成功')
              this.handleCancel()
              this.$emit('onSuccess')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
.risk-dialog-cont{
  .el-form-item {
      margin-bottom: 10px;
  }
 .el-form-item__error {
   display: inline-block;
   position: relative;
   margin-left: 15px;
 }
}
</style>
