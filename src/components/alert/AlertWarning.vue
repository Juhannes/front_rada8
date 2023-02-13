<template>
  <div>

    <div v-if="messageWarning !==''" class="alert alert-warning" role="alert">
      {{ messageWarning }}

    </div>
  </div>
</template>
<script>
export default {
  name: 'alertWarning',
  props: {
    messageWarning: {}
  }
}
</script>