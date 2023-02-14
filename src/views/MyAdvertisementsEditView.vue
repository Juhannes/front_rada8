<template>
  <div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementSelection ref="myAdvertisementSelection" @emitSelectedTypeIdEvent="setRequestedTypeId"/>

<!--      <button type="button" class="btn btn-outline-secondary col-3">Lisa uus kuulutus</button>-->
    </div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementsTable style="pointer-events: none" disabled ref="myAdvertisementsTable"/>

      <div class="col-4">
        <EditAddAdvertisement ref="editAddAdvertisement"/>
      </div>

    </div>

  </div>
</template>

<script>
import MyAdvertisementsTable from "@/components/advertisements/MyAdvertisementsTable.vue";
import MyAdvertisementSelection from "@/components/advertisements/MyAdvertisementSelection.vue";
import EditAddAdvertisement from "@/components/advertisements/EditAddAdvertisement.vue";

export default {
  name: "MyAdvertisementsEditView",
  components: {EditAddAdvertisement, MyAdvertisementSelection, MyAdvertisementsTable},
  data: function () {
    return {
      advertisementRequest: {
        id: 0,
        userId: 0,
        header: "",
        body: "",
        typeId: 0,
        cityId: 0,
        createdTimestamp: null,
        editedTimestamp: null,
        status: "",
        picture: null
      },
      isEdit: false,
      advertisementId: this.$route.query.advertisementId
    }
  },
  methods: {

    getMyAdvertisement: function () {
      this.$http.get("/my-advertisement", {
            params: {
              advertisementId: this.advertisementId,
            }
          }
      ).then(response => {
        this.advertisementRequest = response.data
        this.$refs.editAddAdvertisement.$refs.typeDropdown.setSelectedTypeId(this.advertisementRequest.typeId)
        this.$refs.editAddAdvertisement.$refs.citiesDropdown.setSelectedCityId(this.advertisementRequest.cityId)
        this.$refs.editAddAdvertisement.$refs.advertisementBody.setAdvertisementBody(this.advertisementRequest.body)
        this.$refs.editAddAdvertisement.$refs.advertisementHeading.setAdvertisementHeading(this.advertisementRequest.header)
        this.$refs.editAddAdvertisement.$refs.activeBox.setActiveStatus(this.advertisementRequest.status)

      }).catch(error => {
        console.log(error)
      })
    },

    setRequestedTypeId(typeId) {
      this.$refs.myAdvertisementsTable.setRequestedTypeId(typeId)
      console.log(typeId)
    }
  },
  beforeMount() {
    this.getMyAdvertisement()
    console.log(this.advertisementId)
  }
}
</script>

