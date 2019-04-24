<template>
  <div class="dashboard-container">

    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple title">欢迎 {{name}} 光临 码农CodeHub社交管理后台</div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
    </el-row>

    <hr>
    <br>

    <div class="content el-icon-d-arrow-right">
      姓名: {{name}}</div>
    <br>
    <br>
    <div class="content el-icon-d-arrow-right">
      角色:
      <span v-for="role in roles" :key="role">{{role}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "dashboard",
  computed: {
    ...mapGetters(["name", "roles"])
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #00BFFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

div {
  line-height: 35px;
  text-align: center;
  font-family: "Hiragino Sans GB";
  color: #606266;  
}
.title {
  font-size: 25px;
}
.content {
  width: 250px;
  font-size: 20px;
  border: 0px;
  border-radius: 30px;
  background-color: #f9fafc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}
</style>
