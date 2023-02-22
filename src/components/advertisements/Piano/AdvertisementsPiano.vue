<template>
  <div class="col-8">
    <AlertSuccess :message-success="this.messageSuccess"/>
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

<!--                <button-->
<!--                    v-if="advertisement.picture !== null" v-on:click="setSelectedAdvertisement(advertisement)"-->
<!--                    type="button" class="btn btn-dark   col-2 justify-content-md-start" >-->
<!--                Näita pilti-->
<!--                </button>-->
                <button id="show-modal" @click="setSelectedAdvertisement">Show Modal</button>

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
                <SendMessageButton v-else-if="isLoggedIn"/>
                <!--Admin logged in-->
                <button v-if="isAdmin" type="button" class="btn btn-dark" v-on:click="deleteAdvertisement(advertisement)">
                  <font-awesome-icon icon="fa-solid fa-trash-can" class="mx-2 icon-hover"/>
                  Kustuta kuulutus
                </button>
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
<!--    <PictureModal v-show="showModal" @close-modal="showModal = false" ref="pictureModal" :advertisement="selectedAdvertisement" />-->
    <PictureModal :show="showModal" @close="showModal = false" ref="pictureModal"></PictureModal>
  </div>
</template>
<script>
import SendMessageButton from "@/components/advertisements/Piano/SendMessageButton.vue";
import EditAdvertisementButton from "@/components/advertisements/Piano/EditAdvertisementButton.vue";
import NotLoggedInMessage from "@/components/advertisements/Piano/NotLoggedInMessage.vue";
import moment from "moment/moment";
import PictureModal from "@/components/advertisements/Piano/PictureModal.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";


export default {
  name: 'AdvertisementsPiano',
  components: {
    AlertSuccess,
    PictureModal,
    NotLoggedInMessage, EditAdvertisementButton, SendMessageButton
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
      showModal: false,
      messageSuccess: ''





    }
  },
  methods: {
    deleteAdvertisement: function (advertisement) {

      this.$http.delete("/my-advertisements", {
            params: {
              advertisementId: advertisement.id
            }
          }
      ).then(response => {
       this.messageSuccess = 'Kuulutus kustutatud'
        this.timeoutAndGoBack(2000)
      }).catch(error => {
        console.log(error)
      })
    },
    timeoutAndGoBack: function (timeOut) {
      setTimeout(() => {
        this.$router.go(0)
      }, timeOut)
    },

    setSelectedAdvertisement: function (advertisement) {
      this.selectedAdvertisement = advertisement
      this.$refs.pictureModal.setPicture(advertisement.picture)
      this.showModal = true
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