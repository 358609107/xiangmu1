<template>

    <el-row  :gutter="200">
        <el-col :span="10">江苏传智播客教育科技股份有限公司  </el-col>
        <el-col :span="10">123456  </el-col>
        <el-dropdown>
           <!-- <img :src="userInfo.photo" alt=""> -->
      <span class="el-dropdown-link">
        {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >用户设置</el-dropdown-item>
        <el-dropdown-item >退出</el-dropdown-item>

      </el-dropdown-menu>
      </el-dropdown>
    </el-row>

</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {
      userInfo: {}
    };
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'));
  }
};
</script>

<style lang="less" scoped>

</style>
