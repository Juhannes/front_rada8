<template>
  <div class="col-8">
    <div v-for="advertisement in advertisements" class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne">
            <div class="row">
              <div class="col-7">
                {{ advertisement.header }}
              </div>
              <div class="col">
                Kuulutus lisatud: {{ advertisement.createdTimestamp }}
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
             data-bs-parent="#accordionExample">
          <div class="accordion-body col">
            <div class="bi-justify-left row">
              Asukoht: {{ advertisement.cityId }}
            </div>
            <br>
            <div class="row" >
              {{ advertisement.body }}
              <br>
              <img src="" class="rounded mx-auto d-block" alt="...">
            </div>
            <br>
            <div class="row">
              <div class="col">
                <!--User not logged in-->
                <NotLoggedInMessage v-if="!isLoggedIn"/>
                <!--User logged in-->
                <SendMessageButton v-if="isLoggedIn"/>
                <!--Advertiser logged in-->
                <EditAdvertisementButton v-if="isAdvertiser === advertisement.userId"/>
                <!--Admin logged in-->
                <DeleteAdvertisementButton v-if="isAdmin"/>


              </div>
              <div class="col">
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
      sessionUserId: sessionStorage.getItem('userId'),
      isLoggedIn: false,
      roleName: sessionStorage.getItem('roleName'),
      isAdmin: false,
      isAdvertiser: 0,

      cities: [
        {
          cityId: 0,
          cityName: ''
        }
      ]


    }
  },
  methods: {
    isAdvertiser: function () {
      this.isAdvertiser = Number(sessionStorage.getItem('userId'))
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