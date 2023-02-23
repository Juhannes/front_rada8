<template>
  <div>
    <div class="row" style="padding-top: 20px; padding-left: 10px">
      <div class="col-2">
        <div>
          Asukoht:
        </div>
        <CitiesDropdown ref="citiesDropdown" :is-search="isSearch" :advertisements="advertisements" @emitSelectedCityIdEvent="setCityId"/>
        <br>
        <div>
          Otsin:
        </div>
        <TypeDropdown ref="typeDropdown" :is-search="isSearch" @emitAdvertisementTypeEvent="setTypeId"/>
        <br>
        <button v-on:click="getAllActiveAdvertisements" type="button" class="btn btn-dark" style="margin: 10px">
          Tühista filtreeringud
        </button>
      </div>
      <div class="col-3" v-if="filteredAdvertisements.length < 1">
        Selles kategoorias kuulutused puuduvad!
      </div>
      <div class="col-6" v-else>
        <AdvertisementsPiano @openMessageWindowEvent="openMessageWindow" :advertisements="filteredAdvertisements" ref="advertisementsPiano"/>
      </div>
      <div class="col-3">
        <message-window @emitToggleMessageEvent="toggleMessage" :is-new-message="isNewMessage"
                        :advertisement-id="outGoingMessage.advertisementId" :view-message="viewMessage"
                        :message="outGoingMessage"/>
      </div>
    </div>

  </div>
</template>

<script>
import CitiesDropdown from "@/components/CitiesDropdown.vue";
import TypeDropdown from "@/components/TypeDropdown.vue";
import AdvertisementsPiano from "@/components/advertisements/Piano/AdvertisementsPiano.vue";
import MessageWindow from "@/components/messages/MessageWindow.vue";

export default {
  name: "AdvertisementsView",
  components: {MessageWindow, AdvertisementsPiano, CitiesDropdown, TypeDropdown},
  mounted() {
    this.callMethodsInPiano()
  },
  data: function () {
    return {
      searchBand: this.$route.query.searchBand,
      searchMember: this.$route.query.searchMember,
      searchEquip: this.$route.query.searchEquip,
      cityId: 0,
      typeId: 0,
      advertisements: [
        {
          advertisementId: 0,
          userId: 0,
          header: '',
          body: '',
          typeId: 0,
          cityId: 0,
          cityName: '',
          createdTimestamp: null,
          modifiedTimestamp: null,
          status: '',
          picture: null
        }
      ],
      filteredAdvertisements: [
        {
          advertisementId: 0,
          userId: 0,
          header: '',
          body: '',
          typeId: 0,
          cityId: 0,
          cityName: '',
          createdTimestamp: null,
          modifiedTimestamp: null,
          status: '',
          picture: null
        }
      ],
      isNewMessage: false,
      isSearch: true,
      viewMessage: false,
      outGoingMessage:
          {
            messageId: 0,
            conversationId: 0,
            subject: '',
            sender: {
              userId: 0,
              userName: '',
              email: ''
            },
            body: '',
            dateTime: '',
            status: '',
            advertisementId: 0
          }
    }
  },


  methods: {
    getAdvertisementsByCityIdAndTypeId: function () {
      this.$http.get("/advertisement-location-type", {
            params: {
              cityId: this.cityId,
              typeId: this.typeId,
              status: 'A'
            }
          }
      ).then(response => {
        this.filteredAdvertisements = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    setTypeId: function (typeId) {
      this.typeId = typeId
      this.getAdvertisementsByCityIdAndTypeId()
    },
    setCityId: function (cityId) {
      this.cityId = cityId
      this.getAdvertisementsByCityIdAndTypeId()
    },


    callMethodsInPiano: function () {

      this.$refs.advertisementsPiano.isUserLoggedIn()
      this.$refs.advertisementsPiano.isUserAdmin()
      this.$refs.advertisementsPiano.isUserAdvertiser()

    },
    setPresetType: function () {
      if (this.searchBand) {
        this.$refs.typeDropdown.setSelectedTypeId(1)
        this.setTypeId(1)
      } else if (this.searchMember) {
        this.$refs.typeDropdown.setSelectedTypeId(2)
        this.setTypeId(2)
      } else if (this.searchEquip) {
        this.$refs.typeDropdown.setSelectedTypeId(3)
        this.setTypeId(3)
      } else {
        this.$refs.typeDropdown.setSelectedTypeId(0)
      }
      this.$refs.citiesDropdown.setSelectedCityId(0);
    },

    getAllActiveAdvertisements: function () {
      this.$http.get("/advertisements", {
            params: {
              status: 'A'
            }
          }
      ).then(response => {
        this.advertisements = response.data
        this.filteredAdvertisements = response.data
        this.setPresetType();
      }).catch(error => {
        console.log(error)
      })
    },
    getAdvertisementOwner: function (userId) {
      this.$http.get("/user", {
            params: {
              userId: userId,
            }
          }
      ).then(response => {
        this.outGoingMessage.sender = response.data;
      }).catch(error => {
        console.log(error)
      })
    },
    openMessageWindow: function (advertisement) {
      this.isNewMessage = true
      this.viewMessage = true
      this.outGoingMessage.subject = advertisement.header;
      this.getAdvertisementOwner(advertisement.userId);
      this.outGoingMessage.advertisementId = advertisement.id;
    },
    toggleMessage: function (viewMessage) {
      this.viewMessage = !viewMessage;
    }
  },
  beforeMount() {
    this.getAllActiveAdvertisements()
  }
}


</script>
