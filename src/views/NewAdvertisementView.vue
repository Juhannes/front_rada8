<template>
  <div class="row justify-content-center">

    <div class="col-10">
      <EditAddAdvertisement :is-add="this.isAdd" ref="editAddAdvertisement"/>
    </div>

  </div>
  </template>

<script>
import EditAddAdvertisement from "@/components/advertisements/EditAddAdvertisement.vue";

export default {
  name: "NewAdvertisementView",
  components: {EditAddAdvertisement},
  data: function () {
    return {
      isAdd: Boolean(this.$route.query.isAdd)
    }
  },
}
</script>

<style scoped>

</style>