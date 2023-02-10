<template>
  <div class="row">

    <div class="col-8 btn-group">
      <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
      <label class="btn btn-outline-secondary" for="btnradio1">Bänd</label>
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
  }
}
</script>