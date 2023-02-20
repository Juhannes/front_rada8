<template>
  <div>
    <div class="row">
      <div class="col-3">
        <CitiesDropdown @emitSelectedCityIdEvent="setCityId"/>
        <br>
        <br>
        <br>
        <div>
          Otsin:
        </div>
        <TypeDropdown @emitAdvertisementTypeEvent="setTypeId" />
        <button v-on:click="getAdvertisementsByCityIdAndTypeId" type="button" class="btn btn-dark">
          Filtreeri tulemusi
        </button>
      </div>
      <AdvertisementsPiano :advertisements="advertisements" ref="advertisementsPiano"/>
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
      cityId: '',
      typeId:'',

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
          editedTimestamp: null,
          status: '',
          picture: null
        }
      ],
      isNewMessage: false,
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
        this.advertisements = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    setTypeId: function (typeId) {
      this.typeId = typeId
    },
    setCityId: function (cityId) {
      this.cityId = cityId
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
    }
    ,
    openMessageWindow: function (advertisementId) {
      this.isNewMessage = true
      let advertisement = this.advertisements.find(advertisement => advertisement.id === advertisementId)
      this.outGoingMessage.subject = advertisement.header;
      this.getAdvertisementOwner(advertisement.userId);
      this.outGoingMessage.advertisementId = advertisementId;
    },
  },
  beforeMount() {
    this.getAllActiveAdvertisements()

  }
}


</script>
