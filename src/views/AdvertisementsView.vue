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
      <div class="col-10" v-else>
        <AdvertisementsPiano :advertisements="filteredAdvertisements" ref="advertisementsPiano"/>

      </div>

    </div>

  </div>
</template>

<script>
import CitiesDropdown from "@/components/CitiesDropdown.vue";
import TypeDropdown from "@/components/TypeDropdown.vue";
import AdvertisementsPiano from "@/components/advertisements/Piano/AdvertisementsPiano.vue";

export default {
  name: "AdvertisementsView",
  components: {AdvertisementsPiano, CitiesDropdown, TypeDropdown},
  mounted() {
    this.callMethodsInPiano()
  },
  data: function () {
    return {
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
    getAllActiveAdvertisements: function () {
      this.$http.get("/advertisements", {
            params: {
              status: 'A'
            }
          }
      ).then(response => {
        this.advertisements = response.data
        this.filteredAdvertisements = response.data
        this.$refs.citiesDropdown.setSelectedCityId(0)
        this.$refs.typeDropdown.setSelectedTypeId(0)
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
    openMessageWindow: function (advertisementId) {
      this.isNewMessage = true
      let advertisement = this.advertisements.find(advertisement => advertisement.id === advertisementId)
      this.outGoingMessage.subject = advertisement.header;
      this.getAdvertisementOwner(advertisement.userId);
      this.outGoingMessage.advertisementId = advertisementId;
    },
  }
  ,
  beforeMount() {
    this.getAllActiveAdvertisements()
  }
}


</script>
