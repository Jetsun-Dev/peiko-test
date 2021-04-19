<template>
  <button v-bind="$attrs" v-on="$listeners" :class="classes">
    <slot />
  </button>
</template>

<script>
export default {
  name: "UiButton",

  props: {
    theme: {
      type: String,
      default: "primary",
      validator: (val) => ["primary"].includes(val),
    },
  },

  computed: {
    classes() {
      return ["ui-button", `ui-button_${this.theme}`];
    },
  },
};
</script>

<style lang="scss">
.ui-button {
  position: relative;
  cursor: pointer;

  &_primary {
    padding: 10px 30px;
    background: rgba(grey, 0.1);
    border-radius: 4px;
    border: 1px solid rgba(grey, 0.2);
  }
}
</style>
