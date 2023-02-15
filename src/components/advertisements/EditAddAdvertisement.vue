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
      <div>
        <ImageInput style="padding: 10px" @emitBase64Event="setAdvertisementAddPicture"/>
      </div>
      <div>
        <div class="container">
          <img class="container" v-if="advertisementAdd.picture !== null" :src="advertisementAdd.picture">
        </div>
      </div>

      <button v-if="isAdd" v-on:click="addAdvertisement" type="button" class="btn btn-secondary btn-sm">Salvesta</button>
      <button v-else v-on:click="editAdvertisement" type="button" class="btn btn-secondary btn-sm">Salvesta muudatused</button>
      <button v-if="!isAdd" v-on:click="deleteAdvertisement" type="button" class="btn btn-secondary btn-sm">Kustuta</button>
      <button v-if="!isAdd" v-on:click="returnToMyAds" type="button" class="btn btn-secondary btn-sm">Tühista</button>
      <button v-else v-on:click="$router.go(-1)" type="button" class="btn btn-secondary btn-sm">Tühista</button>

    </div>
  </div>
</template>
<script>
import TypeDropdown from "@/components/TypeDropdown.vue";
import CitiesDropdown from "@/components/CitiesDropdown.vue";
import AdvertisementHeading from "@/components/advertisements/AdvertisementHeading.vue";
import AdvertisementBody from "@/components/advertisements/AdvertisementBody.vue";
import ActiveBox from "@/components/advertisements/ActiveBox.vue";
import router from "@/router";
import ImageInput from "@/components/ImageInput.vue";

export default {
  name: 'EditAddAdvertisement',
  components: {ImageInput, ActiveBox, AdvertisementBody, AdvertisementHeading, CitiesDropdown, TypeDropdown},
  props: {
    isAdd: Boolean
  },
  data: function () {
    return {
      advertisementAdd: {
        userId: 0,
        header: '',
        body: '',
        typeId: 0,
        cityId: 0,
        createdTimestamp: null,
        editedTimestamp: null,
        status: '',
        picture: null
      },
      advertisementId: 0,
      userId: sessionStorage.getItem('userId')
    }
  },
  methods: {
    router() {
      return router
    },
    addAdvertisement: function () {
      this.callAdvertisementAddEmits()
      this.setAdvertisementCreatedTimestamp()
      this.setAdvertisementEditedTimestamp()
      this.advertisementAdd.userId = this.userId
      this.postAdvertisement()
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

    editAdvertisement: function () {
      this.callAdvertisementAddEmits()
      this.setAdvertisementEditedTimestamp()
      this.advertisementAdd.userId = this.userId
      this.putAdvertisement()
      console.log(this.userId)
      console.log(this.advertisementAdd.cityId)
    },

    putAdvertisement: function () {
      this.$http.put("/my-advertisements", this.advertisementAdd, {
            params: {
              advertisementId: this.advertisementId,
            }
          }
      ).then(response => {
        this.$router.push({name: 'myAdvertisementsRoute'})
      }).catch(error => {
        console.log(error)
        alert("Nii küll ei saa rallit sõita" + this.advertisementId)
      })
    },

    deleteAdvertisement: function () {
      this.$http.delete("/my-advertisements", {
            params: {
              advertisementId: this.advertisementId,
            }
          }
      ).then(response => {
        this.$router.push({name: 'myAdvertisementsRoute'})
      }).catch(error => {
        console.log(error)
      })
    },

    returnToMyAds: function () {
      this.$router.push({name: 'myAdvertisementsRoute'})
    },

    callAdvertisementAddEmits: function () {
      this.$refs.advertisementHeading.emitAdvertisementHeading()
      this.$refs.citiesDropdown.emitSelectedCityId()
      this.$refs.advertisementBody.emitAdvertisementBody()
      this.$refs.typeDropdown.emitSelectedAdvertisementType()
      this.$refs.activeBox.emitActiveStatus()
    },

    setAdvertisementAddHeading(advertisementHeading) {
      this.advertisementAdd.header = advertisementHeading
      this.$refs.advertisementHeading.setAdvertisementHeading(advertisementHeading)
    },

    setAdvertisementAddCityId(cityId) {
      this.advertisementAdd.cityId = cityId
      this.$refs.citiesDropdown.setSelectedCityId(cityId)
    },

    setAdvertisementAddId(advertisementId) {
      this.advertisementId = advertisementId
    },

    setAdvertisementAddBody(body) {
      this.advertisementAdd.body = body
      this.$refs.advertisementBody.setAdvertisementBody(body)
    },

    setAdvertisementAddType(typeId) {
      this.advertisementAdd.typeId = typeId
      this.$refs.typeDropdown.setSelectedTypeId(typeId)
    },

    setAdvertisementAddPicture: function (pictureBas64Data) {
      this.advertisementAdd.picture = pictureBas64Data
    },

    setAdvertisementCreatedTimestamp() {
      this.advertisementAdd.createdTimestamp = Date()
    },

    setAdvertisementEditedTimestamp() {
      this.advertisementAdd.editedTimestamp = Date()
    },

    setAdvertisementAddStatus(status) {
      this.advertisementAdd.status = status
      this.$refs.activeBox.setActiveStatus(status)
    },
  },
  beforeMount() {
    console.log("Id on: " + this.advertisementId)
  }
}
</script>