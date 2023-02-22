<template>
  <div id="app">
    <div>
      <div class="row justify-content-center" style="padding-top: 10px">
        <div v-if="isLoggedIn" class="col-4">

          <router-link type="button" class="btn btn-outline-secondary"
                       :to="{name:'newAdvertisementRoute', query:{isAdd: 'true'}}">Lisa kuulutus
          </router-link>
          <router-link type="button" class="btn btn-outline-secondary" to="/advertisements" style="margin-left: 15px">Sirvi kuulutusi
          </router-link>
        </div>

        <div v-else class="col-4">
          <router-link type="button" class="btn btn-outline-secondary" to="/advertisements" style="margin-left: 15px">Sirvi kuulutusi
          </router-link>
        </div>
        <div class="col-2">
          <router-link to="/home">
            <img src="./assets/logo-no-background.png" style="max-width: 50%"/>
          </router-link>
        </div>
        <div v-if="isLoggedIn" class="col-2">
          <router-link type="button" class="btn btn-outline-secondary" to="/my-advertisements">Minu
            kuulutused
          </router-link>
          <router-link type="button" class="btn btn-outline-secondary" to="/messages" style="margin-left: 10px">Sõnumid</router-link>
        </div>
        <div v-else class="col-2" style="margin-left: 10px">

        </div>
        <div class="col-2">
          <router-link
              v-if="isLoggedIn" v-on:click.native="logout" type="button" class="btn btn-outline-secondary" to="/home">
            Välju
          </router-link>

          <router-link v-else type="button" class="btn btn-outline-secondary" to="/login">Sisene</router-link>
          <router-link v-if="isLoggedIn === false" type="button" class="btn btn-outline-secondary" to="/new-user" style="margin-left: 15px">Loo
            kasutaja
          </router-link>
        </div>
      </div>
      <router-view @loginSuccess="updateLoginButton"/>
    </div>

  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      isLoggedIn: false,
      roleName: sessionStorage.getItem('roleName')
    }
  },

  methods: {
    updateLoginButton: function () {
      this.roleName = sessionStorage.getItem('roleName')
      this.isLoggedIn = this.roleName === 'admin' || 'user'
    },
    logout: function () {
      sessionStorage.clear()
      location.reload()
    }
  },



}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: aliceblue;
  height: 100%;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #d30505;
}
</style>
