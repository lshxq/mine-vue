<template lang="pug">
.number-input
  el-input(v-model="model", :placeholder="placeholder")
</template>

<script>
export default {
  props: {
    value: null,
    placeholder: String,
  },
  computed: {
    model: {
      set(val) {
        this.$emit("input", val.replace(/[^0-9]/gi, ""))
      },
      get() {
        return this.value
      },
    },
  },
};
</script>
