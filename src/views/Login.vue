<template>
  <div class="login">
    <div class="contains">
      <h2>WEB ADMIN</h2>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="用户名"
                      prop="username"
                      class="demo1">
          <el-input v-model="ruleForm.username"
                    placeholder="请输入用户名"
                    prefix-icon='el-icon-user'></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password"
                      class="demo1">
          <el-input v-model="ruleForm.password"
                    type="password"
                    placeholder="请输入密码"
                    prefix-icon='el-icon-lock'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')"
                     class="left">登录</el-button>
          <el-button @click="resetForm('ruleForm')"
                     class="right">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- svg -->
    <svg class="editorial"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 24 150 28"
         preserveAspectRatio="none">
      <defs>
        <path id="gentle-wave"
              d="M-160 44c30 0   58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave"
             x="50"
             y="0"
             fill="#4579e2" />
        <use xlink:href="#gentle-wave"
             x="50"
             y="3"
             fill="#3461c1" />
        <use xlink:href="#gentle-wave"
             x="50"
             y="6"
             fill="#2d55aa" />
      </g>
    </svg>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { initDnameicRoutes } from '../router/index'
//利用辅助函数实现存data
export default {
  name,
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    ...mapMutations(['getLogin']),
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$Api.login({
            username: this.ruleForm.username,
            password: this.ruleForm.password
          }).then(res => {
            console.log(res);
            console.log(res.data.token);
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/')
            this.getLogin(res.data)
            initDnameicRoutes()
          })
        } else {
          alert('密码错误,请重新输入！')
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.contains {
  width: 500px;
  height: 260px;
  margin: 50px auto;
  /* border: 1px solid red; */
  background: #4a6c93;
}
h2 {
  text-align: center;
}
.demo-ruleForm {
  /* border: 1px solid red; */
  margin-top: 30px;
}
.demo1 {
  display: block;
  width: 400px;
  margin-left: 15px;
  /* margin-left */
}
.left {
  float: left;
  margin-left: 16px;
}
.right {
  float: right;
  margin-right: 80px;
}
/* 设置背景颜色 */
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #224469;
}
.parallax > use {
  animation: move-forever 12s linear infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
}

.parallax > use:nth-child(2) {
  animation-delay: -2s;
  animation-duration: 5s;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 3s;
}

@keyframes move-forever {
  0% {
    transform: translate(-90px, 0%);
  }

  100% {
    transform: translate(85px, 0%);
  }
}

.editorial {
  position: absolute;
  bottom: 0;
  display: block;
  width: 100%;
  height: 10em;
  max-height: 100vh;
  margin: 0;
}
</style>