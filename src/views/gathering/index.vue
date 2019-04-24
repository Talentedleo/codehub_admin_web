<template>
<div class="app-container">
    <!-- 条件查询 -->
    <el-form :inline="true" :model="searchData" class="demo-form-inline">
    <el-form-item label="活动名称">
        <el-input v-model="searchData.name" placeholder="活动名称"></el-input>
    </el-form-item>
    <el-form-item label="活动日期">
        <el-date-picker type="date" placeholder="选择开始日期" v-model="searchData.starttime"></el-date-picker>
        -
        <el-date-picker type="date" placeholder="选择结束日期" v-model="searchData.endtime"></el-date-picker>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <!-- pojo = {}: 每次按新增,清空pojo -->
        <el-button type="primary" @click="dialogVisible = true; pojo = {}; id = 0">新增</el-button>
    </el-form-item>
    </el-form>

    <!-- 列表数据 -->
    <el-table :data="list" border style="width: 100%">
        <!-- 去掉width就可以自适应撑开格子 -->
        <el-table-column prop="id" label="活动 ID" width="180"></el-table-column>
        <el-table-column prop="name" label="活动名称"></el-table-column>
        <el-table-column prop="sponsor" label="主办方" width="180"></el-table-column>
        <el-table-column prop="address" label="活动地址"></el-table-column>
        <el-table-column prop="starttime" label="开始日期" width="180"></el-table-column>
        <el-table-column prop="endtime" label="结束日期" width="180"></el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="findById(scope.row)">编辑</el-button>
                <el-button type="text" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
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

    <!-- 弹出框 -->
    <el-dialog  title="活动编辑" :visible.sync="dialogVisible" >
    <el-form label-width="80px">
      <el-form-item label="活动名称">
          <el-input v-model="pojo.name" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="基本地址">
          <el-input v-model="pojo.address"  placeholder="基本地址"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
          <el-date-picker type="date"  v-model="pojo.starttime" placeholder="开始日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="截至日期">
          <el-date-picker type="date" v-model="pojo.endtime"  placeholder="截至日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="报名截止">
          <el-date-picker type="date" v-model="pojo.enrolltime"  placeholder="报名截止"></el-date-picker>
      </el-form-item>
      <el-form-item label="活动详情">
         <el-input v-model="pojo.detail" placeholder="活动详情" type="textarea"  :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="城市">
          <el-select v-model="pojo.city" filterable placeholder="请选择">
            <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
       <el-form-item label="是否可见">
         <el-switch active-value="1" inactive-value="0" v-model="pojo.state"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogVisible = false" >关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</div>
</template>

<script>
  //调用api获取数据,@表示src目录下,导入getList方法
  //可以导入多个方法
  //import {getList, search} from '@/api/gathering'
  //打包导入
  import gatheringApi from '@/api/gathering'
  import cityApi from '@/api/city'
  export default {
    data() {
      return {
        list:[],
        pageNo: 1, //当前页,默认第一页
        pageSize: 10,
        searchData: {}, //查询条件
        currentPage: 1,
        total: 0,
        dialogVisible: false, //弹出框是否显示
        pojo: {}, //新增提交的表单对象
        cityList: [],
        id: 0
      }
    },
    methods: {
        fetchData: function(){
            // gatheringApi.getList().then(response => {
            //     console.log(response.data);
            //     this.list = response.data;
            // });
            //分页查询数据
            gatheringApi.search(this.pageNo, this.pageSize, this.searchData).then(res => {
                console.log(res.data.rows);
                //当前页数据
                this.list = res.data.rows;
                //总记录数
                this.total = res.data.total;
            })
        },
        //此方法要完成两个功能:保存,更新
        handleSave(){
            /**
            //新增
            if(this.pojo.id===undefined){
                gatheringApi.save(this.pojo).then(res => {
                    alert(res.message);
                    if (res.flag){
                        this.dialogVisible = false //新增成功,关闭弹窗
                        this.fetchData() //刷新列表
                    }
                })
            }
            //更新
            else{
                gatheringApi.update(this.pojo.id, this.pojo).then(res => {
                    alert(res.message);
                    if (res.flag){
                        this.dialogVisible = false //更新成功,关闭弹窗
                        this.fetchData() //刷新列表
                    }
                })
            }
            */
            gatheringApi.update(this.id, this.pojo).then(res => {
                //alert(res.message);
                //美化原来的弹窗
                this.$message({
                    message: res.message,
                    type: (res.flag? 'success':'error')
                });
                if (res.flag){
                    this.dialogVisible = false //更新成功,关闭弹窗
                    this.fetchData() //刷新列表
                }
            })
        },
        findById(data){
            //上面scope.row把整行数据传过来
            //alert(JSON.stringify(data));
            /** 第一种回显方法
            this.pojo = data; //给pojo赋值
            this.dialogVisible = true; //回显数据
            */
            // 第二种回显数据方法:从数据库查询
            gatheringApi.findById(data.id).then(res => {
                this.pojo = res.data;
                this.id = data.id; //中转id,判断是否是编辑
                this.dialogVisible = true;
            })
        },
        handleDelete(id){
            //alert(id);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //删除逻辑
                    gatheringApi.delete(id).then(res => {
                        this.$message({
                            message: res.message,
                            type: (res.flag? 'success':'error')
                        });
                        if (res.flag){
                            this.fetchData(); //刷新列表
                        }
                    });                   
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                });          
            });
        }
    },
    created () {
        //vue生命周期直接调用方法
        this.fetchData();
        //页面一开始就去查询城市列表
        cityApi.getList().then(res => {
            console.log(res.data);
            this.cityList = res.data;
        });
    }
  }
</script>

<style>

</style>