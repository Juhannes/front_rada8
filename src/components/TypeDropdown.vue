<template>
  <select v-model="selectedTypeId" v-on:change="emitSelectedAdvertisementType" class="form-select" aria-label="Default select example">
    <option v-if="isSearch" value="0">Kõik kategooriad</option>
    <option v-else disabled value="0">Kategooria</option>
    <option v-for="advertisementTypes in advertisementTypes" :value="advertisementTypes.id">{{advertisementTypes.name}}</option>
  </select>
</template>
<script>
export default {
  name: 'TypeDropdown',
  props: {
    isSearch: Boolean
  },
  data: function () {
    return {
      advertisementTypes: [
        {
          advertisementTypeId: 0,
          advertisementTypeName: ''
        }
      ],
      selectedTypeId: 0
    }
  },
  methods: {

    getAdvertisementTypes: function () {
      this.$http.get("/my-advertisements-types")
          .then(response => {
            this.advertisementTypes = response.data
          })
          .catch(error => {
            console.log(error)
          })

    },
    emitSelectedAdvertisementType: function () {
      this.$emit('emitAdvertisementTypeEvent', this.selectedTypeId)
    },
    setSelectedTypeId: function (typeId) {
      this.selectedTypeId = typeId
    },
  },
  beforeMount() {
    this.getAdvertisementTypes()
  }
}
</script>