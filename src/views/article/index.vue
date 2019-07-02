<template>
  <div>
     <el-form ref="filterPrams" :model="filterPrams" label-width="80px">
         <el-form-item label="状态">
    <el-radio-group v-model="filterPrams.status">
      <el-radio label="全部"></el-radio>
      <el-radio
      v-for="(item,index) in statTypes"
      :key="item.lable"
      :label="index"
      >{{item.label}}</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="频道">
    <el-select
     v-model="filterPrams.channel_id"
    placeholder="请选择活动区域"
     clearable
    >
      <el-option
      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      ></el-option>

    </el-select>
  </el-form-item>

  <el-form-item label="时间">
   <el-date-picker
   value-format="yyyy-MM-dd"
      v-model="range_date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="handleDateChange"
      >
    </el-date-picker>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="filterPrams.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary"
     @click="onSubmit"
     :loading="loading"
     >查询</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>

     <!-- 内容列表 -->
    <el-card class="box-card">
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
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain>修改</el-button>
          <el-button
          size="mini"
          type="danger"
          plain
          @click="handleDelete(scope.row)"
          >删除</el-button>

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
    :current-page="page"
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
      range_date: '',
      channels: [],
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
      loading: false,
      filterPrams: {
        status: '', // 文章状态
        channel_id: '', // 频道ID
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间

      }
    };
  },
  created () {
    this.loadAriticles();
    this.loadChannels();
  },
  methods: {

    async handleDelete (item) {
      try {
        // console.log(item.id.toString());
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        await Axios({
          method: 'DELETE',
          url: `http://ttapi.research.itcast.cn/mp/v1_0/articles/${item.id}`
        });
        this.loadAriticles();
      } catch (err) {
        this.$message.error('删除失败');
      }
    },
    onSubmit () {
      this.page = 1;
      this.loadAriticles();
    },
    async loadAriticles () {
      try {
        this.loading = true;
        const filterDate = {};
        for (let key in this.filterPrams) {
          const item = this.filterPrams[key];
          if (item !== null && item !== undefined && item !== '') {
            filterDate[key] = item;
          }
        }
        const data = await Axios({
          method: 'GET',
          url: 'http://ttapi.research.itcast.cn/mp/v1_0/articles',
          params: {
            page: this.page,
            per_page: this.pageSize,
            ...filterDate

          }
        });
        // console.log(data);
        this.tableData = data.results;
        this.totalCount = data.total_count;
        this.loading = false;
      } catch (err) {
        this.$message.error('加载文章列表失败', err);
      }
    },
    handleCurrentChange (page) {
      console.log(page);
      this.page = page;
      this.loadAriticles();
    },
    async loadChannels () {
      try {
        const data = await Axios({
          method: 'GET',
          url: 'http://ttapi.research.itcast.cn/mp/v1_0/channels'
        });

        this.channels = data.channels;
        // console.log(this.channels)
      } catch (err) {
        console.log(err);
        this.$message.error('获取频道列表失败');
      }
    },
    handleDateChange (value) {
      console.log(value);
      this.filterPrams.begin_pubdate = value[0];
      this.filterPrams.end_pubdate = value[1];
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
