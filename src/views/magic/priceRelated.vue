<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.productName"
        :placeholder="$t('magic.productName')"
        style="width: 200px;"
        class="filter-item"
      />
      <el-input
        v-model="listQuery.productCode"
        :placeholder="$t('magic.productCode')"
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
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      height="500"
      style="width: 100%;"
      :span-method="arraySpanMethod"
      :row-style="tableRowClassName"
    >
      <el-table-column type="index"/>
      <el-table-column :label="$t('magic.websiteName')" prop="id" align="center" width="120">
        <template slot-scope="scope">
          <div v-if="!scope.row.editing">
            <span>{{ scope.row.websiteName }}</span>
          </div>
          <div v-else>
            <el-select v-model="listQuery.websiteName" placeholder="选择站点">
              <el-option
                v-for="item in websiteNames"
                :key="item.key"
                :label="item.label"
                :value="item.key"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('magic.productName')"
        prop="row.productName"
        sortable
        width="320px"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="!scope.row.editing">
            <span>{{ scope.row.saleName }}</span>
          </div>
          <div v-else>
            <el-select
              v-model="scope.row.item"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="searchProduct"
              :loading="searchLoading"
              @change="handleOptionChange($event,scope.row)"
            >
              <el-option
                v-for="item in searchResultOptions"
                :key="item.productCode"
                :label="item.saleName"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('magic.price')" width="70px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.websiteName!='202832' && !scope.row.editing"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <!-- <el-button
            size="mini"
            v-if="scope.row.websiteName!='202832' && !scope.row.editing"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>-->
          <el-button
            size="mini"
            v-if="scope.row.editing"
            @click="handleSave(scope.$index, scope.row)"
          >保存</el-button>
          <el-button
            size="mini"
            v-if="scope.row.editing"
            @click="handleCancel(scope.$index, scope.row)"
          >取消</el-button>
          <el-button
            size="mini"
            v-if="scope.row.websiteName=='202832' && !scope.row.editing"
            @click="handleAdd(scope.$index, scope.row)"
          >增加</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
import { productRelatedData } from "@/api/sell";
import { search } from "@/api/search";
import waves from "@/directive/waves"; // Waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { productConfirm } from "@/api/relate";

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
  name: "ComplexTable",
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
      searchResultOptions: [],
      searchLoading: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id",
        websiteName: "aiyaku",
        dateDimension: "d",
        productName: "",
        productCode: "",
        keywords: "",
        cursor: 0
      },
      brandSet: new Set(),
      categorySet: new Set(),
      websiteNames: [
        // { label: "口腔新干线", key: "202832" },
        { label: "爱牙库", key: "aiyaku" },
        { label: "牙医帮", key: "yayibang" }
      ],
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
      downloadLoading: false,
      yesterday: new Date(),
      specId: null
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    handleOptionChange(value, row) {
      console.log(value, row);
      row.price = value.price;
      row.productId = value.productId;
      row.websiteName = value.websiteName;
      row.productCode = value.productCode;
    },
    searchProduct(keyword) {
      this.listQuery.keywords = keyword;
      this.searchLoading = true;
      search(this.listQuery).then(response => {
        console.log(response);
        this.listQuery.cursor = response.cursor;
        this.searchResultOptions = response.related;
        this.searchLoading = false;
      });
    },
    tableRowClassName(data) {
      if (data.row.color == "grey") {
        return "background-color:#f0f9eb;";
      } else {
        return "";
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.list[rowIndex].mergeNum > 0) {
          return {
            rowspan: this.list[rowIndex].mergeNum,
            colspan: this.list[rowIndex].mergeNum > 0 ? 1 : 0
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    getList() {
      productRelatedData(this.listQuery).then(response => {
        console.log(response);
        this.list = response.related;
        // this.total = response.data.total

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
        setTimeout(() => {
          this.listLoading = false;
        }, 1.5 * 1000);
      });
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

      this.listLoading = true;
      var list = [];
      list[0] = {
        productCode: row.mainProductCode,
        productId: row.mainProductId,
        websiteName: row.mainWebsiteName
      };
      list[1] = row;
      debugger
      productConfirm(list, -1).then(response => {
        if (response.code == 20000) {
          this.getList();
          this.listLoading = false;
        }
      });
    },
    handleAdd(index, row) {
      row.mergeNum = row.mergeNum + 1;
      this.list.splice(index + 1, 0, {
        editing: true,
        mainId: row.productId,
        mainRow: row
      });
    },
    handleSave(index, row) {
      row.editing = true;
      this.listLoading = true;
      var list = [];
      list[0] = row.mainRow;
      list[1] = row;
      list[1].item = null;
      list[1].mainRow = null;
      productConfirm(list, 1).then(response => {
        if (response.code == 20000) {
          this.getList();
          this.listLoading = false;
        }
      });
    },
    handleCancel(index, row) {
      for (var i = index; i >= 0; i--) {
        if (this.list[i].productId == row.mainId) {
          this.list[i].mergeNum = this.list[i].mergeNum - 1;
          this.list.splice(index, 1);
        }
      }
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

