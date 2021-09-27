<template lang="pug">
  .ant(:style='style')
</template>

<script>
import PosMixin from "./pos-mixin.js";
import utils from "./ant-utils.js";
const ANT_MAX_HUNGRY = 3;
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
      hungry: ANT_MAX_HUNGRY,
      lastBite: 0,
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
      if (that.hungry > 0) {
        if (
          10 >
          utils.distance(
            pos.left,
            pos.top,
            nearest.cake.pos.left,
            nearest.cake.pos.top
          )
        ) {
          const now = new Date().getTime();
          if (now - that.lastBite > 100) {
            that.hungry = that.hungry - 1;
            this.$emit('bite', nearest.cake)
          }
          that.lastBite = now;
        } else {
          that.pos = utils.walk(pos, nearest.cake.pos, 5);
        }
      } else {
        if (
          10 >
          utils.distance(
            pos.left,
            pos.top,
            that.data.home.pos.left,
            that.data.home.pos.top
          )
        ) {
          const now = new Date().getTime();
          if (now - that.lastBite > 100) {
            that.hungry = ANT_MAX_HUNGRY;
          }
          that.lastBite = now;
        } else {
          that.pos = utils.walk(pos, that.data.home.pos, 3);
        }
      }
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
