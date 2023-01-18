<template lang="pug">
  .dropdown(:style="styles")
    slot

</template>

<script>
export default {
  name: "DropDown",
  props: {
    styles: {
      type: Object
    }
  },
  methods: {
    handleClick (event) {
      let isDropdownClickAway = true
      event.path.forEach(el => {
        if (el.className === 'dropdown') isDropdownClickAway = false
      })
      if (isDropdownClickAway) this.$emit('close')
    }
  },
  mounted () {
    setTimeout(() => document.addEventListener('click', this.handleClick), 10)
  },
  destroyed () {
    document.removeEventListener('click', this.handleClick)
  }
};
</script>

<style lang="scss">
  .dropdown {
    background: #FFFFFF;
    box-shadow: 0 0 30px rgba(47, 54, 70, 0.3);
    border-radius: 10px;
  }

</style>
