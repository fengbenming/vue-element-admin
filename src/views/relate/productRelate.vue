<template>
  <div v-loading="listLoading" class="app-container">
    <div class="filter-container" style="text-align:center">
      <el-button class="filter-item" type="primary" icon="el-icon-search">切换站点</el-button>
      <el-select
        v-model="param.dstWebsite"
        :placeholder="$t('magic.websiteName')"
        clearable
        filterable
        allow-create
        style="width: 200px"
        class="filter-item"
        @change="getLists"
      >
        <el-option
          v-for="item in websiteNames"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
    </div>
    <el-row style="left:15%">
      <div>
        <el-col v-for="(o, index) in list" :key="o.websiteNames" :span="8" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img
              :src="o.pic"
              class="image"
              @click="nextPic(o)"
            >
            <div style="padding: 5px;text-align: left; border:10px">
              站点:<span> {{ o.websiteName }}</span>
              品牌: <span>{{ o.brand }}</span>
              价格:<span style="color:red"> {{ o.price }}￥</span>
            </div>
            <div style="padding: 5px;text-align: left;">
              <span style="font-weight: bold;">分类路径: </span><span>{{ o.categoryName }}</span>
            </div>
            <div style="padding: 5px;text-align: left;">
              <span style="font-weight: bold;">销售名称:</span><span> {{ o.saleName }}</span>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
    <el-row>
      <div class="bottom clearfix" style="text-align:center">
        <el-button
          class="filter-item"
          style
          type="primary"
          icon="el-icon-search"
          @click="getLists"
        >下一组</el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="confirmProduct(1)"
        >关联</el-button>
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="confirmProduct(-1)"
        >不关联</el-button>
      </div>
    </el-row>
  </div>
</template>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

<script>
import { productChoise, productConfirm } from '@/api/relate'
export default {
  data() {
    return {
      i: 0,
      listLoading: false,
      param: {
        srcBrand: '',
        dstBrand: '',
        srcWebsite: '202832',
        dstWebsite: 'aiyaku',
        choiseType: '1'
      },
      list: null,
      websiteNames: [
        // { label: "口腔新干线", key: "202832" },
        { label: '爱牙库', key: 'aiyaku' },
        { label: '牙医帮', key: 'yayibang' }
      ]
    }
  },
  created() {
    this.getLists()
  },
  methods: {
    nextPic(items) {
      items.pic = items.pics[this.i++ % items.pics.length]
    },
    getLists() {
      console.log(this.param)
      productChoise(this.param).then(responose => {
        console.log(responose)
        this.list = responose.data
      })
    },
    confirmProduct(relationType) {
      this.listLoading = true
      productConfirm(this.list, relationType).then(response => {
        if (response.code == 20000) {
          this.getLists()
          this.listLoading = false
        }
      })
    }
  }
}
</script>
