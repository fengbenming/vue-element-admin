<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->
    <div class="filter-container">
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
        v-model="listQuery.date"
        type="daterange"
        style="width: 300px;bottom: 4px;"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      />
      <el-select
        v-model="listQuery.brand"
        :placeholder="$t('magic.brand')"
        clearable
        filterable
        allow-create
        style="width: 150px;"
        class="filter-item"
      >
        <el-option v-for="item in brandSet" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input
        v-model="listQuery.productName"
        :placeholder="$t('magic.productName')"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
    </div>
    <panel-group
      :pannel-data="pannelData"
      @carouselChange="carouselChange"
    />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import { priceSalesTrend, productSellData } from '@/api/sell'
import { parseTime } from '@/utils'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      listQuery: {
        websiteName: 'aiyaku',
        productId: null,
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id',
        dateDimension: 'd',
        date: [],
        productName: null,
        brand: null
      },
      lineChartData: {},
      pannelData: [],
      websiteNames: [
        { label: '口腔新干线', key: '202832' },
        { label: '爱牙库', key: 'aiyaku' },
        { label: '牙医帮', key: 'yayibang' }
      ],
      brandSet: []
    }
  },
  mounted() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 10)
    this.listQuery.date = [
      parseTime(start, '{y}-{m}-{d}'),
      parseTime(end, '{y}-{m}-{d}')
    ]
    this.getList()
    this.handleFilter()
  },
  methods: {
    getList() {
      priceSalesTrend(this.listQuery).then(response => {
        console.log(response.trend)
        this.lineChartData = response.trend
      })
    },
    handleFilter() {
      if (this.listQuery.date.length == 2) {
        this.listQuery.startDate = this.listQuery.date[0]
        this.listQuery.endDate = this.listQuery.date[1]
      }
      console.log(this.listQuery)
      productSellData(this.listQuery).then(response => {
        this.pannelData = response.productSell

        this.brandSet = new Set()
        for (var i in this.pannelData) {
          if (this.pannelData[i].Brand != '') {
            this.brandSet.add(this.pannelData[i].Brand)
          }
        }

        if (this.pannelData.length > 0) {
          this.listQuery.websiteName = this.pannelData[0].WebsiteName
          this.listQuery.productId = this.pannelData[0].ProductId
        } else {
          this.listQuery.productId = ''
        }
        // 初始化图标
        this.getList()
      })
    },
    carouselChange(res) {
      debugger
      this.listQuery.productId = res.ProductId
      this.listQuery.websiteName = res.WebsiteName
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
