<template>
  <!-- <div> -->
  <div
    :id="id"
    :class="className"
    :style="{height:height,width:width}"
    :initXaxisEnd="initXaxisEnd"
    :websiteName="websiteName"
  />

  <!-- </div> -->
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";
import store from "../../store/index.js";
export default {
  mixins: [resize],
  data() {
    return {
      series: [],
      dialogVisible: false
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
    },
    initXaxisEnd: {
      type: Number,
      default: 30
    },
    websiteName: {
      type: String,
      default: ""
    }
  },
  computed: {
    xAxisData() {
      return store.state.sellChart.xAxisData;
    },
    seriesData() {
      return store.state.sellChart.seriesData;
    }
    // websites() {
    //   return store.state.sellChart.websites;
    // }
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
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    initChart() {
      var that = this;
      this.series = [];
      this.option = {
        backgroundColor: "#323a5e",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "2%",
          right: "4%",
          bottom: "14%",
          top: "16%",
          containLabel: true
        },
        legend: {
          data: ["销售额", "销量"],
          right: 10,
          top: 12,
          textStyle: {
            color: "#fff"
          },
          itemWidth: 12,
          itemHeight: 10
          // itemGap: 35
        },
        yAxis: {
          type: "category",
          data: this.xAxisData,
          axisLine: {
            lineStyle: {
              color: "white"
            }
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: "Microsoft YaHei"
            },
            formatter: function(value) {
              return value;
            }
          }
        },

        xAxis: {
          type: "value",
          // max: "1200",
          // type: "log",
          // name: "(%)",
          axisLine: {
            show: false,
            lineStyle: {
              color: "white"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.3)"
            }
          },
          axisLabel: {}
        },

        dataZoom: [
          {
            type: "slider",
            show: true,
            yAxisIndex: [0],
            startValue: 0,
            endValue: 10,
            handleIcon:
              "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
            handleSize: "110%",
            handleStyle: {
              color: "#d3dee5"
            },
            textStyle: {
              color: "#fff"
            },
            borderColor: "#90979c"
          }
        ],

        // dataZoom: [
        //   {
        //     show: true,
        //     height: 12,
        //     yAxisIndex: [0],
        //     bottom: "8%",
        //     start: 0,
        //     end: this.initXaxisEnd,
        //     handleIcon:
        //       "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
        //     handleSize: "110%",
        //     handleStyle: {
        //       color: "#d3dee5"
        //     },
        //     textStyle: {
        //       color: "#fff"
        //     },
        //     borderColor: "#90979c"
        //   },
        //   {
        //     type: "inside",
        //     show: true,
        //     height: 150,
        //     start: 1,
        //     end: 35
        //   }
        // ],
        series: [
          {
            name: "销售额",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                label: {
                  show: false, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "white",
                    fontSize: 12
                  }
                },
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#fccb05"
                  },
                  {
                    offset: 1,
                    color: "#f5804d"
                  }
                ]),
                barBorderRadius: 12
              }
            },
            data: this.seriesData[0]
          },
          {
            name: "销量",
            type: "bar",
            barWidth: "15%",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#8bd46e"
                  },
                  {
                    offset: 1,
                    color: "#09bcb7"
                  }
                ]),
                barBorderRadius: 11
              }
            },
            data: this.seriesData[1]
          }
        ]
      };

      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(this.option);
      var that = this;
      this.chart.on("click", function(params) {
        console.log(params);
        console.log(that);
        if (that.id == "brandSale") {
          that.$router.push({
            path: `/magic/sale/brandProductSale`,
            query: {
              brand: params.name,
              websiteName: that.websiteName
            }
          });
        } else if (that.id == "categoryByMonth") {
          that.$router.push({
            path: `/magic/sale/ProductCategorySaleStatics`,
            query: {
              categoryName: params.name,
              websiteName: that.websiteName
            }
          });
        }
      });
    }
  },
  store
};
</script>
