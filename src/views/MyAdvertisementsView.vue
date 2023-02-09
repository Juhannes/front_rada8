<template>
  <div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementSelection ref="myAdvertisementSelection" @emitSelectedTypeIdEvent="setRequestedTypeId" />

      <button type="button" class="btn btn-outline-secondary col-3">Lisa uus kuulutus</button>
    </div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementsTable ref="myAdvertisementsTable"/>

      <div class="col-4">
        <EditAddAdvertisement/>
      </div>

    </div>

  </div>
</template>

<script>
import MyAdvertisementsTable from "@/views/MyAdvertisementsTable.vue";
import MyAdvertisementSelection from "@/views/MyAdvertisementSelection.vue";
import EditAddAdvertisement from "@/views/EditAddAdvertisement.vue";

export default {
  name: "MyAdvertisementsView",
  components: {EditAddAdvertisement, MyAdvertisementSelection, MyAdvertisementsTable},
  data: function () {
    return {
      advertisementRequest: {
        advertisementId: 0,
        userId: 0,
        header: '',
        body: '',
        typeId: 0,
        cityId: 0,
        createdTimestamp: null,
        editedTimestamp: null,
        status: '',
        picture: null
      }
    }
  },
  methods: {
    setRequestedTypeId(typeId) {
      this.$refs.myAdvertisementsTable.setRequestedTypeId(typeId)
      console.log(typeId)
    }
  }
}
</script>

