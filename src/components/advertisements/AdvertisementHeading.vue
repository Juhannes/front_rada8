<template>
  <div class="input-group mb-3">
    <span class="input-group-text">Pealkiri: </span>
    <input v-model="advertisementHeading" v-on:input="emitAdvertisementHeading" type="text" class="form-control">
  </div>
</template>
<script>
export default {
  name: 'AdvertisementHeading',
  data: function () {
    return {
      advertisementHeading: ''
    }
  },
  methods: {
    emitAdvertisementHeading: function () {
      this.$emit('emitAdvertisementHeadingEvent', this.advertisementHeading)
    },
    setAdvertisementHeading(advertisementHeading) {
      this.advertisementHeading = advertisementHeading
    },
  }
}
</script>