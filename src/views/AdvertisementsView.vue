<template>
  <div>
    <div class="row">
      <div class="col-3">
        <div>
          Asukoht:
        </div>
        <CitiesDropdown :is-search="isSearch" :advertisements="advertisements"/>
        <br>
        <select v-model="advertisements.cityName" class="form-select" aria-label="Default select example">
          <option value="0">Kõik linnad</option>
          <option v-for="advertisements in advertisements" :value="advertisements.cityName">
            {{advertisements.cityName}}
          </option>

        </select>
        <br>
        <button v-on:click="setCityNames" type="button" class="btn btn-primary">Test</button>
        <br>
        <div>
          Otsin:
        </div>
        <TypeDropdown :is-search="isSearch"/>
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
      cities: [
        {
          id: 0,
          name: ''
        }
      ],
      availableCities: [
        {
          name: ''
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
    callMethodsInPiano: function () {

      this.$refs.advertisementsPiano.isUserLoggedIn()
      this.$refs.advertisementsPiano.isUserAdmin()
      this.$refs.advertisementsPiano.isUserAdvertiser()

    },
    getAllAdvertisements: function () {
      this.$http.get("/advertisements")
          .then(response => {
            this.advertisements = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }
    ,
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
    getAllCities: function () {
      this.$http.get("/cities")
          .then(response => {
            this.cities = response.data;
          })
          .catch(error => {
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

    setCityNames: function () {
      for (let i = 0; i < this.advertisements.length; i++) {
        for (let j = 0; j < this.cities.length; j++)
          if (this.advertisements[i].cityId === this.cities[j].id) {
            this.advertisements[i].cityName = this.cities[j].name
            console.log(this.cities[j].name)
          }
      }
    }
  }
  ,
  beforeMount() {
    this.getAllAdvertisements()
    this.getAllCities()
    this.setCityNames()
  }
}


</script>
