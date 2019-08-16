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
        style="width: 300px;bottom: 4px;"
        v-model="listQuery.month"
        type="month"
        placeholder="选择月"
      ></el-date-picker>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="refreshData"
      >{{ $t('table.search') }}</el-button>
    </div>
    <el-row style="background:#fff;padding:10px 10px 0;margin-bottom:20px;">
      <el-col :span="12">
        <pie height="200px" width="80%" id="pie" />
      </el-col>
      <el-col :span="12">
        <pie2 height="200px" width="80%" id="pie1" />
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <chart height="400px" width="100%" id="sell" initXaxisEnd="3" />
    </el-row>
  </div>
</template>

<script>
import Chart from "@/components/Charts/Histogram";
import Pie from "@/components/Charts/PieLabel";
import Pie2 from "@/components/Charts/PieLabel";
import store from "../../../store/index.js";
import { userSaleStatics } from "@/api/sell";
import RaddarChart from "../../dashboard/admin/components/RaddarChart";
import PieChart from "../../dashboard/admin/components/PieChart";
import BarChart from "../../dashboard/admin//components/BarChart";

export default {
  store,
  name: "UserSale",
  components: { Chart, Pie, Pie2 },
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
      return [{ label: "口腔新干线", key: "202832" }];
    }
  },
  mounted() {
    this.refreshData();
  },
  methods: {
    refreshData() {
      var param = {
        websiteName: this.listQuery.websiteName,
        dimension: "m",
        month: this.listQuery.month
      };
      console.log(param);
      userSaleStatics(param).then(response => {
        console.log(response);
        store.commit("sellChart/refreshChart", response);
        store.commit("pie/refreshChart", response);
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  /* height: calc(100vh - 84px); */
}
</style>

