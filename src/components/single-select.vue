<template lang="pug">
  .single-select-main
    .option(v-for='opt of options' @click='optionClick(opt)' :class='generateClass(opt)')
      slot(name='option' :opt='opt')
</template>

<script>
import _ from "lodash";

export default {
  props: {
    value: null,
    options: Array,
    idKey: {
      type: String,
      default() {
        return "id";
      },
    },
  },
  methods: {
    optionClick(opt) {
      this.$emit("input", opt);
    },
    generateClass(opt) {
      const { idKey } = this;
      return {
        selected:
          _.get(opt, idKey, "test") === _.get(this, `value.${idKey}`, "gaa"),
      };
    },
  },
};
</script>

<style lang="sass" scoped>
@mixin option-selected
  background: #0080FF
  color: white
  box-shadow: (5px 5px 5px lightgray)
  font-weight: bold

.single-select-main
  display: flex
  flex-flow: row wrap
  user-select: none

  &>.option
    background: #D2E9FF
    cursor: pointer
    margin-bottom: 10px
    border: 1px solid lightgray
    border-radius: 10px
    color: #5B5B5B


  &>.option:hover
    @include option-selected

  &>.option.selected
    @include option-selected
</style>
