<template>
  <div class="chart-container">
    <chart height="100%" width="100%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/SellChart'
import store from '../../store/index.js'
import { everyDaySellData } from '@/api/sell'
export default {
  store,
  name: 'LineChart',
  components: { Chart },
  mounted() {
    this.refreshData()
  },
  methods: {
    refreshData() {
      everyDaySellData().then(response => {
        store.commit('sellChart/refreshChart', response)
      })
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

