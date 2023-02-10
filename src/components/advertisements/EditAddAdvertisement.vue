<template>
  <div>
    <div class="p-3 border bg-light">
      <div class="row">
        <AdvertisementHeading ref="advertisementHeading" @emitAdvertisementHeadingEvent="setAdvertisementAddHeading"/>
      </div>
      <div class="row" style="padding: 5px">
        <CitiesDropdown ref="citiesDropdown" @emitSelectedCityIdEvent="setAdvertisementAddCityId"/>
      </div>
      <div class="row" style="padding: 5px">
        <TypeDropdown ref="typeDropdown" @emitAdvertisementTypeEvent="setAdvertisementAddType"/>
      </div>
      <div class="row">
        <AdvertisementBody ref="advertisementBody" @emitAdvertisementBodyEvent="setAdvertisementAddBody"/>
      </div>
      <div class="col-1" style="padding: 10px">
        <ActiveBox ref="activeBox" @emitActiveStatusEvent="setAdvertisementAddStatus"/>
      </div>

      <button v-on:click="addAdvertisement" type="button" class="btn btn-secondary btn-sm">Salvesta</button>
      <button type="button" class="btn btn-secondary btn-sm">Kustuta</button>
      <button type="button" class="btn btn-secondary btn-sm">Tühista</button>

    </div>
  </div>
</template>
<script>
import TypeDropdown from "@/components/TypeDropdown.vue";
import CitiesDropdown from "@/components/CitiesDropdown.vue";
import AdvertisementHeading from "@/components/advertisements/AdvertisementHeading.vue";
import AdvertisementBody from "@/components/advertisements/AdvertisementBody.vue";
import ActiveBox from "@/components/advertisements/ActiveBox.vue";


export default {
  name: 'EditAddAdvertisement',
  components: {ActiveBox, AdvertisementBody, AdvertisementHeading, CitiesDropdown, TypeDropdown},
  data: function () {
    return {
      advertisementAdd: {
        userId: 2,
        header: '',
        body: '',
        typeId: 0,
        cityId: 0,
        createdTimestamp: null,
        editedTimestamp: null,
        status: '',
        picture: null
      },
      advertisementId: 0
    }
  },
  methods: {
    setAdvertisementAddHeading(advertisementHeading) {
      this.advertisementAdd.header = advertisementHeading
    },

    getAdvertisementFilled: function () {
      this.$http.get("/my-advertisements", {
            params: {
              advertisementId: this.advertisementId,
            }
          }
      ).then(response => {
        this.advertisementAdd = response.data

        this.$refs.citiesDropdown.setSelectedCityId(this.advertisementAdd.cityId)
        this.$refs.typeDropdown.setSelectedTypeId(this.advertisementAdd.typeId)
      }).catch(error => {
        console.log(error)
      })
    },

    addAdvertisement: function () {
      this.callAdvertisementAddEmits()
      this.setAdvertisementCreatedTimestamp()
      this.setAdvertisementEditedTimestamp()
      this.postAdvertisement()
    },

    callAdvertisementAddEmits: function () {
      this.$refs.advertisementHeading.emitAdvertisementHeading()
      this.$refs.citiesDropdown.emitSelectedCityId()
      this.$refs.advertisementBody.emitAdvertisementBody()
      this.$refs.typeDropdown.emitSelectedAdvertisementType()
      this.$refs.activeBox.emitActiveStatus()
      console.log(this.advertisementAdd)
    },

    setAdvertisementAddCityId(cityId) {
      this.advertisementAdd.cityId = cityId
    },

    setAdvertisementAddBody(body) {
      this.advertisementAdd.body = body
    },

    setAdvertisementAddType(typeId) {
      this.advertisementAdd.typeId = typeId
    },

    setAdvertisementCreatedTimestamp() {
      this.advertisementAdd.createdTimestamp = Date()
    },

    setAdvertisementEditedTimestamp() {
      this.advertisementAdd.editedTimestamp = Date()
    },

    setAdvertisementAddStatus(status) {
      this.advertisementAdd.status = status
    },

    postAdvertisement: function () {
      this.$http.post("/my-advertisements", this.advertisementAdd
      ).then(response => {
        console.log(response.data)
        alert("Uus kuulutus lisatud")
      }).catch(error => {
        console.log(error)
      })
    },

  }
}
</script>