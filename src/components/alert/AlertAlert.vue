<template>
  <div v-if="messageAlert !==''" class="alert alert-warning" role="alert">
    {{ messageAlert }}
  </div>
</template>
<script>
export default {
  name: 'alertAlert',
  props: {
    messageAlert: {}
  }
}
</script>