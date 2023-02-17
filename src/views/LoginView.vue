<template>


  <div class="row justify-content-center">




    <div style="margin: 20px" class="col-3">
      <AlertSuccess :message-success="messageSuccess"/>
      <AlertDanger :message-danger="messageDanger"/>

      <div class="input-group mb-3">
        <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Parool" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>

      <button v-on:click="sendLoginRequest" type="button" class="btn btn-success">Sisene</button>
    </div>

  </div>


</template>

<script>


import newUserView from "@/views/NewUserView.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "LoginView",
  components: {AlertSuccess, AlertDanger},
  data: function () {
    return {
      loginFailed: {
        message:'',
        errorCode:''
      },

      loginResponse: {
        userId: 0,
        roleName: '',
        email: '',
      },
      messageDanger:'',
      messageSuccess: '',
      username: '',
      password: '',
    }
  },

  methods: {
    setMessageSuccess: function () {

      this.messageSuccess = localStorage.getItem("messageSuccess")
      localStorage.removeItem("messageSuccess")
      if (this.messageSuccess == null)
      this.messageSuccess = ''
    },


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
        this.$emit('loginSuccess')
        this.messageDanger = ''
        localStorage.setItem("messageSuccess", "Tere tulemast!")
        this.$router.push({name: 'home'})


      }).catch(error => {

        this.loginFailed = error.response.data
        this.messageDanger = this.loginFailed.message
      })
    },

  },
  beforeMount() {
    this.setMessageSuccess()
  }
}

</script>
