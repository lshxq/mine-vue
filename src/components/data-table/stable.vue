<template lang="pug">
.stable-main
  el-table(:data="dataList", :row-key="rowKey")
    el-table-column(
      type="index",
      :index="indexMethod",
      label="序号",
      fixed,
      width="50px"
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
</template>

<script>
export default {
  props: {
    cols: Array,
    dataList: Array,
    rowKey: {
      type: String,
      default() {
        return "id"
      },
    },
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
  },
};
</script>
