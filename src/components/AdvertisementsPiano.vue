<template>
  <div class="col-8" style="border: thin solid black">
    <div v-for="advertisement in advertisements" class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne">
            <div class="row">
              <div class="col-7" style="border: thin solid black">
                {{ advertisement.header }}
              </div>
              <div class="col" style="border: thin solid black">
                Kuulutus lisatud: {{advertisement.createdTimestamp}}
              </div>
            </div>
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
             data-bs-parent="#accordionExample">
          <div class="accordion-body col">
            <div class="bi-justify-left row" style="border: thin solid black">
              Asukoht: {{advertisement.cityId}}
            </div>
            <br>
            <div class="row" style="border: thin solid black">
              {{ advertisement.body }}
            </div>
            <br>
            <div class="row" style="border: thin solid black">
              <div class="col" style="border: thin solid black">
                Sõnumi saatmiseks logi sisse
              </div>
              <div class="col" style="border: thin solid black">
                Viimati muudetud: {{advertisement.modifiedTimestamp}}
              </div>
            </div>

          </div>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
export default {
  name: 'AdvertisementsPiano',
  props: {
    advertisements: {}
  }
}
</script>