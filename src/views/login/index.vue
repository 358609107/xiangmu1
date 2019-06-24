<template>
  <div class="login-wrap">
    <el-form class="login-form" ref="form" :model="sizeForm"  size="mini">
      <img src="../../assets/logo_index.png" alt="">
      <el-form-item >
        <el-input  v-model="sizeForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input class="aaa" v-model="sizeForm.code" placeholder="验证码"></el-input>
         <el-button class="bbb" @click="handleSendCode">发送验证码</el-button>
      </el-form-item>
      <input  type="radio"> 我已阅读用户协议和隐私条款
      <el-form-item>

        <el-button class="ccc" type="primary" @click="onSubmit" >登录</el-button>
        <el-button class="ccc">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppLogin',
  data () {
    return {
      sizeForm: {
        mobile: '',
        code: ''
      }
    };
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    handleSendCode () {
      const { mobile } = this.sizeForm;
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`

      }).then((res) => {
        console.log(res.data);
      });
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
