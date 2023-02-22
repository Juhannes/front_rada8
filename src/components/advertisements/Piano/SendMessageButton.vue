<template>
  <button v-on:click="sendMessage" type="button" class="btn btn-dark">
    <font-awesome-icon icon="fa-regular fa-message"/>
    Saada sõnum
  </button>
</template>
<script>
export default {
  name: 'SendMessageButton',
  methods: {
    sendMessage: function () {
      this.$emit('sendMessageEvent')
    }
  }
}
</script>