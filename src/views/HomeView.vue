<template>
  <div>
    <vue-particles color="#2c3e50"
                   :particleOpacity="0.7"
                   :particlesNumber="70"
                   shapeType="star"
                   :particleSize="6"
                   linesColor="#2c3e50"
                   :linesWidth="3"
                   :lineLinked="true"
                   :lineOpacity="0.2"
                   :linesDistance="200"
                   :moveSpeed="3"
                   :hoverEffect="true"
                   hoverMode="grab"
                   :clickEffect="true"
                   clickMode="push"
                   class="particles-js">
    </vue-particles>
    <div class="row justify-content-center">
      <div class="col-3">
        <AlertSuccess :message-success="messageSuccess"/>
      </div>
    </div>
    <div class="row">
      <div class="centered-text-h1" style="padding: 50px">
        <h1>Ei viitsi enam üksi pilli tinistada või on bändist puudu see üks ja ainus?</h1>
      </div>
      <div class="centered-text-h2" style="padding-bottom: 20px">
        <h2>Pole vaja kaugelt otsida!</h2>
      </div>
    </div>

    <div class="row centered-text-h3 justify-content-center">
      <div class="col-2">
        <button v-on:click="searchBand" type="button" class="btn btn-outline-secondary">Otsin bändi</button>
      </div>
      <div class="col-3">
        <button v-on:click="searchBandMember" type="button" class="btn btn-outline-secondary">Otsin bändikaaslast</button>
      </div>
      <div class="col-2">
        <button v-on:click="searchEquipment" type="button" class="btn btn-outline-secondary">Otsin varustust</button>
      </div>
    </div>
    <div class="row centered-text-h4 justify-content-center" style="padding: 10px">
      <div class="col-2">
        <button v-on:click="addAdvertisement" type="button" class="btn btn-outline-secondary">Lisan kuulutuse</button>
      </div>
    </div>

  </div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'HomeView',
  components: {
    AlertSuccess,
    HelloWorld
  },
  data: function () {
    return {
      isLoggedIn: false,
      roleName: sessionStorage.getItem('roleName'),
      messageSuccess: ''
    }

  },
  methods: {
    searchBand: function () {
      this.$router.push({name: "advertisementsRoute", query:{searchBand: 'true'}})
    },
    searchBandMember: function () {
      this.$router.push({name: "advertisementsRoute", query:{searchMember: 'true'}})
    },
    searchEquipment: function () {
      this.$router.push({name: "advertisementsRoute", query:{searchEquip: 'true'}})
    },
    setMessageSuccess: function () {

      this.messageSuccess = localStorage.getItem("messageSuccess")
      localStorage.removeItem("messageSuccess")
      if (this.messageSuccess == null){
        this.messageSuccess = ''
      }
    },
    addAdvertisement: function () {
      this.isLoggedIn = this.roleName != null;

      if (this.isLoggedIn) {
        this.$router.push({name: "newAdvertisementRoute", query:{isAdd: 'true'}});
      } else {
        this.$router.push({name: "loginRoute"})
      }
    },
  },
  beforeMount() {
    this.setMessageSuccess()
  }

}
</script>

<style>
</style>
