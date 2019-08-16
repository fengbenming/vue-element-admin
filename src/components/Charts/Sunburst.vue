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
      return store.state.sunburst.sunburst;
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
      var options = {
        title: {
          text: "分类销量",
          subtext: "Source: https://www.202832.com",
          textStyle: {
            fontSize: 14,
            align: "center"
          },
          subtextStyle: {
            align: "center"
          },
          sublink: "https://www.202832.com"
        },
        tooltip: {},
        series: {
          animation: true,
          type: "sunburst",
          highlightPolicy: "ancestor",
          nodeClick: "rootToNode",
          data: data,
          radius: [0, "95%"],
          sort: null,
          levels: [
            {},
            {
              r0: "15%",
              r: "35%",
              itemStyle: {
                borderWidth: 2
              },
              label: {
                rotate: "tangential"
              }
            },
            {
              r0: "35%",
              r: "70%",
              label: {
                align: "right"
              }
            },
            {
              r0: "70%",
              r: "72%",
              label: {
                position: "outside",
                padding: 3,
                silent: false
              },
              itemStyle: {
                borderWidth: 3
              }
            }
          ]
        }
      };

      this.chart.setOption(options);
    }
  },
  store
};
</script>
