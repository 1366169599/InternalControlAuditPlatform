<template>
  <div class="design-dialog-cont">
    <el-dialog :visible="dialogVisible" width="800px" center top="20vh" :title="defectType===0?'测试设计有效':'测试执行有效'"  @close="handleCancel">
      <div>
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="要素">
            <el-input v-model="formData.element" disabled size="mini" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="关键控制点">
            <el-input 
            v-model="formData.testContent"
            disabled   
            type="textarea"
            :rows="3"
            resize="none"
            size="mini" 
            style="width:500px"/>
          </el-form-item>
          <el-form-item label="是否为缺陷" prop="defectFlag">
            <el-radio-group v-model="formData.defectFlag">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
              <el-radio :label="-1">不适用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formData.defectFlag===1" label="缺陷描述" prop="defectDescription">
            <el-input 
            v-model="formData.defectDescription"   
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容" 
            size="mini" 
            style="width:500px"/>
          </el-form-item>
          <el-form-item v-if="formData.defectFlag===1" label="原因分析" prop="defectReason">
            <el-input 
            v-model="formData.defectReason"   
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入内容" 
            size="mini" 
            style="width:500px"/>
          </el-form-item>
          <el-form-item v-if="formData.defectFlag===1" label="整改意见" prop="recommend">
            <el-input 
            v-model="formData.recommend"   
            type="textarea"
            :rows="3"
            placeholder="请输入内容" 
            size="mini"
            resize="none" 
            style="width:500px"/>
          </el-form-item>
          <el-form-item v-if="formData.defectFlag===1" label="缺陷评级" prop="defectLevel">
            <el-radio-group v-model="formData.defectLevel" @change="handleChange">
              <el-radio :label="2">重大缺陷 (0~3)</el-radio>
              <el-radio :label="1">重要缺陷 (3~6)</el-radio>
              <el-radio :label="0">一般缺陷 (6~10)</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formData.defectFlag===1" label="得分" prop="points">
            <el-input-number v-model="formData.points" :min="min" :max="max" :step="0.1" style="120px"></el-input-number>
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
import { saveDefectData } from '@/api'
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
    },
    defectType:{
      type:Number,
      required: true
    }
  },
  data () {
    return {
      rules: {
        defectFlag: [{ required: true, message: '请选择是否为缺陷', trigger: 'blur' }],
        defectDescription: [{ required: true, message: '请输入缺陷描述', trigger: 'blur' }],
        defectLevel: [{ required: true, message: '请选择缺陷等级', trigger: 'blur' }],
        defectReason: [{ required: true, message: '请输入原因', trigger: 'blur' }],
        recommend: [{ required: true, message: '请输入整改意见', trigger: 'blur' }],
        points: [{ required: true, message: '请输入整改意见', trigger: 'blur' }]
      },
      min:0,
      max:10
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
    handleChange(val){
      if(val===0){
        this.min=6
        this.max=10
        this.formData.points=8        
      }
      if(val===1){
        this.min=3
        this.max=6 
        this.formData.points=5      
      }
      if(val===2){
        this.min=0
        this.max=3
        this.formData.points=2        
      }
    },
    handleSubmit(){
      this.$refs.form.validate((valid)=>{
        if(valid){
          const data={
            ...this.formData,
            auditTaskId:this.auditTaskId,
            auditFirmId:this.auditFirmId,
            companyId:this.companyId,
            defectType:this.defectType
          }
          saveDefectData(data).then(res=>{
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
.design-dialog-cont{
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
