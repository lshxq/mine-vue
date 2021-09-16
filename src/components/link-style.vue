<template lang="pug">
  .link-style(@click='clicked' :class='linkCalss') {{label}}
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default() {
        return "未设定";
      },
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  computed: {
    linkCalss() {
      const { disabled } = this;
      return {
        disabled,
      };
    },
  },
  methods: {
    clicked() {
      if (!this.disabled) {
        this.$emit("click");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.link-style.disabled
  color: lightgray
  cursor: default
.link-style.disabled:hover
  opacity: 1
</style>
