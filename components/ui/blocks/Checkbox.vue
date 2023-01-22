<template lang="pug">
  .checkbox.pos-rel(:class="{ checked: isChecked }")
    IconCheckMarkWhite.pos-abs(:style="styles")

</template>

<script>
import IconCheckMarkWhite from "@/components/ui/icons/IconCheckMarkWhite.vue";

export default {
  name: "Checkbox",
  components: { IconCheckMarkWhite },
  props: [ 'isChecked', 'styles' ]
};
</script>

<style lang="scss">
  .checkbox {
    width: 15px !important;
    height: 15px !important;
    outline: 2px solid #B3B3B3;
    border-radius: 4px;
  }

  .checkbox:hover,
  .checked {
    outline: 2px solid #2D78EA;
  }

  .checked {
    background-color: #2D78EA;
  }

  .checked:hover {
    outline: 2px solid #6BA0F0;
    background-color: #6BA0F0;
  }

</style>
