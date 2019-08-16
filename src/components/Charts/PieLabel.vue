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
    pieData() {
      if (this.id == "pie1") {
        console.log(this.id);
        return store.state.pie.pieData1;
      }
      return store.state.pie.pieData;
    }
  },
  watch: {
    pieData: function(newVal, oldVal) {
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
      console.log(this.pieData);
      this.series = [];
      this.chart = echarts.init(document.getElementById(this.id));
      var uploadedDataURL = "/asset/get/s/data-1559121268278-ozjd-lXoz.png";

      var uploadedDataURL = "/asset/get/s/data-1559121263841-UC5w7mTJ9.png";

      var uploadedDataURL = "/asset/get/s/data-1559121259198-sxyPSimU9.png";

      var uploadedDataURL = "/asset/get/s/data-1559121254241-xj5JAIBzC.png";

      var uploadedDataURL = "/asset/get/s/data-1559121249274-QxHDAdQGy.png";

      var colorList = [
        "#afa3f5",
        "#00d488",
        "#3feed4",
        "#3bafff",
        "#f1bb4c",
        "rgba(250,250,250,0.5)"
      ];
      var sportsIcon = {
        a: "/asset/get/s/data-1559121268278-ozjd-lXoz.png",
        b: "/asset/get/s/data-1559121263841-UC5w7mTJ9.png",
        c: "/asset/get/s/data-1559121259198-sxyPSimU9.png",
        d: "/asset/get/s/data-1559121254241-xj5JAIBzC.png",
        e: "/asset/get/s/data-1559121249274-QxHDAdQGy.png"
      };
      var option = {
        title: {
          text: this.pieData[0].value + this.pieData[1].value,
          subtext: "销售总额",
          x: "center",
          y: "center",
          textStyle: {
            fontSize: 12,
            fontWeight: "normal",
            color: ["#333"]
          },
          subtextStyle: {
            color: "#666",
            fontSize: 13
          }
        },
        grid: {
          bottom: 150,
          left: 0,
          right: "10%"
        },
        legend: {
          show: false,
          orient: "vertical",
          top: "middle",
          right: "5%",
          textStyle: {
            color: "#f2f2f2",
            fontSize: 10
          },
          icon: "roundRect"
        },
        series: [
          // 主要展示层的
          {
            radius: ["25%", "51%"],
            center: ["50%", "50%"],
            type: "pie",
            itemStyle: {
              normal: {
                color: function(params) {
                  return colorList[params.dataIndex];
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 15,
                length2: 120,
                lineStyle: {
                  color: "#d3d3d3"
                },
                align: "right"
              },
              color: "#000",
              emphasis: {
                show: true
              }
            },
            label: {
              normal: {
                formatter: function(params) {
                  var str = "";
                  switch (params.name) {
                    case "yes":
                      str =
                        "{a|}\n{nameStyle|激活老用户 }" +
                        "{rate|" +
                        params.value +
                        "}";
                      break;
                    case "no":
                      str =
                        "{b|}\n{nameStyle|其它 }" +
                        "{rate|" +
                        params.value +
                        "}";
                      break;
                    case "old":
                      str =
                        "{c|}\n{nameStyle|老用户 }" +
                        "{rate|" +
                        params.value +
                        "}";
                      break;
                    case "new":
                      str =
                        "{d|}\n{nameStyle|新用户 }" +
                        "{rate|" +
                        params.value +
                        "}";
                      break;
                    case "体育知识":
                      str =
                        "{e|}\n{nameStyle|体育知识 }" +
                        "{rate|" +
                        params.value +
                        "%}";
                      break;
                  }
                  return str;
                },
                padding: [0, -110],
                height: 165,
                rich: {
                  a: {
                    width: 38,
                    height: 38,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.e
                    },
                    align: "left"
                  },
                  b: {
                    width: 29,
                    height: 45,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.d
                    },
                    align: "left"
                  },
                  c: {
                    width: 34,
                    height: 33,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.c
                    },
                    align: "left"
                  },
                  d: {
                    width: 34,
                    height: 44,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.b
                    },
                    align: "left"
                  },
                  e: {
                    width: 38,
                    height: 30,
                    lineHeight: 50,
                    backgroundColor: {
                      image: sportsIcon.a
                    },
                    align: "left"
                  },
                  nameStyle: {
                    fontSize: 14,
                    color: "#555",
                    align: "left"
                  },
                  rate: {
                    fontSize: 16,
                    color: "#1ab4b8",
                    align: "left"
                  }
                }
              }
            },
            data: this.pieData
          },
          // 边框的设置
          {
            radius: ["47%", "51%"],
            center: ["50%", "50%"],
            type: "pie",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                color: "rgba(250,250,250,0.5)"
              }
            },
            data: [
              {
                value: 1
              }
            ]
          }
        ]
      };
      this.chart.setOption(option);
    }
  },
  store
};
</script>
