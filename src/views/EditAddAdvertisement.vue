<template>
  <div>
    <div class="p-3 border bg-light">
      <div class="row" style="padding: 5px">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Pealkiri: </span>
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="row" style="padding: 5px">
        <CitiesDropdown/>
      </div>
      <div class="row">
        <TypeDropdown/>
      </div>

      <div class="input-group" style="padding: 5px">
        <span class="input-group-text">Lisainfo:</span>
        <textarea class="form-control" aria-label="With textarea"></textarea>
      </div>

      <div class="form-check">
        <input class="form-check-input" type="checkbox">
        <label class="form-check-label" for="flexCheckDefault">
          Aktiivne
        </label>
      </div>
      <button type="button" class="btn btn-secondary btn-sm">Salvesta</button>
      <button type="button" class="btn btn-secondary btn-sm">Kustuta</button>
      <button type="button" class="btn btn-secondary btn-sm">Tühista</button>

    </div>
  </div>
</template>
<script>
import TypeDropdown from "@/views/TypeDropdown.vue";
import CitiesDropdown from "@/views/CitiesDropdown.vue";

export default {
  name: 'EditAddAdvertisement',
  components: {CitiesDropdown, TypeDropdown}
}
</script>