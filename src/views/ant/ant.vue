<template lang="pug">
  .ant(:style='style')
</template>

<script>
import PosMixin from "./pos-mixin.js";
import utils from "./ant-utils.js";

export default {
  props: {
    data: Object,
    cakes: Array,
  },
  mixins: [PosMixin],
  data() {
    const { pos } = this.data;
    return {
      pos,
    };
  },
  computed: {
    style() {
      const { pos } = this;
      return {
        ...this.posStyle(pos),
      };
    },
  },
  mounted() {
    const that = this;
    const { cakes } = that;
    setInterval(() => {
      const { pos } = that;
      const nearest = utils.nearest(
        pos,
        cakes.map((item) => {
          return {
            ...item.pos,
            cake: item,
          };
        })
      );
      this.pos = utils.walk(pos, nearest.cake.pos);
    }, 100);
  },
};
</script>
<style lang="sass" scoped>
.ant
  position: absolute
  width: 20px
  height: 20px
  border-radius: 50%
  border: 3px solid black
  background-color: white
</style>
