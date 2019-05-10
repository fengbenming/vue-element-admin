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
        @click="handleSearch"
      >{{ $t('table.search') }}</el-button>

      <el-select
        v-model="listQuery.plusType"
        :placeholder="$t('magic.plusPrice')"
        clearable
        default-first-option
        style="width: 100px"
        class="filter-item"
      >
        <el-option
          v-for="item in plusPrices"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.greatOrLow"
        :placeholder="$t('magic.websiteName')"
        clearable
        default-first-option
        style="width: 100px"
        class="filter-item"
      >
        <el-option
          v-for="item in greatOrLow"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.websiteName"
        :placeholder="$t('magic.websiteName')"
        clearable
        default-first-option
        style="width: 100px"
        class="filter-item"
      >
        <el-option
          v-for="item in websiteNames"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t('table.filter') }}</el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleAddNewRelation"
      >{{ $t('magic.newRelation') }}</el-button>
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
          <div v-if="scope.row.websiteName=='202832' || !scope.row.editing">
            <span>{{ scope.row.websiteName }}</span>
          </div>
          <div v-else>
            <el-select
              v-model="listQuery.websiteName"
              placeholder="选择站点"
              @change="resetSearchParam"
            >
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
            <span class="link-type" @click="handleDetail(scope.row)">{{ scope.row.saleName }}</span>
          </div>
          <div v-else>
            <el-select
              v-model="scope.row.item"
              value-key="productCode"
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
      <el-table-column :label="$t('magic.price')" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('A')" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[1500] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('B')" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[1501] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('C')" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[1502] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('B1')" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[1503] }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('B2')" width="60px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row[1504] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item :label="$t('magic.websiteName')" prop="srcWebsite">
          <el-select
            v-model="temp.srcWebsite"
            class="filter-item"
            disabled
            placeholder="Please select"
            @change="resetSearchParam"
          >
            <el-option
              v-for="item in websiteNames"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('magic.productName')" prop="srcProductName">
          <el-select
            v-model="temp.srcItem"
            value-key="productCode"
            filterable
            reserve-keyword
            remote
            placeholder="请输入关键词"
            :remote-method="searchSrcProductForPop"
            :loading="searchLoading"
            @change="handleNewRelationOptionChange($event,'src')"
          >
            <el-option
              v-for="item in searchSrcResultOptions"
              :key="item.productCode"
              :label="item.saleName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('magic.websiteName')" prop="dstWebsite">
          <el-select
            v-model="temp.dstWebsite"
            class="filter-item"
            placeholder="Please select"
            @change="resetSearchParam"
          >
            <el-option
              v-for="item in websiteNames"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('magic.productName')" prop="dstProductName">
          <el-select
            v-model="temp.dstItem"
            value-key="productCode"
            filterable
            reserve-keyword
            remote
            placeholder="请输入关键词"
            :remote-method="searchDstProductForPop"
            :loading="searchLoading"
            @change="handleNewRelationOptionChange($event,'dst')"
          >
            <el-option
              v-for="item in searchDstResultOptions"
              :key="item.productCode"
              :label="item.saleName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="handleSaveNewRelation">{{ $t('table.confirm') }}</el-button>
      </div>
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
      searchSrcResultOptions: [],
      searchDstResultOptions: [],
      searchLoading: false,
      tableKey: 0,
      list: [],
      backList: [],
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
        cursor: 0,
        plusType: "1500",
        greatOrLow: "10"
      },
      brandSet: new Set(),
      categorySet: new Set(),
      plusPrices: [
        // { label: "口腔新干线", key: "202832" },
        { label: "A", key: "1500" },
        { label: "B", key: "1501" },
        { label: "C", key: "1502" },
        { label: "B1", key: "1503" },
        { label: "B2", key: "1504" }
      ],
      greatOrLow: [
        // { label: "口腔新干线", key: "202832" },
        { label: "大于", key: "1" },
        { label: "小于", key: "-1" },
        { label: "等于", key: "0" },
        { label: "大于等于", key: "10" }
      ],
      websiteNames: [
        { label: "口腔新干线", key: "202832" },
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
        status: "published",
        srcWebsite: "202832",
        srcProductId: null,
        srcProductCode: null,
        dstWebsite: "aiyaku",
        dstProductId: null,
        dstProductCode: null,
        dstItem: null,
        srcItem: null
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
    handleAddNewRelation() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleOptionChange(value, row) {
      row.price = value.price;
      row.productId = value.productId;
      row.websiteName = value.websiteName;
      row.productCode = value.productCode;
      row.saleName = value.saleName;
    },
    handleNewRelationOptionChange(row, source) {
      if (source == "src") {
        this.temp.srcWebsite = row.websiteName;
        this.temp.srcProductId = row.productId;
        this.temp.srcProductCode = row.productCode;
        this.temp.srcProductName = row.saleName;
      }
      if (source == "dst") {
        this.temp.dstWebsite = row.websiteName;
        this.temp.dstProductId = row.productId;
        this.temp.dstProductCode = row.productCode;
        this.temp.dstProductName = row.saleName;
      }
    },
    searchCommon(options, params) {
      search(params).then(response => {
        console.log(response);
        this.listQuery.cursor = response.cursor;
        options = response.related;
      });
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
    searchSrcProductForPop(keyword) {
      this.listQuery.keywords = keyword;
      this.listQuery.websiteName = this.temp.srcWebsite;
      this.searchLoading = true;
      search(this.listQuery).then(response => {
        console.log(response);
        this.listQuery.cursor = response.cursor;
        this.searchSrcResultOptions = response.related;
        this.searchLoading = false;
      });
    },
    searchDstProductForPop(keyword) {
      this.listQuery.keywords = keyword;
      this.listQuery.websiteName = this.temp.dstWebsite;
      this.searchLoading = true;
      search(this.listQuery).then(response => {
        console.log(response);
        this.listQuery.cursor = response.cursor;
        this.searchDstResultOptions = response.related;
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
        for (var i in this.list) {
          var item = this.list[i];
          var splits = item.extraPrice.slice(1, -1).split(",");
          for (var j in splits) {
            var ss = splits[j].split(":");
            var key = ss[0].slice(1, -1);
            item[key] = ss[1];
          }
        }
        this.backList = this.list; //便于页面做筛选功能

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
    handleFilter(value) {
      var greatOrLow = this.listQuery.greatOrLow;
      var plusType = this.listQuery.plusType;
      var websiteName = this.listQuery.websiteName;
      if (plusType == "" || greatOrLow == "" || websiteName == "") {
        this.list = this.backList;
        return;
      }
      var plusPrice;
      var idArr = new Set();
      for (var i in this.backList) {
        var item = this.backList[i];
        if (item.websiteName == "202832") {
          plusPrice = item[plusType];
          continue;
        }
        if (item.websiteName == websiteName) {
          if (greatOrLow == "10") {
            //大于登陆
            if (plusPrice >= item.price) {
              idArr.add(item.mainProductId);
            }
          }
          if (greatOrLow == "1") {
            //大于
            if (plusPrice > item.price) {
              idArr.add(item.mainProductId);
            }
          }
          if (greatOrLow == "0") {
            //等于
            if (plusPrice == item.price) {
              idArr.add(item.mainProductId);
            }
          }
          if (greatOrLow == "-1") {
            //小于
            if (plusPrice < item.price) {
              idArr.add(item.mainProductId);
            }
          }
        }
      }
      console.log(idArr);
      var tmpList = [];
      for (var i in this.backList) {
        var item = this.backList[i];
        if (idArr.has(item.productId) || idArr.has(item.mainProductId)) {
          tmpList.push(item);
        }
      }
      this.list = tmpList;
    },
    handleSearch() {
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
        type: "",
        status: "published",
        srcWebsite: "202832",
        srcProductId: null,
        srcProductCode: null,
        dstWebsite: "aiyaku",
        dstProductId: null,
        dstProductCode: null,
        dstItem: null,
        srcItem: null
      };
    },
    resetSearchParam() {
      this.listQuery = {
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
        cursor: 0,
        plusType: "1500",
        greatOrLow: "10"
      };
      this.searchResultOptions = [];
      this.searchDstResultOptions = [];
      this.searchSrcResultOptions = [];
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
      this.listQuery.websiteName = "aiyaku";
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
      if(url != ""){
        window.open(url, "_blank");
      }
    },
    handleSaveNewRelation() {
      var list = [];
      list[0] = {
        productCode: this.temp.srcProductCode,
        productId: this.temp.srcProductId,
        websiteName: this.temp.srcWebsite
      };
      list[1] = {
        productCode: this.temp.dstProductCode,
        productId: this.temp.dstProductId,
        websiteName: this.temp.dstWebsite
      };
      this.listLoading = true;
      productConfirm(list, 1).then(response => {
        if (response.code == 20000) {
          this.getList();
          this.listLoading = false;
          this.dialogFormVisible = false;
        }
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

