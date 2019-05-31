<template>
  <div class="app-container" style="position: absolute;top: 5%;left: 5%;">
    <div class="filter-container">
      <el-input
        placeholder="请输入关键词 可带站点名称"
        style="width: 210px;"
        class="filter-item"
        v-model="listQuery.keywords"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
    </div>
    <div style="position: relative;">
      <el-collapse accordion style="width:800px;overflow:auto;">
        <el-collapse-item v-for="item in list" :key="item.id" style="overflow:auto;">
          <template slot="title" style="overflow:auto;">
            <span>{{websiteKeys[item.websiteName]}} {{item.saleName}}</span>
          </template>
          <div>{{item.brand}}</div>
          <div>{{item.price}}</div>
          <div>{{item.saleName}}</div>
          <!-- <el-link @click="goToDetail(item)" type="success">详情</el-link> -->
          <span class="link-type" @click="goToDetail(item)">详情</span>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { search } from "@/api/search";
import store from "../../store/index.js";
import waves from "@/directive/waves"; // Waves directive

export default {
  directives: { waves },
  data() {
    return {
      websiteKeys:{}
    };
  },
  computed: {
    list() {
      return store.state.soso.list;
    },
    listQuery() {
      return store.state.soso.listQuery;
    },
    websiteNames(){
      return store.state.commonData.websiteNames
    },
  },
  mounted(){
    for( var index in this.websiteNames){
      this.websiteKeys[this.websiteNames[index].key] = this.websiteNames[index].label+": \r\n"
    }
  },
  methods: {
    handleFilter() {
      this.searchProduct();
    },
    searchProduct() {
      this.searchLoading = true;
      search(this.listQuery).then(response => {
        console.log(response);
        this.listQuery.cursor = response.cursor;
        store.commit("soso/refreshData", response.related);
        store.commit("soso/refreshParam", this.listQuery);
        this.searchLoading = false;
      });
    }
  }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #67c23a;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  font-size: 30px;
  font-family: "PingFang SC";
  color: green;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
