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
                <NotLoggedInMessage v-if="!isLoggedIn"/>
                <!--User logged in-->
                <SendMessageButton v-if="isLoggedIn"/>
                <!--Advertiser logged in-->
                <EditAdvertisementButton v-if="sessionUserId === advertisement.userId"/>
                <!--Admin logged in-->
                <DeleteAdvertisementButton v-if="isAdmin"/>


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
import SendMessageButton from "@/components/advertisements/Piano/SendMessageButton.vue";
import DeleteAdvertisementButton from "@/components/advertisements/Piano/DeleteAdvertisementButton.vue";
import EditAdvertisementButton from "@/components/advertisements/Piano/EditAdvertisementButton.vue";
import NotLoggedInMessage from "@/components/advertisements/Piano/NotLoggedInMessage.vue";

export default {
  name: 'AdvertisementsPiano',
  components: {NotLoggedInMessage, EditAdvertisementButton, DeleteAdvertisementButton, SendMessageButton},
  props: {
    advertisements: {}
  },
  data: function () {

    return {
      sessionUserId: Number(sessionStorage.getItem('userId')),
      isLoggedIn: true,
      roleName: sessionStorage.getItem('roleName'),
      isAdmin: false,

      cities: [
        {
          cityId: 0,
          cityName: ''
        }
      ]


    }
  },
  methods: {
    getAllCities: function () {
      this.$http.get("/cities")
          .then(response => {
            this.cities = this.response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    isUserAdmin: function () {
      this.isAdmin = this.roleName === 'admin'
    },

    isUserLoggedIn: function () {
      this.isLoggedIn = this.sessionUserId !== null;

    }
  }

}
</script>