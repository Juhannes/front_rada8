<template>
  <select v-model="selectedCityId" v-on:change="emitSelectedCityId" class="form-select" aria-label="Default select example">
    <option value="0" disabled>Asukoht</option>
    <option v-for="cities in cities" :value="cities.id">{{ cities.name }}</option>
  </select>
</template>
<script>
export default {
  name: 'CitiesDropdown',
  data: function () {
    return {
      cities: [
        {
          id: 0,
          name: ''
        }
      ],
      selectedCityId: 0
    }
  },
  methods: {
    getAllCities: function () {
      this.$http.get("/cities")
          .then(response => {
            this.cities = response.data;
          })
          .catch(error => {
            console.log(error)
          })
    },
    setSelectedCityId: function (cityId) {
      this.selectedCityId = cityId
    },
    emitSelectedCityId: function () {
      this.$emit('emitSelectedCityIdEvent', this.selectedCityId)
    },
  },
  beforeMount() {
    this.getAllCities()
  }
}
</script>