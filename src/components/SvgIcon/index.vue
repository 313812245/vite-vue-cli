<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',

  props: {
    name: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: null,
    },
  },

  computed: {
    iconPath() {
      return `#${this.name}`;
    },

    className() {
      return 'svg-icon svg-icon--' + this.name;
    },
  },
};
</script>

<style>
.svg-icon {
  fill: currentColor;
}
</style>
