<template lang="pug">
  label(:key="isChecked" class="toggle-control")
    input(type="checkbox" :checked="isChecked")
    span(@click.stop="isChecked = !isChecked" class="control")

</template>

<script>
export default {
  name: "Switcher",
  props: [ 'param' ],
  inject: [ 'reset' ],
  data: () => ({ isChecked: false }),
  watch: {
    isChecked (nV) {
      this.$emit('switch-my-data', nV)
    },
    reset (nV) {
      if (nV) this.isChecked = !nV
    }
  },
  created () {
    if (this.param === 'installment' && this.$route.path.includes('installment')) this.isChecked = true
  }
};
</script>

<style scoped lang="scss">
  $toggle-background-color-on: #2D78EA;
  $toggle-background-color-off: #D4D8E2;;
  $toggle-control-color: white;
  $toggle-width: 42px;
  $toggle-height: 24px;
  $toggle-gutter: 3px;
  $toggle-radius: 50%;
  $toggle-control-speed: .15s;
  $toggle-control-ease: ease-in;
  $toggle-radius: $toggle-height / 2;
  $toggle-control-size: $toggle-height - ($toggle-gutter * 2);

  .toggle-control {
    display: block;
    position: relative;
    padding-left: $toggle-width;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    user-select: none;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    input:checked ~ .control {
      background-color: $toggle-background-color-on;

      &:after {
        left: $toggle-width - $toggle-control-size - $toggle-gutter;
      }
    }

    .control {
      position: absolute;
      top: 0;
      left: 0;
      height: $toggle-height;
      width: $toggle-width;
      border-radius: $toggle-radius;
      background-color: $toggle-background-color-off;
      transition: background-color $toggle-control-speed $toggle-control-ease;

      &:after {
        content: "";
        position: absolute;
        left: $toggle-gutter;
        top: $toggle-gutter;
        width: $toggle-control-size;
        height: $toggle-control-size;
        border-radius: $toggle-radius;
        background: $toggle-control-color;
        transition: left $toggle-control-speed $toggle-control-ease;
      }
    }
  }

</style>
