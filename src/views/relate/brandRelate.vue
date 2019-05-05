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
        <el-col v-for="(o, index) in list" :key="o" :span="8" :offset="index > 0 ? 2 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            >
            <div style="padding: 14px;font-size:23px;bold">
              <span>{{ o }}</span>
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
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="confirmBrand">关联</el-button>
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
import { brandChoise, confirmBrand } from '@/api/relate'
export default {
  data() {
    return {
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
    getLists() {
      console.log(this.param)
      brandChoise(this.param).then(responose => {
        this.list = responose.data.split('|')
        this.param.srcBrand = this.list[0]
        this.param.dstBrand = this.list[1]
      })
    },
    confirmBrand() {
      this.listLoading = true
      confirmBrand(this.param).then(response => {
        if (response.code == 20000) {
          this.getLists()
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000)
        }
      })
    }
  }
}
</script>
