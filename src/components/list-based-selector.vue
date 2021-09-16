<template lang="pug">
el-select(v-model="valueComputed")
  el-option(v-if="blank", :value="blankValue", :label="blankLabel")
  el-option(
    v-for="opt of options",
    :value="opt[valueKey]",
    :label="opt[labelKey]"
  )
</template>

<script>
import utils from '@/utils/utils.js'
import _ from 'lodash'

export default {
  props: {
    blank: Boolean,
    blankLabel: {
      type: String,
      default() {
        return ''
      }
    },
    blankValue: {
      type: String,
      default() {
        return ''
      }
    },
    value: null,
    url: String,
    labelKey: {
      type: String,
      default() {
        return 'label'
      }
    },
    valueKey: {
      type: String,
      default() {
        return 'value'
      }
    }
  },
  data() {
    return {
      options: []
    }
  },
  computed: {
    valueComputed: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    const that = this
    utils
      .ajax({
        api: that.url,
        headers: {
          "x-pagin-page": 0,
          "x-pagin-capacity": 99,
        },
      })
      .then((resp) => {
        that.options = _.get(resp, "data.list", [])
        that.$emit('loaded', that.options)
      })
  }
}
</script>