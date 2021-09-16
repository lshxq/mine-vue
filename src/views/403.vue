<template lang="pug">
  .main-panel
    .h1 权限不足，无法访问该页面. 
    .title 跳转回首页...
</template>

<script>
export default {
  mounted() {
    const that = this;
    setTimeout(() => {
      that.goto("home");
    }, 3000);
  },
};
</script>

<style lang="sass" scoped>
.main-panel
  min-height: 400px
</style>
