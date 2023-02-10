<template>
  <div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementSelection/>

    </div>

    <div class="row" style="padding: 20px">

      <MyAdvertisementsTable/>

      <div class="col-4">
        <div>
          <div class="p-3 border bg-light">
            <div class="row">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Pealkiri: </span>
                <input type="text" class="form-control">
              </div>
            </div>
            <div class="row">
              <select class="form-select" aria-label="Default select example">
                <option selected>Asukoht</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div class="row">
              <select class="form-select" aria-label="Default select example">
                <option selected>Kategooria</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
import MyAdvertisementsTable from "@/views/MyAdvertisementsTable.vue";
import MyAdvertisementSelection from "@/views/MyAdvertisementSelection.vue";

export default {
  name: "MyAdvertisementsView",
  components: {MyAdvertisementSelection, MyAdvertisementsTable}
}
</script>

