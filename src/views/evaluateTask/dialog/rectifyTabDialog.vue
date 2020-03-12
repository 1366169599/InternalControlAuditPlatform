<template>
  <div class="risk-dialog-cont">
    <el-dialog :visible="dialogVisible" width="600px" center top="20vh" title="测试上期整改"  @close="handleCancel">
      <div>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="整改状态" prop="rectificationState">
            <el-radio-group v-model="formData.rectificationState">
              <el-radio :label="0">未通过</el-radio>
              <el-radio :label="1">通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formData.rectificationState===0" label="未整改说明" prop="failureReason">
            <el-input 
            v-model="formData.failureReason"
            type="textarea"
            :rows="5"
            resize="none"
            placeholder="请输入内容" 
            size="mini" 
            style="width:300px"/>
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
import { saveDefectRectificationConfirmation } from '@/api'
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
        rectificationState: [{ required: true, message: '请输入指标值', trigger: 'blur' }],
        failureReason: [{ required: true, message: '请输入预警说明', trigger: 'blur' }]
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
            auditFirmId:this.auditFirmId
          }
          saveDefectRectificationConfirmation(data).then(res=>{
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
