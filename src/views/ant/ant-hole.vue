<template lang="pug">
  .ant-hole-main(:style='style')
</template>
<script>
import PosMixin from "./pos-mixin.js";
export default {
  props: {
    pos: Object,
  },
  mixins: [PosMixin],
  computed: {
    style() {
      const { pos } = this;
      return {
        ...this.posStyle(pos),
      };
    },
  },
  mounted() {
    setInterval(() => {
      const { pos } = this;
      this.$emit("ant-out", {
        pos,
        home: this,
      });
    }, 1000);
  },
};
</script>
<style lang="sass" scoped>
.ant-hole-main
  width: 20px
  height: 20px
  border-radius: 50%
  background-color: #A23400
  position: absolute
</style>
