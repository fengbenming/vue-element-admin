<template>
  <div class="app-container">
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
      <!-- <el-select
        v-model="listQuery.brand"
        :placeholder="$t('magic.brand')"
        clearable
        filterable
        allow-create
        style="width: 150px;"
        class="filter-item"
      >
        <el-option v-for="item in brandSet" :key="item" :label="item" :value="item" />
      </el-select>-->
      <!-- <el-input v-model="listQuery.productName" :placeholder="$t('magic.productName')" style="width: 200px;" class="filter-item" /> -->
      <el-input
        v-model="listQuery.keywords"
        placeholder="请输入关键词"
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

      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >{{ $t('table.export') }}</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      stripe
      border
      fit
      highlight-current-row
      height="500"
      style="width: 100%;"
    >
      <el-table-column type="index"/>
      <el-table-column :label="$t('magic.websiteName')" prop="id" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ websiteKeys[scope.row.WebsiteName] }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('magic.category3')" prop="Category" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.Category }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        :label="$t('magic.brand')"
        prop="Brand"
        sortable
        width="150px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.Brand }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('magic.productName')" width="250px" align="center">
        <template slot-scope="scope">
          <span class="link-type" @click="handleClick(scope.row)">{{ scope.row.ProductName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('magic.sellNum')"
        prop="TotalNum"
        sortable
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.TotalNum }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('magic.sellPrice')"
        prop="TotalPrice"
        sortable
        width="110px"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.TotalPrice }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="listQuery.total>0"
      :total="listQuery.total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('table.type')" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.date')" prop="timestamp">
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item :label="$t('table.title')" prop="title">
          <el-input v-model="temp.title"/>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('table.importance')">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item>
        <el-form-item :label="$t('table.remark')">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
import { productSellData } from "@/api/sell";
import store from "../../store/index.js";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "productSell",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      websiteKeys:[],
      tableKey: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        websiteName: "aiyaku",
        dateDimension: "d",
        date: [],
        productName: null,
        brand: null,
        cursor: 0,
        total:0
      },
      brandSet: new Set(),
      categorySet: new Set(),
      dateDimensions: [
        { label: "日", key: "d" },
        { label: "周", key: "w" },
        { label: "月", key: "m" }
      ],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        type: "",
        status: "published"
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  computed: {
    list() {
      return store.state.productSell.list;
    },
    websiteNames(){
      return store.state.commonData.websiteNames
    },
  },
  watch: {},
  created() {
    console.log("*****@@ enter created****");
    // this.getList();
  },
  mounted() {
    this.listQuery = store.state.productSell.listQuery;
    for( var index in this.websiteNames){
      this.websiteKeys[this.websiteNames[index].key] = this.websiteNames[index].label
    }
    console.log("*****@@ enter mounted****");
  },
  methods: {
    handleClick(row){
      var param = row.WebsiteName+' '+row.ProductName     
      console.log(param)
      this.$router.push({ path: `/magic/priceTrend`,query: {name: param} })
    },
    getList() {
      this.listLoading = true;
      if (this.listQuery.date.length == 2) {
        this.listQuery.startDate = this.listQuery.date[0];
        this.listQuery.endDate = this.listQuery.date[1];
      }
      productSellData(this.listQuery).then(response => {
        // this.list = response.productSell;
        store.commit("productSell/refreshChart", response.productSell);
        this.listQuery.total = response.total;
        store.commit("productSell/refreshPagination", this.listQuery);

        this.brandSet = new Set();
        this.categorySet = new Set();
        for (var i in this.list) {
          if (this.list[i].Brand != "") {
            this.brandSet.add(this.list[i].Brand);
          }
          if (this.list[i].Category != "") {
            this.categorySet.add(this.list[i].Category);
          }
        }

        // Just to simulate the time of the request
        this.listLoading = false;
      });
      setTimeout(() => {
        this.listLoading = false;
      }, 3 * 1000);
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: "",
        timestamp: new Date(),
        title: "",
        status: "published",
        type: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v);
                this.list.splice(index, 1, this.temp);
                break;
              }
            }
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(row) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
<style lang="scss">
/* reset element-ui css */
.el-range-input {
  height: 20px;
}
</style>

