<template>
  <div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementSelection ref="myAdvertisementSelection" @emitSelectedTypeIdEvent="setRequestedTypeId"/>

<!--      <button type="button" class="btn btn-outline-secondary col-3">Lisa uus kuulutus</button>-->
    </div>

    <div class="row" style="padding: 20px">
      <div class="col-8">
        <MyAdvertisementsTable style="pointer-events: none" disabled ref="myAdvertisementsTable"/>
      </div>
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
      isEdit: Boolean(this.$route.query.isEdit),
      advertisementId: this.$route.params.advertisementId,
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
      }
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
        this.$refs.editAddAdvertisement.setAdvertisementAddType(this.advertisementRequest.typeId)
        this.$refs.editAddAdvertisement.setAdvertisementAddCityId(this.advertisementRequest.cityId)
        this.$refs.editAddAdvertisement.setAdvertisementAddBody(this.advertisementRequest.body)
        this.$refs.editAddAdvertisement.setAdvertisementAddHeading(this.advertisementRequest.header)
        this.$refs.editAddAdvertisement.setAdvertisementAddStatus(this.advertisementRequest.status)
        this.$refs.editAddAdvertisement.setAdvertisementAddId(this.advertisementId)
        this.$refs.editAddAdvertisement.setAdvertisementAddPicture(this.advertisementRequest.picture)
        this.setRequestedTypeId(this.advertisementRequest.typeId)
        this.$refs.myAdvertisementSelection.setSelectedTypeId(this.advertisementRequest.typeId)


      }).catch(error => {
        console.log(error)
      })
    },

    setRequestedTypeId(typeId) {
      this.$refs.myAdvertisementsTable.setRequestedTypeId(typeId)
    }
  },
  beforeMount() {
    this.getMyAdvertisement()
  }
}
</script>

