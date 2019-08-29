<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
import store from "../../store/index.js";
export default {
  mixins: [resize],
  data() {
    return {
      series: []
    };
  },
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  computed: {
    seriesData() {
      return store.state.summary.summary;
    },
    websites() {
      return store.state.sellChart.websites;
    }
  },
  watch: {
    seriesData: function(newVal, oldVal) {
      this.initChart();
    }
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      var data = this.seriesData;
      this.chart = echarts.init(document.getElementById(this.id));

      var dateList = data.map(function(item) {
        return item[1];
      });
      var TotalSellMoney = data.map(function(item) {
        return item[2];
      });
      var BrandsNum = data.map(function(item) {
        return item[3];
      });
      var TotalProducts = data.map(function(item) {
        return item[4];
      });
      var ProductsNum = data.map(function(item) {
        return item[5];
      });
      var ProductSale20 = data.map(function(item) {
        return item[6];
      });
      var TotalUsers = data.map(function(item) {
        return item[7];
      });
      var UsersNum = data.map(function(item) {
        return item[8];
      });
      var TotalOrders = data.map(function(item) {
        return item[9];
      });
      var UsersSale20 = data.map(function(item) {
        return item[10];
      });

      var moneyPerUser = data.map(function(item) {
        return item[11];
      });
      var userOrderRate = data.map(function(item) {
        return item[12];
      });

      var option = {
        title: {
          text: "销售趋势总览"
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params, ticket, callback) {
            var res = params[0].axisValue + "<br>";
            for (var i = 0; i < params.length; i++) {
              if (params[i].seriesName.indexOf("比率") != -1) {
                res +=
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                  params[i].color +
                  ';"></span>' +
                  params[i].seriesName +
                  ": " +
                  Math.round(params[i].data * 10000) / 100 +
                  "%<br>";
              } else {
                res +=
                  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' +
                  params[i].color +
                  ';"></span>' +
                  params[i].seriesName +
                  ": " +
                  params[i].data +
                  "<br>";
              }
            }

            return res;
            // return '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#c23531;"></span>邮件营销: 210<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2f4554;"></span>联盟广告: 0.5<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#61a0a8;"></span>视频广告: 410<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#d48265;"></span>直接访问: 320<br><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#91c7ae;"></span>搜索引擎: 1,320';
          }
        },
        legend: {
          left: "10%",
          data: [
            "销售额",
            "用户总数",
            "下单用户数",
            "月销售品牌数",
            "商品总数",
            "月销售商品数",
            "月订单总数",
            "月平均用户下单额",
            "用户top20比率",
            "产品销量top20比率",
            "月用户下单比率"
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dateList
        },
        yAxis: {
          type: "log"
        },
        series: [
          {
            name: "销售额",
            type: "line",
            stack: "",
            data: TotalSellMoney
          },
          {
            name: "用户总数",
            type: "line",
            stack: "",
            data: TotalUsers
          },
          {
            name: "下单用户数",
            type: "line",
            stack: "",
            data: UsersNum
          },
          {
            name: "月销售品牌数",
            type: "line",
            stack: "",
            data: BrandsNum
          },
          {
            name: "商品总数",
            type: "line",
            stack: "",
            data: TotalProducts
          },

          {
            name: "月销售商品数",
            type: "line",
            stack: "",
            data: ProductsNum
          },
          {
            name: "月订单总数",
            type: "line",
            stack: "",
            data: TotalOrders
          },
          {
            name: "月平均用户下单额",
            type: "line",
            stack: "",
            data: moneyPerUser
          },
          {
            name: "用户top20比率",
            type: "line",
            stack: "",
            data: UsersSale20
          },
          {
            name: "产品销量top20比率",
            type: "line",
            stack: "",
            data: ProductSale20
          },
          {
            name: "月用户下单比率",
            type: "line",
            stack: "",
            data: userOrderRate
          }
        ]
      };

      this.chart.setOption(option);
    }
  },
  store
};
</script>

<style scoped>
.stackedLineChart {
  position: relative;
  width: 100%;
  /* height: calc(100vh - 84px); */
}
</style>
