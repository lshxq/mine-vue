<template lang="pug">
  .ant-main-panel
    ant-hole(v-for='antHole of antHoles' :pos='antHole.pos' @ant-out='antOut')
    cake(v-for='cake of cakes' :data='cake')
    ant(v-for='ant of ants' :data='ant' :cakes='cakes' @bite='antbite')
    
</template>

<script>
import AntHole from "./ant-hole.vue";
import Ant from "./ant.vue";
import Cake from "./cake.vue";
import _ from "lodash";

const ANT_MAX_COUNT = 10;
const randomInt = (base = 5, max = 10) => {
  const num = Math.floor(Math.random() * max + base);
  return Math.random() > 0.5 ? num : 0 - num;
};
export default {
  components: {
    AntHole,
    Ant,
    Cake,
  },
  data() {
    return {
      antHoles: [
        {
          pos: {
            top: 100,
            left: 100,
          },
        },
      ],
      ants: [],
      cakes: [
        {
          pos: {
            left: 400,
            top: 400,
          },
          health: 800,
        },
      ],
    };
  },
  methods: {
    antbite(cake) {
      const index = _.findIndex(this.cakes, (cc) => {
        return cake.pos.left === cc.pos.left && cake.pos.top === cc.pos.top;
      });
      if (index >= 0) {
        this.$set(this.cakes, index, Object.assign(this.cakes[index], {
          health: this.cakes[index].health - 10
        }));
      }
    },
    antOut({ pos, home }) {
      const { ants } = this;
      if (ants.length < ANT_MAX_COUNT) {
        this.ants.push({
          pos: {
            left: pos.left + randomInt(),
            top: pos.top + randomInt(),
          },
          home,
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.ant-main-panel
  width: 100%
  height: 100%
  background-color: lightblue
  position: relative
</style>
