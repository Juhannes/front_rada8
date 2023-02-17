<template>
  <div class="row justify-content-center" style="padding: 20px">
    <div class="col-3">

      <AlertWarning :message-warning="messageWarning"/>
      <AlertDanger :message-danger="alertDanger"/>


      <div class="input-group mb-3">
        <input v-model="userDto.username" type="text" class="form-control" placeholder="Kasutajanimi"
               aria-label="Username"
               aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input v-model="userDto.password" type="password" class="form-control" placeholder="Parool" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input v-model="userDto.email" type="text" class="form-control" placeholder="Email" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>


      <div class="form-check">
        <div>
          <input v-model="isSelected" :disabled="isDisabled" class="form-check-input" type="checkbox" id="checkboxNoLabel">
        </div>
        <label class="form-check-label" for="defaultCheck1">
          Nõustun
          <!-- Button trigger modal -->
          <a class="link-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            kasutajatingimustega
          </a>

          <!-- Modal -->
          <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="staticBackdropLabel"
               aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Kasutajatingimused</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                  Don't be a dick!

                </div>
                <div class="modal-footer">
                  <button v-on:click="isSelected = false" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ei nõustu</button>
                  <button v-on:click="isSelected = true" type="button" class="btn btn-success" data-bs-dismiss="modal">Nõustun</button>
                </div>
              </div>
            </div>
          </div>
        </label>
      </div>
      <button v-on:click="messageReset" :disabled="!isSelected" type="button" class="btn btn-success">Loo uus kasutaja
      </button>


    </div>
  </div>

</template>

<script>


import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertWarning from "@/components/alert/AlertWarning.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";


export default {
  name: "NewUserView",
  components: {AlertDanger, AlertWarning, AlertSuccess},
  data: function () {
    return {
      userDto: {
        username: '',
        password: '',
        email: '',
      },
      isSelected: false,
      isDisabled: false,

      messageWarning: '',
      alertDanger: ''



    }

  },
  methods: {
    sendNewUserToDb: function () {
      this.$http.post("/register", this.userDto
      ).then(response => {
        localStorage.setItem("messageSuccess", "Kasutaja loomine õnnestus")
        this.goToLogin()
      }).catch(error => {
        this.alertDanger = "Kõik on katki, proovi uuesti :)"
      })
    },
    checkInput: function () {
      return this.userDto.username !== '' &&
          this.userDto.password !== '' &&
          this.userDto.email !== ''

    },
    addNewUser: function () {

      if (this.checkInput()) {
        this.sendNewUserToDb()
      } else this.messageWarning = "Täida kõik väljad!"
    },
    messageReset: function () {

      this.messageWarning = ''
      this.alertDanger = ''
      this.addNewUser()
    },
    goToLogin: function () {
      this.$router.push({name: "loginRoute"})
    }


  }
}
</script>
