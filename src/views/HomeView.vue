<template>
  <div>
    <div class="row">
      <div style="padding: 50px">
        <h1>Ei viitsi enam üksi pilli tinistada või on bändist puudu see üks ja ainus?</h1>
      </div>
      <div style="padding-bottom: 20px">
        <h2>Pole vaja kaugelt otsida!</h2>
      </div>
    </div>
    <div class="row justify-content-center">
<!--      Search bar-->
<!--      <div class="row justify-content-center">-->
<!--        <div class="col-3">-->
<!--          <div class="input-group">-->
<!--            <input type="text" class="form-control" placeholder="Otsi kuulutuse tekstist"-->
<!--                   aria-label="Recipient's username" aria-describedby="button-addon2">-->
<!--            <button class="btn btn-outline-secondary" type="button" id="button-addon2">-->
<!--              <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>-->
<!--              Otsi-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="col-2">
        <button v-on:click="searchBand" type="button" class="btn btn-outline-secondary">Otsin bändi</button>
      </div>
      <div class="col-3">
        <button type="button" class="btn btn-outline-secondary">Otsin bändikaaslast</button>
      </div>
      <div class="col-2">
        <button type="button" class="btn btn-outline-secondary">Otsin varustust</button>
      </div>
    </div>
    <div class="row justify-content-center" style="padding: 10px">
      <div class="col-2">
        <button v-on:click="addAdvertisement" type="button" class="btn btn-outline-secondary">Lisan kuulutuse</button>
      </div>
    </div>
    <vue-particles color="#2c3e50"
                   :particleOpacity="0.7"
                   :particlesNumber="50"
                   shapeType="star"
                   :particleSize="6"
                   linesColor="#2c3e50"
                   :linesWidth="3"
                   :lineLinked="true"
                   :lineOpacity="0.4"
                   :linesDistance="150"
                   :moveSpeed="2"
                   :hoverEffect="true"
                   hoverMode="grab"
                   :clickEffect="false"
                   clickMode="push"
                   class="particles-js">
    </vue-particles>
  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data: function () {
    return {
      isLoggedIn: false,
      roleName: sessionStorage.getItem('roleName')
    }
  },
  methods: {
    searchBand: function () {
      this.$router.push({name: "advertisementsRoute"})
    },
    addAdvertisement: function () {
      this.isLoggedIn = this.roleName != null;

      if (this.isLoggedIn) {
        this.$router.push({name: "newAdvertisementRoute"});
      } else {
        this.$router.push({name: "loginRoute"})
      }
    },
  }

}
</script>

<style>

</style>
