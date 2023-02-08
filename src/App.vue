<template>
  <div id="app" style="background-color: aliceblue">
    <nav>
      <div class="row justify-content-end">
        <div class="col-2">
          <router-link type="button" class="btn btn-outline-secondary" to="/">Minu kuulutused</router-link>
        </div>
        <div class="col-1">
          <router-link type="button" class="btn btn-outline-secondary" to="/about">Sõnumid</router-link>
        </div>
        <div class="col-2">
          <router-link type="button" class="btn btn-outline-secondary" to="/about">Logi välja</router-link>
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
