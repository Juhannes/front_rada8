<template>
  <div>

    <div class="row justify-content-center" style="padding: 50px">
      Minu profiil:
    </div>
    <div class="row">

    </div>

  </div>
</template>

<script>
export default {
  name: "MyProfileView",
  data: function () {
    return {
      userId: this.sessionStorage.getItem('userId'),
      user: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    getUserInfo: function () {
      this.$http.get("/some/path", {
            params: {
              someRequestParam1: this.someDataBlockVariable1,
              someRequestParam2: this.someDataBlockVariable2
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  }

}
</script>

<style scoped>

</style>