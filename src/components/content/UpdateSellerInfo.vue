<template>
  <div class="content">
    <el-form ref="formRef" :model="form" label-width="80px" :rules="validateRules">
      <el-form-item label="头像URL" prop="icon">
        <el-input v-model="form.icon" placeholder="请输入店铺头像的URL"></el-input>
      </el-form-item>
      <el-form-item label="店铺描述" prop="description">
        <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 3, maxRows: 6}"
                  placeholder="请输入店铺的描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交修改</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UpdateSellerInfo",
  data() {
    return {
      form: {
        icon: null,
        description: ""
      },
      validateRules: {
        icon: [
          {required: true, message: "必填", trigger: 'blur'}
        ],
        description: [
          {required: true, message: "必填", trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit: async function () {
      this.$refs.formRef.validate(valid => {
        if (!valid) {
          this.$message({
            message: "url或描述不能为空",
            type: "error"
          })
          return;
        }
      })

      const {data: res} = await this.$http.post("seller/update", this.form);
      if (res.meta.status !== "200") {
        //状态不等于200
        this.$message({
          message: res.meta.msg,
          type: "error"
        });
      } else {
        //成功
        this.$message({
          message: res.meta.msg,
          type: "success"
        });
      }
    }
  }

}
</script>

<style scoped>
.content {
  height: 100%;
  width: 100%;
  margin-top: 40px;
}
</style>
