<template>
  <div class="row">

    <div v-on:change="emitSelectedTypeId" class="col-8 btn-group" role="group" aria-label="Basic radio toggle button group">
      <input v-on:click="setSelectedTypeId(1)" type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
      <label class="btn btn-outline-secondary" for="btnradio1">Bänd</label>

      <input v-on:click="setSelectedTypeId(2)" type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio2">Bändikaaslased</label>

      <input v-on:click="setSelectedTypeId(3)" type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio3">Varustus</label>
    </div>

    <div class="col-3 justify-content-end">
      <button type="button" class="btn btn-outline-secondary">Lisa uus kuulutus</button>
    </div>

  </div>
</template>
<script>
export default {
  name: 'MyAdvertisementSelection',
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
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })

    },
    setSelectedTypeId: function (typeId) {
      this.selectedTypeId = typeId;
      // console.log(typeId)
    },
    emitSelectedTypeId: function () {
      this.$emit('emitSelectedTypeIdEvent', this.selectedTypeId)
      console.log(this.selectedTypeId)
    }
  },
  beforeMount() {
    this.getAdvertisementTypes()
  }
}
</script>