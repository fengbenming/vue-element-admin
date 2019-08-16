<template>
  <div class="chart-container">
    <div class="filter-container" style="padding-bottom:0px">
      <el-select
        v-model="listQuery.websiteName"
        :placeholder="$t('magic.websiteName')"
        clearable
        default-first-option
        style="width: 110px"
        class="filter-item"
      >
        <el-option
          v-for="item in websiteNames"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-date-picker
        style="width: 150px;bottom: 4px;"
        v-model="listQuery.month"
        type="month"
        placeholder="选择月"
      ></el-date-picker>
      <el-input
        v-model="listQuery.categoryName"
        placeholder="请输入分类名称"
        style="width: 200px;"
        class="filter-item"
        :disabled="true"
        @change="handleChange"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="refreshData"
      >{{ $t('table.search') }}</el-button>
    </div>
    <chart height="95%" width="100%" id="sell" />
  </div>
</template>

<script>
import Chart from "@/components/Charts/HistogramXYChange";
import store from "../../../store/index.js";
import { ProductCategorySaleStatics } from "@/api/sell";
export default {
  store,
  name: "ProductCategorySaleStatics",
  components: { Chart },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        websiteName: "202832",
        date: [],
        month: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
      }
    };
  },
  computed: {
    websiteNames() {
      return store.state.commonData.websiteNames;
    }
  },
  mounted() {
    console.log(this.$route.query);
    this.listQuery.categoryName = this.$route.query.categoryName;
    this.listQuery.websiteName = this.$route.query.websiteName;
    this.refreshData();
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    refreshData() {
      var param = {
        websiteName: this.listQuery.websiteName,
        dimension: "m",
        month: this.listQuery.month,
        categoryName: this.listQuery.categoryName
      };
      if (this.listQuery.websiteName == "202832") {
        param.dimension = "om";
      }
      if (param.categoryName == "") {
        alert("分类名称不能为空");
      }
      console.log(param);
      ProductCategorySaleStatics(param).then(response => {
        console.log(response);
        store.commit("sellChart/refreshChart", response);
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

