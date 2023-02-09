<template>
  <div class="row justify-content-center">
    <div class="col-3">
      <div class="input-group mb-3">
        <input v-model="userDto.username" type="text" class="form-control" placeholder="Kasutajanimi" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input v-model="userDto.password" type="text" class="form-control" placeholder="Parool" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>

      <div class="input-group mb-3">
        <input v-model="userDto.email" type="text" class="form-control" placeholder="Email" aria-label="Username"
               aria-describedby="basic-addon1">
      </div>



      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
        <label class="form-check-label" for="defaultCheck1">
          Nõustun <a href="#" class="link-dark">kasutajatingimustega</a>
        </label>
      </div>
      <button v-on:click="createNewUser" type="button" class="btn btn-success">Loo uus kasutaja</button>




    </div>
  </div>

</template>

<script>
export default {
  name: "NewUserView",
  data: function () {
    return{
      userDto: {
        username: '',
        password: '',
        email: '',
      },


    }

  },
  methods: {
    createNewUser: function () {
      this.$http.post("/register", this.userDto
      ).then(response => {
        alert("Kasutaja edukalt lisatud!")
      }).catch(error => {
        alert("katki!!!!")
      })
    },

  }
}
</script>
