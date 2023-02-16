<template>
  <div>
  <div>Sõnumi saatmiseks</div>
  <a v-on:click="pushToLogin" class="link-dark">logi sisse</a>
  </div>
</template>
<script>
export default {
  name: 'NotLoggedInMessage',

  methods: {
    pushToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    },
  }
}
</script>