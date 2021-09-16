<template lang="pug">
.echart-wrapper-inner.h0.w0(ref="chartRef")
  .no-echart-support(v-if="!echartSupported")
</template>

<script>
export default {
  props: {
    option: Object
  },
  data() {
    return {
      echartSupported: !!window.echarts
    }
  },
  created() {
    window.addEventListener('resize', this.resizeWin)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeWin)
  },
  watch: {
    option: {
      handler(newOption) {
        this.draw(newOption)
      },
      deep: true
    }
  },
  mounted() {
    this.inst = window.echarts.init(this.$refs.chartRef)
    const {
      option
    } = this
    if (option) {
      this.draw(option)
    }
  },
  methods: {
    resizeWin() {
      this.inst.resize()
    },
    draw(option) {
      this.inst.setOption(option)
    }
  }
}
</script>