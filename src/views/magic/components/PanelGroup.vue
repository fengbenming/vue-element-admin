<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="width:100%">
      <el-carousel :interval="400000" trigger="click" type="card" height="120px" @change="carouselChange">
        <el-carousel-item v-for="item in items" :key="item.productId">
          <el-card :body-style="{ padding: '0px' }">
            <!-- <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            >-->
            <div style="padding: 14px;">
              <span class="link-type" @click="handleDetail(item)">{{ item.saleName }}</span>
              <div class="bottom clearfix">
                <span>{{item.websiteName}}</span>
              </div>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
    pannelData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      items: []
    }
  },
  watch: {
    pannelData: {
      deep: true,
      handler(val) {
        this.items = val
      }
    }
  },
  methods: {
    carouselChange(pre, next) {
      debugger
      this.$emit('carouselChange', this.pannelData[pre])
    },
    handleDetail(row) {
      var url ="";
      if (row.websiteName == "aiyaku") {
        url = "https://www.aiyaku.com" + row.path;
      }
      if (row.websiteName == "202832") {
        url = "https://www.202832.com/product/" + row.path + ".html";
      }
      if (row.websiteName == "yayibang") {
        url = "https://www.yayibang.com/views/web/article/goods_details.html?goods_id=" + row.path;
      }
      if (row.websiteName == "yae920") {
        url = "http://www.yae920.com/" + row.path;
      }
      if(url != ""){
        window.open(url, "_blank");
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
