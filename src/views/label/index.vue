<template>
  <div class="app-container">
    <!-- 列表数据 -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="标签 ID" width="95"></el-table-column>
      <el-table-column prop="labelname" label="标签名称"></el-table-column>
      <el-table-column prop="state" label="状态" width="110"></el-table-column>
      <el-table-column prop="count" label="使用数量" width="110"></el-table-column>
      <el-table-column prop="recommend" label="是否推荐" width="110"></el-table-column>
      <el-table-column prop="fans" label="粉丝数量" width="200"></el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- page-sizes可以选择每页显示记录数, -->
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import labelApi from "@/api/label";

export default {
  data() {
    return {
      list: [],
      pageNo: 1, //当前页,默认第一页
      pageSize: 10,
      searchData: {}, //查询条件
      currentPage: 1,
      total: 0,
      dialogVisible: false, //弹出框是否显示
      pojo: {}, //新增提交的表单对象
      labelList: [],
      id: 0
    };
  },
  methods: {
    fetchData: function() {
      labelApi
        .search(this.pageNo, this.pageSize, this.searchData)
        .then(res => {
          console.log(res.data.rows);
          //当前页数据
          this.list = res.data.rows;
          //总记录数
          this.total = res.data.total;
        });
    },
    //此方法要完成两个功能:保存,更新
    handleSave() {
      labelApi.update(this.id, this.pojo).then(res => {
        //alert(res.message);
        //美化原来的弹窗
        this.$message({
          message: res.message,
          type: res.flag ? "success" : "error"
        });
        if (res.flag) {
          this.dialogVisible = false; //更新成功,关闭弹窗
          this.fetchData(); //刷新列表
        }
      });
    },
    findById(data) {
      labelApi.findById(data.id).then(res => {
        this.pojo = res.data;
        this.id = data.id; //中转id,判断是否是编辑
        this.dialogVisible = true;
      });
    },
    handleDelete(id) {
      //alert(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除逻辑
          labelApi.deleteById(id).then(res => {
            this.$message({
              message: res.message,
              type: res.flag ? "success" : "error"
            });
            if (res.flag) {
              this.fetchData(); //刷新列表
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    //vue生命周期直接调用方法
    this.fetchData();
  }
};
</script>

<style>
</style>
