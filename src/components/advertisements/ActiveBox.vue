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
  props: {
    isAdd: Boolean
  },
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
    setActiveStatus: function (status) {
      this.status = status
      if (this.status === 'A') {
        this.isSelected = true
      } else if (this.status === 'I' || this.status === 'D') {
        this.isSelected = false
      }
    },
    setAddStatus: function () {
      this.isSelected = this.isAdd
    },
  },
  beforeMount() {
    if (this.isAdd) {
      this.setAddStatus()
    }
  }
}
</script>