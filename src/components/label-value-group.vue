<template lang="pug">
.label-value-group
  .label-value-group-inner
    .label {{ label }}
      slot(name="label")
    .value {{ value }}
      slot(name="value")
</template>

<script>
export default {
  props: {
    label: String,
    value: {
      type: null,
      default() {
        return ""
      },
    },
  },
};
</script>
<style lang="sass" scoped>
.label-value-group
  display: inline-block
  height: 50px

  &>.label-value-group-inner
    display: flex
    width: 300px
    align-items: center
    height: 100%

    &>.label:after
      content: ':'
    &>.label
      color: #303030
      flex: 0 0 120px
      display: flex
      justify-content: flex-end
      margin-right: 10px
      align-items: center

    &>.value
      flex: 1 1 auto
      color: gray
      display: flex
      align-items: center
</style>
