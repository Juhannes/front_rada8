<template>



  <div class="row justify-content-center">
    <AlertSuccess :message-success="messageSuccess"/>


    <div class="col-3">
      <div class="input-group mb-3">
        <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input v-model="password" type="text" class="form-control" placeholder="Parool" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>

      <button v-on:click="sendLoginRequest" type="button" class="btn btn-success">Sisene</button>
    </div>
    </div>

</template>

<script>


import newUserView from "@/views/NewUserView.vue";

export default {
  name: "LoginView",
  data: function() {
    return{

      loginResponse:{
        userId: 0,
        roleName:'',
        email:'',
      },
      messageSuccess:'',
      username:'',
      password:'',
    }
  },

  methods: {


    sendLoginRequest: function () {
      this.$http.get("/login", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('roleName', this.loginResponse.roleName)
        sessionStorage.setItem('email', this.loginResponse.email)

      }).catch(error => {

        alert("katki!!!")
      })
    },

  }

}

</script>
