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
          Nõustun
          <!-- Button trigger modal -->
          <a class="link-dark" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            kasutajatingimustega
          </a>

          <!-- Modal -->
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Keeldun</button>
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Nõustun</button>
                </div>
              </div>
            </div>
          </div>
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
