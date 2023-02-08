<template>
  <div>

    <div class="row" style="padding: 20px">

        <div class="col-8 btn-group" role="group" aria-label="Basic radio toggle button group">
          <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
          <label class="btn btn-outline-secondary" for="btnradio1">Bänd</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
          <label class="btn btn-outline-secondary" for="btnradio2">Bändikaaslane</label>

          <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
          <label class="btn btn-outline-secondary" for="btnradio3">Varustus</label>
        </div>
        <div class="col-3 justify-content-end">
          <button type="button" class="btn btn-outline-secondary">Lisa uus kuulutus</button>
        </div>

    </div>

    <div class="row" style="padding: 20px">

      <div class="accordion accordion-flush col-8" style="background-color: aliceblue" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Esimene kuulutus HEADING
            </button>
          </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="row justify-content-end">
              <div class="accordion-body col-4">Kuulutuse sisu BODY</div>
              <div class="form-check col-2" style="padding: 10px">
                <input class="form-check-input" type="checkbox" value="">
                <label class="form-check-label" for="flexCheckDefault">
                  Aktiivne
                </label>
              </div>
              <div class="col-1" style="padding: 10px">
                <font-awesome-icon icon="fa-regular fa-pen-to-square" class="mx-2 icon-hover"/>
              </div>
              <div class="col-1" style="padding: 10px">
                <font-awesome-icon icon="fa-solid fa-trash-can" class="mx-2 icon-hover"/>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Teine kuulutus HEADING
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
            <div class="row justify-content-end">
              <div class="accordion-body col-4">Kuulutuse sisu BODY</div>
              <div class="form-check col-2" style="padding: 10px">
                <input class="form-check-input" type="checkbox" value="">
                <label class="form-check-label" for="flexCheckDefault">
                  Aktiivne
                </label>
              </div>
              <div class="col-1" style="padding: 10px">
                <font-awesome-icon icon="fa-regular fa-pen-to-square" class="mx-2 icon-hover"/>
              </div>
              <div class="col-1" style="padding: 10px">
                <font-awesome-icon icon="fa-solid fa-trash-can" class="mx-2 icon-hover"/>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Kolmas kuulutus HEADING
            </button>
          </h2>
          <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
            <div class="row justify-content-end">
              <div class="accordion-body col-4">Kuulutuse sisu BODY</div>
              <div class="form-check col-2" style="padding: 10px">
                <input class="form-check-input" type="checkbox" value="">
                <label class="form-check-label" for="flexCheckDefault">
                  Aktiivne
                </label>
              </div>
              <div class="col-1" style="padding: 10px">
                <font-awesome-icon icon="fa-regular fa-pen-to-square" class="mx-2 icon-hover"/>
              </div>
              <div class="col-1" style="padding: 10px">
                <font-awesome-icon icon="fa-solid fa-trash-can" class="mx-2 icon-hover"/>
              </div>
            </div>
          </div>
        </div>
      </div>
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
export default {
  name: "MyAdvertisementsView"
}
</script>

<style scoped>

</style>