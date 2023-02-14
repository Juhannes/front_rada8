<template>
  <div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementSelection ref="myAdvertisementSelection" @emitSelectedTypeIdEvent="setRequestedTypeId"/>

<!--      <button type="button" class="btn btn-outline-secondary col-3">Lisa uus kuulutus</button>-->
    </div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementsTable ref="myAdvertisementsTable" @emitIsEditEvent="setIsEdit"/>

      <div v-if="isEdit" class="col-4">
        <EditAddAdvertisement/>
      </div>

    </div>

  </div>
</template>

<script>
import MyAdvertisementsTable from "@/components/advertisements/MyAdvertisementsTable.vue";
import MyAdvertisementSelection from "@/components/advertisements/MyAdvertisementSelection.vue";
import EditAddAdvertisement from "@/components/advertisements/EditAddAdvertisement.vue";

export default {
  name: "MyAdvertisementsView",
  components: {EditAddAdvertisement, MyAdvertisementSelection, MyAdvertisementsTable},
  data: function () {
    return {
      isEdit: false
    }
  },
  methods: {
    setRequestedTypeId(typeId) {
      this.$refs.myAdvertisementsTable.setRequestedTypeId(typeId)
      console.log(typeId)
    },
    setIsEdit() {
      this.isEdit = !this.isEdit
    }
  }
}
</script>

