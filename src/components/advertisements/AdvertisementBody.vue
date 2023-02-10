<template>
  <div class="input-group">
    <span class="input-group-text">Lisainfo: </span>
    <textarea v-model="advertisementBody" v-on:input="emitAdvertisementBody" class="form-control" aria-label="With textarea"></textarea>
  </div>
</template>
<script>
export default {
  name: 'AdvertisementBody',
  data: function () {
    return {
      advertisementBody: ''
    }
  },
  methods: {
    setAdvertisementBody(advertisementBody) {
      this.advertisementBody = advertisementBody
    },
    emitAdvertisementBody: function () {
      this.$emit('emitAdvertisementBodyEvent', this.advertisementBody)
    }
  }
}
</script>