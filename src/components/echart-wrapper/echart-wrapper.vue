<template lang='pug'>
.echart-wrapper-main
  echart-wrapper-inner(:option="option", v-if="echartLoaded")
  .no-chart-support(v-else) 图表加载中...
</template>

<script>
import EchartWrapperInner from './echart-wrapper-inner.vue'
import utils from '@/utils/utils.js'

export default {
  components: {
    EchartWrapperInner,
  },
  props: {
    option: Object
  },
  data() {
    return {
      echartLoaded: !!window.echarts
    }
  },
  mounted() {
    if (!this.echartLoaded) {
      utils.loadJS('./echart.5.2.0.min.js').finally(() => {
        this.echartLoaded = true
      })
    }
  }

}
</script>

<style lang='sass' scoped>
.echart-wrapper
  width: 100%
  height: 100%
</style>