<template>
  <div>
    <el-row style="text-align:center;margin:40px">
      <h2>事务所内控评价报告</h2>
    </el-row>
    <el-row style="text-align:center;margin-top:100px">
      <el-upload
        drag
        :before-upload="beforeAvatarUpload"
        :limit="1"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        name="attachmentFile"
        :data="{auditTaskId:auditTaskId,companyId:companyId,auditFirmId:auditFirmId}"
        :action="uploadApi">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传docx文件</div>
      </el-upload>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return{
      uploadApi:'http://miyo-tech.iask.in:10012/business/auditFirm/auditTaskData/uploadAuditTaskAttachment'
    }
  },
  computed: {
    ...mapGetters(['auditFirmId','auditTaskId','companyId'])
  },
  methods:{
    beforeAvatarUpload(file){
      const isDocx = file.type==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      if(!isDocx){
        this.$message.warning('只能上传docx文件格式')
      }
      return isDocx
    },
    handleUploadError() {
      this.$message.error('上传失败，请稍后再试')
    },
    handleUploadSuccess() {
      this.$message.success('上传成功！')
    }
  }
}
</script>

<style>

</style>