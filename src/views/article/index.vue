<template>
  <div>
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <span>数据筛选</span>
        <el-button style="float:right;padding:3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">{{'列表内容'+o}}</div>
    </el-card>
    <el-card class="box-card">
      <div slot="headr" class="clearfix">
        <span>一共有xxx条数据</span>
        <el-button style="float:right;padding:3px 0" type="text">操作按钮</el-button>
      </div>
      <el-table
       v-loading="loading"
         element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :disabled="loading"
      :data="tableData"
      style="width: 100%">
       <el-table-column

        label="封面"
        width="180">
        <!-- <template slot-scope="scope"><img :src="scope.row.cover.images[0]" alt=""></template> -->

        <template slot-scope="scope" >
            <img  width="20"
            v-for="item in scope.row.cover.images" :key="item" src="item" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态">
         <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">{{statTypes[scope.row.status].label}}</el-tag>

         </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="操作"
        width="180"
        >
        <template >
          <el-button size="mini" type="primary" plain>修改</el-button>
          <el-button size="mini" type="danger" plain>删除</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <!--
      数据分页
      page-size 配置每页大小，默认是10
      total 用来配置总记录数
      分页组件会根据每页大小和总记录数进行分页
     -->
    <el-pagination
     background
     layout="prev,pager,next"
     :page-size="pageSize"
     :total="totalCount"
     @current-change="handleCurrentChange"
     >
     </el-pagination>

    </el-card>

  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: 'ArticleList',
  data () {
    return {
      tableData: [],
      statTypes: [
        {
          type: 'info',
          label: '草稿'
        }, {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }

      ],
      pageSize: 10, // 每页大小
      totalCount: 0, // 总数据量
      page: 1,
      loading: false
    };
  },
  created () {
    this.loadAriticles();
  },
  methods: {
    async loadAriticles () {
      this.loading = true;
      const data = await Axios({
        method: 'GET',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles',
        params: {
          page: this.page,
          per_page: this.pageSize

        }
      });
      // console.log(data.results);
      this.tableData = data.results;
      this.totalCount = data.total_count;
      this.loading = false;
    },
    handleCurrentChange (page) {
      console.log(page);
      this.page = page;
      this.loadAriticles();
    }

  }

};
</script>

<style lang="less" scoped>
    .filter-card{
        margin-bottom: 15px;
    };
    .article-list{
        margin-bottom: 30px;
    }

</style>
