<template>
  <div v-if="messageSuccess !== ''" class="alert alert-success" role="alert">
    {{ messageSuccess }}
  </div>
</template>
<script>
export default {
  name: 'alertSuccess',
  props: {
    messageSuccess: {}
  }
}
</script>