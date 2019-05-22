<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
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
    xAxisData() {
      return store.state.sellChart.xAxisData;
    },
    seriesData() {
      return store.state.sellChart.seriesData;
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
      this.series = []
      this.chart = echarts.init(document.getElementById(this.id));
      for (var index in this.seriesData) {
        var areaStyleColorArr = ["rgba(137, 189, 27, 0.3)","rgba(0, 136, 212, 0.3)","rgba(219, 50, 51, 0.3)","rgba(300, 90, 800, 0.3)","rgba(400, 30, 600, 0.3)","rgba(350, 360, 660, 0.3)"]
        var areaStyleColor
        if(index<areaStyleColorArr.length){
            areaStyleColor = areaStyleColorArr[index]
        }
        
        var itemStyleColorArr = ["rgb(137, 189, 27)","rgb(0, 136, 212)","rgb(219, 50, 51)","rgb(300, 90, 800)","rgb(400, 30, 600)","rgb(350, 360, 660)"]
        var itemStyleColor
        if(index<itemStyleColorArr.length){
            itemStyleColor = itemStyleColorArr[index]
        }
        
        var item = {
            name: this.websites[index],
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: areaStyleColor
                    },
                    {
                      offset: 0.8,
                      color: areaStyleColor
                    }
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: itemStyleColor,
                borderColor: "rgba(137,189,2,0.27)",
                borderWidth: 12
              }
            },
            data: this.seriesData[index]
          }
        this.series[index]=item
      }
      this.chart.setOption({
        backgroundColor: "#394056",
        title: {
          top: 20,
          text: "Requests",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#F1F1F3"
          },
          left: "1%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B"
            }
          }
        },
        legend: {
          top: 20,
          icon: "rect",
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: this.websites,
          right: "4%",
          textStyle: {
            fontSize: 12,
            color: "#F1F1F3"
          }
        },
        grid: {
          top: 100,
          left: "2%",
          right: "2%",
          bottom: "2%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#57617B"
              }
            },
            data: this.xAxisData
          }
        ],
        yAxis: [
          {
            type: "log",
            name: "(%)",
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#57617B"
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: "#57617B"
              }
            }
          }
        ],
        series: this.series
      });
    }
  },
  store
};
</script>
