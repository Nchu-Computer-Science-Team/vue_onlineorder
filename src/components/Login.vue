<template>
  <div class="login_container">
    <div class="login_box">
      <div class="login_title_box">
        <img src="../assets/head.png" class="login_icon"/>
        <h3 class="login_title">超好吃料理店后台管理系统</h3>
      </div>
      <el-form ref="loginFormRef" label-width="80px" class="login_form" :model="loginForm" :rules="login_rules">
        <!--用户名-->
        <el-form-item label-width="0" prop="name">
          <el-input prefix-icon="el-icon-user" placeholder="请输入账号" v-model="loginForm.name"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item label-width="0" prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password"
                    show-password></el-input>
        </el-form-item>
        <el-form-item label-width="0" class="login_buttons">
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="info" @click="resetLoginForm">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //表单数据绑定对象
      loginForm: {
        name: '',
        password: ''
      },
      //数据校验规则对象
      login_rules: {
        name: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      let self = this;
      this.$refs.loginFormRef.validate(async valid => {
        //验证通过，则valid为true
        if (!valid) {
          this.$message({
            message: "账号或密码不能为空",
            type: "error"
          });
          return;
        }
        //通过axios发起登录请求
        const {data: res} = await this.$http.post("login", this.loginForm);
        //获得请求结果后，判断状态
        if (res.meta.status !== "200") {
          //状态不等于200登录失败
          this.$message({
            message: res.meta.msg,
            type: "error"
          });
        } else {
          //登录成功
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
          self.$router.push('/Home').then(r => {});
        }
      });
    },

    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    }
  }
}

</script>

<style scoped>
.login_container {
  background-color: #2b3b4b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #eee;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px;
}

.login_title_box {
  text-align: center;
  width: 300px;
  height: 60px;
  line-height: 60px;
  background-color: #eee;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px;
}

.login_icon {
  vertical-align: middle;
  width: 40px;
  height: 40px;
}

.login_title {
  display: inline;
}

.login_buttons {
  display: flex;
  justify-content: center;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 35px 50px;
  box-sizing: border-box;
}

</style>
