<template>
  <div class="login-wrap">
    <el-form class="login-form" ref="form" :model="sizeForm"  size="mini">
      <el-form-item >
        <el-input v-model="sizeForm.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="sizeForm.code" placeholder="验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" >登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
    }
  }
};
</script>

<style lang="less" scoped>
  .login-wrap {
      height:100%;
      background:pink;
      display:flex;
      justify-content:center;
      align-items:center;
      .login-form {

      }
  }
</style>
