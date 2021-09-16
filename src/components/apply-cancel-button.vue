<template lang="pug">
.apply-cancel-button-group.pt20
  el-button(@click="applied", type="primary", :loading="loading") 确定
  el-button(@click="canceled", :loading="loading") 取消
</template>

<script>
export default {
  props: {
    loading: Boolean
  },
  methods: {
    applied() {
      this.$emit("apply")
    },
    canceled() {
      this.$emit("cancel")
    },
  },
};
</script>
