<template lang="pug">
.main-data-table-panel(v-loading="loading")
  .show-as-card(v-if="showAsCard")
    .card-wrapper
      slot(v-for="data of dataList", name="card", :props="data") 

  el-table(
    v-else,
    :data="dataList",
    :row-key="rowKey",
    @sort-change="sortChanged"
  )
    el-table-column(
      type="index",
      :index="indexMethod",
      label="序号",
      fixed,
      width="50"
    )
    el-table-column(
      :prop="col.sort",
      v-for="col of cols",
      :label="col.label",
      :min-width="col.width",
      :sortable="!!col.sort",
      :fixed="col.fixed"
    )
      template(slot-scope="scope")
        .data-table-cell(:style="col.style")
          template(v-if="col.prop") {{ scope.row[col.prop] }}
          template(v-if="col.content") {{ col.content(scope.row, scope) }}
          template(v-if="col.slot")
            slot(:name="col.slot", :props="scope.row")

  .pagination-bar(v-if="!hidePagination")
    el-pagination(
      layout="prev, pager, next, sizes, total",
      :page-size="pagin.capacity",
      :current-page="pagin.page",
      :total="pagin.total",
      :page-sizes="[10, 20, 50]",
      @size-change="sizeChanged",
      @current-change="currentChanged"
    )
</template>

<script>
import utils from "@/utils/utils.js"
import _ from "lodash"

export default {
  props: {
    hidePagination: Boolean,
    cols: Array,
    mock: null,
    api: String,
    params: Object, // 查询条件
    rowKey: {
      type: String,
      default() {
        return "id"
      },
    },
  },
  data() {
    return {
      dataList: [],
      loading: false,
      radio: false,
      sort: {
        by: "",
        order: "",
      },
      pagin: {
        total: 0,
        page: 1,
        capacity: 10,
      },
    }
  },
  computed: {
    showAsCard() {
      const rv = !this.cols
      return rv
    },
  },
  mounted() {
    const { params } = this
    this.fetchData(params)
  },
  watch: {
    params: {
      handler(value) {
        this.pagin.page = 1
        this.fetchData(value)
      },
      deep: true,
    },
  },
  methods: {
    sortChanged(column) {
      this.sort = {
        by: column.prop,
        order: column.order,
      }
      this.reload()
    },
    indexMethod(index) {
      const { page, capacity } = this.pagin
      return (page - 1) * capacity + 1 + index
    },
    reload() {
      this.fetchData(this.params)
    },
    sizeChanged(num) {
      this.pagin.capacity = num
      const { params } = this
      this.fetchData(params)
    },
    currentChanged(page) {
      this.pagin.page = page
      const { params } = this
      this.fetchData(params)
    },
    fetchData(originalParams) {
      const that = this
      const { mock, api, pagin, sort } = that

      const params = {}

      for (const key in originalParams) {
        const value = originalParams[key]
        if (value || value === false || value === 0) {
          params[key] = value
        }
      }

      if (sort.by && sort.order) {
        params.sort = `${sort.order === "descending" ? "-" : "+"}${sort.by}`
      }

      that.loading = true
      const requestId = new Date().getTime()

      const headers = {
        "x-request-id": requestId,
        "x-pagin-page": (pagin.page - 1) * pagin.capacity,
        "x-pagin-capacity": pagin.capacity,
      }

      utils
        .ajax({
          method: "GET",
          api,
          params,
          headers,
          mock,
        })
        .then((rv) => {
          const returnedReqId = _.get(rv, "headers.x-request-id")
          if (`${returnedReqId}` == `${requestId}`) {
            that.dataList = _.get(rv, "data.list", [])
            that.pagin.total = _.get(rv, "data.total")
          }
        })
        .finally(() => {
          that.loading = false
        })
    },
  },
};
</script>

<style lang="sass" scoped>
.pagination-bar
  margin-top: 20px
</style>
