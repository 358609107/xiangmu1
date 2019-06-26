<template>

<!-- <div class="layout-warp">
        <p>Applayout  Component</p>

        <AppHeader></AppHeader>
    </div> -->
    <el-container class="el-container">
  <el-aside width="200px" class="el-aside"><AppAside></AppAside></el-aside>
  <el-container>
    <el-header class="el-header"><AppHeader/></el-header>
    <el-main class="el-main"><router-view></router-view></el-main>
  </el-container>
</el-container>

</template>

<script>
import AppAside from './components/AppAside';
import AppHeader from './components/AppHeader';

export default {
  name: 'Applayout',
  data () {
    return {

    };
  },
  components: {
    AppAside,
    AppHeader
  }

};
</script>

<style lang="less" scoped>
    .el-container{
        height: 100%;
    };
    .el-aside{
        background-color: #343a46;
    };
    .el-header{

    };
    .el-main{
        background-color: #f3f4f6;
    }

</style>
