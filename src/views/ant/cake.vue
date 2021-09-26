<template lang="pug">
  .cake(:style='style')
</template>

<script>
import utils from "./ant-utils.js";
import PosMixin from "./pos-mixin.js";
export default {
  props: {
    data: Object,
  },
  mixins: [PosMixin],
  computed: {
    style() {
      const { data } = this;
      const sizeInt = utils.linearNumber(10, 100, 0, 800, data.health);

      return {
        ...this.posStyle({
          top: data.pos.top - sizeInt / 2,
          left: data.pos.left - sizeInt / 2,
        }),
        width: `${sizeInt}px`,
        height: `${sizeInt}px`,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.cake
  position: absolute
  border-radius: 50%
  border: 5px solid black
  background-color: white
</style>
