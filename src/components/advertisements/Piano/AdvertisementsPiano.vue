<template>
  <div class="col-10">
    <div class="accordion" id="accordionExample">
      <div class="accordion-item" v-for="(advertisement, index) in advertisements" >
        <h2 class="accordion-header" :id="'heading'+ index">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne' + index"
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
        <div :id="'collapseOne' + index" class="accordion-collapse collapse" :aria-labelledby="'heading' +index">
          <div class="accordion-body col">
            <div class="bi-justify-left row">
              Asukoht: {{ advertisement.cityName }}
            </div>
            <br>
            <div class="row">
              {{ advertisement.body }}
              <div class="row">

                <button
                    v-if="advertisement.picture !== null" v-on:click="setSelectedAdvertisement(advertisement)"
                    type="button" class="btn btn-dark   col-2 justify-content-md-start" >
                Näita pilti
                </button>

              </div>
            </div>


            <br>
            <div class="row ">
              <div class="col">
                <!--User not logged in-->
                <NotLoggedInMessage v-if="!isLoggedIn"/>
                <!--Advertiser logged in-->
                <EditAdvertisementButton v-if="isAdvertiser === advertisement.userId" :advertisement="advertisement" />
                <!--User logged in-->
                <SendMessageButton @sendMessageEvent="openMessageWindow(advertisement)" v-else-if="isLoggedIn"/>
                <!--Admin logged in-->
                <DeleteAdvertisementButton v-if="isAdmin"/>


              </div>
              <div class="col">
                <div v-if="advertisement.createdTimestamp !== advertisement.editedTimestamp">
                Viimati muudetud: {{moment.utc(advertisement.editedTimestamp).format('D/MM/YYYY, HH:mm')}}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
    <PictureModal v-show="showModal" @close-modal="showModal = false" ref="pictureModal" :advertisement="selectedAdvertisement" />
  </div>
</template>
<script>
import SendMessageButton from "@/components/advertisements/Piano/SendMessageButton.vue";
import DeleteAdvertisementButton from "@/components/advertisements/Piano/DeleteAdvertisementButton.vue";
import EditAdvertisementButton from "@/components/advertisements/Piano/EditAdvertisementButton.vue";
import NotLoggedInMessage from "@/components/advertisements/Piano/NotLoggedInMessage.vue";
import ShowPictureModal from "@/components/advertisements/Piano/ShowPictureModal.vue";
import moment from "moment/moment";
import PictureModal from "@/components/advertisements/Piano/PictureModal.vue";


export default {
  name: 'AdvertisementsPiano',
  components: {
    PictureModal,
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
      selectedAdvertisement : {},
      sessionUserId: sessionStorage.getItem('userId'),
      isLoggedIn: false,
      roleName: sessionStorage.getItem('roleName'),
      isAdmin: false,
      isAdvertiser: 0,
      showModal: false



    }
  },
  methods: {


    setSelectedAdvertisement: function (advertisement) {
      this.selectedAdvertisement = advertisement
      this.$refs.pictureModal.setPicture(advertisement.picture)
      this.showModal = true
    },

    openMessageWindow: function (advertisement) {
      this.$emit('openMessageWindowEvent', advertisement)
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