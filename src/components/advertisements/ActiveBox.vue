<template>
  <div class="form-check">
    <input v-model="isSelected" v-on:change="emitActiveStatus" class="form-check-input" type="checkbox">
    <label class="form-check-label" for="flexCheckDefault">
      Aktiivne
    </label>
  </div>
</template>
<script>
export default {
  name: 'ActiveBox',
  data: function () {
    return {
      isSelected: false,
      status: ''
    }
  },
  methods: {
    emitActiveStatus: function () {
      this.status = ((this.isSelected) ? 'A' : 'I')
      this.$emit('emitActiveStatusEvent', this.status)
    },
  }
}
</script>