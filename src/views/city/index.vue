<template>
  <div class="app-container">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree
      class="filter-tree"
      :data="list"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      ref="tree2"
    ></el-tree>
  </div>
</template>

<script>
import cityApi from "@/api/city";

export default {
  data() {
    return {
      filterText: "",
      list: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    fetchData: function() {
      cityApi.getList().then(res => {
        console.log(res.data);
        res.data.forEach(element => {
          this.list.push({
            id: element.id,
            label: element.name
          });
        });
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
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
