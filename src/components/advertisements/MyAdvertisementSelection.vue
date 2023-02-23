<template>
  <div class="col">

    <div v-on:change="emitSelectedTypeId" class="col-12 btn-group" role="group" aria-label="Basic radio toggle button group">
      <input v-on:click="setSelectedTypeId(1)" checked type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio1">Bänd</label>

      <input v-on:click="setSelectedTypeId(2)" type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio2">Bändikaaslased</label>

      <input v-on:click="setSelectedTypeId(3)" type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
      <label class="btn btn-outline-secondary" for="btnradio3">Varustus</label>
    </div>

  </div>
</template>
<script>
export default {
  name: 'MyAdvertisementSelection',
  data: function () {
    return {
      selectedTypeId: 0
    }
  },
  methods: {
    setSelectedTypeId: function (typeId) {
      this.selectedTypeId = typeId;
    },
    emitSelectedTypeId: function () {
      this.$emit('emitSelectedTypeIdEvent', this.selectedTypeId)
    }
  },
}
</script>