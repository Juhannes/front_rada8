<template>
  <div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementSelection ref="myAdvertisementSelection" @emitSelectedTypeIdEvent="setRequestedTypeId"/>

<!--      <button type="button" class="btn btn-outline-secondary col-3">Lisa uus kuulutus</button>-->
    </div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementsTable style="pointer-events: none" disabled ref="myAdvertisementsTable"/>

      <div class="col-4">
        <div>
          <div class="p-3 border bg-light">
            <div class="row justify-content-center">
              Oled kindel, et soovid kuulutuse kustutada?
            </div>

            <button v-on:click="deleteAdvertisement" type="button" class="btn btn-secondary btn-sm">Jah</button>
            <button v-on:click="returnToMyAds" type="button" class="btn btn-secondary btn-sm">Ei</button>

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

export default {
  name: "MyAdvertisementsDeleteView",
  components: {EditAddAdvertisement, MyAdvertisementSelection, MyAdvertisementsTable},
  data: function () {
    return {
      advertisementId: this.$route.params.advertisementId,
    }
  },
  methods: {

    setRequestedTypeId(typeId) {
      this.$refs.myAdvertisementsTable.setRequestedTypeId(typeId)
      console.log(typeId)
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

  },
  beforeMount() {
    console.log(this.advertisementId)
  }
}
</script>

