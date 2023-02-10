<template>
  <div id="app" style="background-color: aliceblue">
    <nav>
      <div class="row justify-content-end">
        <div class="col justify-content-start">
          <router-link type="button" class="btn btn-outline-secondary" to="/new-user">Loo kasutaja</router-link>
        </div>
        <div class="col-2">
          <router-link to="/home">
          <img  src="./assets/logo-no-background.png" style="max-width: 50%"/>
          </router-link>
        </div>

        <div class="col-2">
          <router-link type="button" class="btn btn-outline-secondary" to="/my-advertisements">Minu kuulutused
          </router-link>
        </div>
        <div class="col-1">
          <router-link type="button" class="btn btn-outline-secondary" to="/messages">Sõnumid</router-link>
        </div>
        <div class="col-2">
          <router-link type="button" class="btn btn-outline-secondary" to="/home">Logi välja</router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

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
