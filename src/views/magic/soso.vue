<template>
  <div class="app-container" style="position: absolute;top: 20%;left: 20%;">
    <div class="filter-container">
      <el-input
        style="width: 200px;"
        class="filter-item"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.search') }}</el-button>
    </div>
    <div style="position: relative;top: 50%;left: 50%;">
    <el-row :gutter="20">
      <el-col :span="120">
        <div class="grid-content">未完待续</div>
      </el-col>
    </el-row>
  </div>
  </div>
  
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #67c23a;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  text-align: center;
  font-size: 30px;
  font-family: "PingFang SC";
  color: green;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
