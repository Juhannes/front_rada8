<template>
  <div v-if="messageDanger !==''" class="alert alert-danger" role="alert">
    {{messageDanger}}
  </div>
</template>
<script>
export default {
  name: 'MessageDanger',
  props: {
    messageDanger: {}
  }
}
</script>