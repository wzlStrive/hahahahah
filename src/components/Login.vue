<template>
  <div class="login_container">
    <div class="login_box">
      <!-- log -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- log结束 -->
      <!-- 表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="LoginForm"
        :rules="LoginFormRules"
        label-width="0"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="LoginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" v-model="LoginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 登录表单的数据邦定对象
      LoginForm: {
        username: 'admin',
        password: '123456'
      },
      //   表单验证规则对象
      LoginFormRules: {
        //   验证用户名
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        //   验证密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //   点击重置按钮 重置登录表单
    resetLoginForm() {
      //   console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid);
        if (!valid) return
        // 从对象身上把data结构赋值出来 在重命名
        const { data: res } = await this.$http.post('login', this.LoginForm)
        // console.log(res)
        if (res.meta.status !== 200) return this.$msg.error('登录失败')
        this.$msg({ message: '登录成功', type: 'success' })
        // 将登陆成功之后token保存到sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 通过编程式导航跳转到后台主页
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  overflow: hidden;
  background-color: rgb(69, 74, 136);
  height: 100%;
}
.login_box {
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #fff;
  margin: 200px auto;
  border-radius: 3px;
}
.avatar_box {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translate(-50%);
  width: 130px;
  height: 130px;
  border: 1px solid rgb(48, 104, 114);
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px rgb(46, 77, 163);
  background-color: #fff;
  img {
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>