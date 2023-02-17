<template>
  <div>
    <AlertSuccess :message-success="messageSuccess"/>
    <AlertWarning :message-warning="messageError"/>

    <div class="p-3 border bg-light">
      <div class="row">
        <AdvertisementHeading ref="advertisementHeading" @emitAdvertisementHeadingEvent="setAdvertisementAddHeading"/>
      </div>
      <div class="row" style="margin: 1px">
        <CitiesDropdown ref="citiesDropdown" @emitSelectedCityIdEvent="setAdvertisementAddCityId"/>
      </div>
      <div class="row" style="margin: 1px">
        <TypeDropdown ref="typeDropdown" @emitAdvertisementTypeEvent="setAdvertisementAddType"/>
      </div>
      <div class="row" style="padding-top: 10px">
        <AdvertisementBody ref="advertisementBody" @emitAdvertisementBodyEvent="setAdvertisementAddBody"/>
      </div>
      <div class="col-1" style="padding: 10px">
        <ActiveBox ref="activeBox" @emitActiveStatusEvent="setAdvertisementAddStatus"/>
      </div>
      <div>
        <ImageInput style="padding: 10px" @emitBase64Event="setAdvertisementAddPicture"/>
      </div>
      <div>
        <div>
          <img class="container" v-if="advertisementAdd.picture !== null" :src="advertisementAdd.picture">
        </div>
      </div>

      <button v-if="isAdd" v-on:click="addAdvertisement" type="button" class="btn btn-secondary btn-sm mystyle">Salvesta</button>
      <button v-else v-on:click="editAdvertisement" type="button" class="btn btn-secondary btn-sm mystyle">Salvesta muudatused</button>
      <button v-if="!isAdd" v-on:click="deleteAdvertisement" type="button" class="btn btn-secondary btn-sm mystyle">Kustuta</button>
      <button v-if="!isAdd" v-on:click="returnToMyAds" type="button" class="btn btn-secondary btn-sm mystyle">Tühista</button>
      <button v-else v-on:click="$router.go(-1)" type="button" class="btn btn-secondary btn-sm mystyle">Tühista</button>

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
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertWarning from "@/components/alert/AlertWarning.vue";

export default {
  name: 'EditAddAdvertisement',
  components: {
    AlertWarning,
    AlertSuccess,
    ImageInput, ActiveBox, AdvertisementBody, AdvertisementHeading, CitiesDropdown, TypeDropdown},
  props: {
    isAdd: Boolean
  },
  data: function () {
    return {
      messageSuccess: '',
      messageError: '',

      advertisementAdd: {
        userId: 0,
        header: '',
        body: '',
        typeId: 0,
        cityId: 0,
        status: '',
        picture: null
      },
      advertisementId: 0,
      userId: Number(sessionStorage.getItem('userId'))
    }
  },
  methods: {
    router() {
      return router
    },
    addAdvertisement: function () {
      this.resetMessages()
      this.callAdvertisementAddEmits()
      this.advertisementAdd.userId = this.userId
      if (this.allRequiredFieldsFilled()) {
        this.postAdvertisement()
      } else {
        this.messageError = 'Veendu, et kõik väljad oleksid täidetud!'
      }
    },

    postAdvertisement: function () {
      this.$http.post("/my-advertisements", this.advertisementAdd
      ).then(response => {
        console.log(this.advertisementAdd)
        this.messageSuccess = 'Uus kuulutus lisatud!'
        this.timeoutAndGoBack(1000)
      }).catch(error => {
        console.log(error)
      })
    },

    editAdvertisement: function () {
      this.resetMessages()
      this.callAdvertisementAddEmits()
      this.advertisementAdd.userId = this.userId
      if (this.allRequiredFieldsFilled()) {
        this.putAdvertisement();
      } else {
        this.messageError = 'Veendu, et kõik väljad oleksid täidetud!'
      }
    },

    putAdvertisement: function () {
      this.$http.put("/my-advertisements", this.advertisementAdd, {
            params: {
              advertisementId: this.advertisementId,
            }
          }
      ).then(response => {
        this.messageSuccess = 'Kuulutus muudetud!'
        this.timeoutAndGoBack(1000)
      }).catch(error => {
        console.log(error)
        alert("Nii küll ei saa rallit sõita " + this.advertisementId)
      })
    },

    deleteAdvertisement: function () {
      this.$http.delete("/my-advertisements", {
            params: {
              advertisementId: this.advertisementId,
            }
          }
      ).then(response => {
        this.messageSuccess = 'Kuulutus kustutatud!'
        this.timeoutAndGoBack(1000)
      }).catch(error => {
        console.log(error)
      })
    },

    timeoutAndGoBack: function (timeOut) {
      setTimeout(() => {
        this.$router.go(-1)
      }, timeOut)
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

    allRequiredFieldsFilled: function () {
      return this.advertisementAdd.body !== '' &&
          this.advertisementAdd.header !== '' &&
          this.advertisementAdd.cityId > 0 &&
          this.advertisementAdd.typeId > 0
    },

    resetMessages: function () {
      this.messageError = '';
      this.messageSuccess = ''
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

    setAdvertisementAddStatus(status) {
      this.advertisementAdd.status = status
      this.$refs.activeBox.setActiveStatus(status)
    },
  }
}
</script>