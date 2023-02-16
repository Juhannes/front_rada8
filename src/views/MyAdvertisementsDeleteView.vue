<template>
  <div>
    <AlertSuccess :message-success="messageSuccess"/>
        <div class="row" style="padding: 20px">
      <MyAdvertisementSelection ref="myAdvertisementSelection" @emitSelectedTypeIdEvent="setRequestedTypeId"/>
      <!--      <button type="button" class="btn btn-outline-secondary col-3">Lisa uus kuulutus</button>-->
    </div>
    <div class="row" style="padding: 20px">
      <div class="col-8">
        <MyAdvertisementsTable style="pointer-events: none" disabled ref="myAdvertisementsTable"/>
      </div>
      <div class="col-4">
        <div>
          <div class="p-3 border bg-light">
            <div class="row justify-content-center">
              Oled kindel, et soovid kuulutuse kustutada?
            </div>

            <button v-on:click="deleteAdvertisement" type="button" class="btn btn-secondary btn-sm mystyle">Jah</button>
            <button v-on:click="returnToMyAds" type="button" class="btn btn-secondary btn-sm mystyle">Ei</button>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import MyAdvertisementsTable from "@/components/advertisements/MyAdvertisementsTable.vue";
import MyAdvertisementSelection from "@/components/advertisements/MyAdvertisementSelection.vue";
import EditAddAdvertisement from "@/components/advertisements/EditAddAdvertisement.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "MyAdvertisementsDeleteView",
  components: {AlertSuccess, EditAddAdvertisement, MyAdvertisementSelection, MyAdvertisementsTable},
  data: function () {
    return {
      advertisementId: this.$route.params.advertisementId,
      messageSuccess: ''
    }
  },
  methods: {

    setRequestedTypeId(typeId) {
      this.$refs.myAdvertisementsTable.setRequestedTypeId(typeId)
    },

    deleteAdvertisement: function () {
      this.$http.delete("/my-advertisements", {
            params: {
              advertisementId: this.advertisementId,
            }
          }
      ).then(response => {
        this.messageSuccess = 'Kuulutus kustutatud!'
        this.timeoutAndGoBack(2000)
      }).catch(error => {
        console.log(error)
      })
    },

    returnToMyAds: function () {
      this.$router.push({name: 'myAdvertisementsRoute'})
    },

    timeoutAndGoBack: function (timeOut) {
      setTimeout(() => {
        this.$router.go(-1)
      }, timeOut)
    },

  },
  beforeMount() {
    console.log(this.advertisementId)
  }
}
</script>

