<template>
  <div class="col-8" style="border: thin solid black">
    <div v-for="advertisement in advertisements" class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne">
            <div class="row">
              <div class="col-7" style="border: thin solid black">
                {{ advertisement.header }}
              </div>
              <div class="col" style="border: thin solid black">
                Kuulutus lisatud: {{ advertisement.createdTimestamp }}
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
             data-bs-parent="#accordionExample">
          <div class="accordion-body col">
            <div class="bi-justify-left row" style="border: thin solid black">
              Asukoht: {{ advertisement.cityId }}
            </div>
            <br>
            <div class="row" style="border: thin solid black">
              {{ advertisement.body }}
            </div>
            <br>
            <div class="row" style="border: thin solid black">
              <div class="col" style="border: thin solid black">
                <!--User not logged in-->
                <div v-if="isLoggedOut">Sõnumi saatmiseks</div>
                <a v-if="isLoggedOut" v-on:click="pushToLogin" class="link-dark">logi sisse</a>
                <!--User logged in-->
                <SendMessageButton  v-else-if="!isLoggedOut"/>

                <!--Admin logged in-->
                <SendMessageButton  v-else-if="!isLoggedOut"/>



              </div>
              <div class="col" style="border: thin solid black">
                Viimati muudetud: {{ advertisement.modifiedTimestamp }}
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>

  </div>
</template>
<script>
import SendMessageButton from "@/components/SendMessageButton.vue";

export default {
  name: 'AdvertisementsPiano',
  components: {SendMessageButton},
  props: {
    advertisements: {}
  },
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      isLoggedOut: true,
      roleName: sessionStorage.getItem('roleName'),
      isAdmin: false

    }
  },
  methods: {

    isAdmin: function () {
            this.isAdmin = this.roleName === 'admin'
    },
    pushToLogin: function () {
      this.$router.push({name: 'loginRoute'})
    },
    isUserLoggedOut: function () {
      this.isLoggedOut = this.userId === null;

    }
  }

}
</script>