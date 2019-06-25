<template>
  <div class="login-wrap">
    <el-form class="login-form" ref="form" :model="sizeForm" :rules="rules" size="mini">
      <img src="../../assets/logo_index.png" alt="">
      <el-form-item  prop="mobile">
        <el-input  v-model="sizeForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item  prop="code">
        <el-input class="aaa" v-model="sizeForm.code" placeholder="验证码"></el-input>
         <el-button class="bbb" @click="showGeetest"
         :disabled ="!!codeTimer"
         >{{ codeTimer ? `剩余${codeTime}秒` : "获取验证码"}}</el-button>
      </el-form-item >
      <el-form-item  prop="agree">
       <el-checkbox v-model="sizeForm.agree">我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></el-checkbox>
       </el-form-item >
      <el-form-item>

        <el-button class="ccc" type="primary" @click="handleLogin" >登录</el-button>
        <el-button class="ccc">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import '@/vendor/gt';
export default {
  name: 'AppLogin',
  data () {
    return {
      sizeForm: {
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '清输入验证码', trigger: 'blur' },
          { pattern: /\d{11}/, message: '长度 6 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '清输入验证码', trigger: 'blur' },
          { pattern: /\d{6}/, message: '长度 6 个字符', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '未同意协议' },
          { pattern: /true/, message: '未同意协议' }
        ]
      },
      codeTimer: null,
      codeTime: 20

    };
  },
  methods: {
    handleLogin () {
      this.$refs['form'].validate(valid => {
        if (!valid) {

        }
      });
      this.subimiLogin();
    },

    subimiLogin () {
      const { mobile, code } = this.sizeForm;
      axios({
        method: 'POST',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/authorizations`,
        data: {
          mobile,
          code
        }
      }).then(res => {
        console.log(res.data);
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        this.$router.push({
          name: 'home'
        });
      })
        .catch((e) => {
          this.$message.error('登录失败，手机号或验证码错误');
        });
    },

    handleSendCode () {
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage) {
          return;
        }
        this.showGeetest();
      });
    },
    showGeetest () {
      const { mobile } = this.sizeForm;
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`

      }).then((res) => {
        // console.log(res.data)
        const { data } = res.data;
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, (captchaObj) => {
          // console.log(captchaObj);
          captchaObj.onReady(function () {
            captchaObj.verify();
          }).onSuccess(() => {
            // console.log(captchaObj.getValidate())
            const { geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate
            } = captchaObj.getValidate();
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then((res) => {
              this.codedown();
            });
          }).onError(() => {
          });
        });
      });
    },
    codedown () {
      this.codeTimer = window.setInterval(() => {
        this.codeTime--;
        if (this.codeTime <= 0) {
          window.clearInterval(this.codeTimer);
          this.codeTime = 10;
          this.codeTimer = null;
        }
      }, 1000);
    }

  }
};
</script>

<style lang="less" scoped>
  .login-wrap {
      height:100%;
      background:url(../../assets/login_bg.jpg) no-repeat 100% 100% ;
      display:flex;
      justify-content:center;
      align-items:center;
      .login-form {
          height: 230px;
          width: 350px;
          background: #fff;
          border-radius:10px;
          padding:10px;

          img{
              width: 200px;
              margin-left: 20%;
          }
          .aaa{
            width: 230px;
          }
          .bbb{
            margin-left: 20px;
          }
          .bbb:hover{
            color: aqua;

          }
          .ccc{
            margin-top: 10px;
          width: 100px;
          }
      }
  }
</style>
