<template>
  <div class="col-8">
    <div class="accordion" id="accordionExample">
      <div class="accordion-item" v-for="(advertisement, index) in advertisements" >
        <h2 class="accordion-header" :id="'heading'+ index">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + index"
                  aria-expanded="true" :aria-controls="'collapseOne' + index">
            <div class="row">
              <div class="col-10">
                {{ advertisement.header }}
              </div>
              <div class="col">
                Kuulutus lisatud: {{moment.utc(advertisement.createdTimestamp).format('D/MM/YYYY, HH:mm')}}
              </div>
            </div>
          </button>
        </h2>
        <div :id="'collapseOne' + index" class="accordion-collapse collapse show" :aria-labelledby="'heading' +index">
          <div class="accordion-body col">
            <div class="bi-justify-left row">
              Asukoht: {{ advertisement.cityName }}
            </div>
            <br>
            <div class="row">
              {{ advertisement.body }}
              <div class="row">

              <button v-if="advertisement.picture !== null" type="button" class="btn btn-dark   col-2 justify-content-md-start" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Näita pilti
              </button>
              </div>


            </div>
              <ShowPictureModal :advertisement="advertisement"/>

            <br>
            <div class="row">
              <div class="col">
                <!--User not logged in-->
                <NotLoggedInMessage v-if="!isLoggedIn"/>
                <!--Advertiser logged in-->
                <EditAdvertisementButton v-if="isAdvertiser === advertisement.userId"/>
                <!--User logged in-->
                <SendMessageButton v-else-if="isLoggedIn"/>
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
import ShowPictureModal from "@/components/advertisements/Piano/ShowPictureModal.vue";
import moment from "moment/moment";


export default {
  name: 'AdvertisementsPiano',
  components: {
    ShowPictureModal,
   NotLoggedInMessage, EditAdvertisementButton, DeleteAdvertisementButton, SendMessageButton
  },
  computed: {
    moment() {
      return moment
    }
  },
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
      pictureData: this.advertisements.picture


    }
  },
  methods: {
    sendPictureDataToModal: function () {

    },

    isUserAdvertiser: function () {
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