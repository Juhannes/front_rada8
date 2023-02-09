<template>
  <select class="form-select" aria-label="Default select example">
    <option selected disabled>Kategooria</option>
    <option v-for="advertisementTypes in advertisementTypes" :value="advertisementTypes.advertisementTypeId">{{advertisementTypes.advertisementTypeName}}</option>
  </select>
</template>
<script>
export default {
  name: 'TypeDropdown',
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
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })

    },
  },
  beforeMount() {
    this.getAdvertisementTypes()
  }
}
</script>