<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <!--  <div class="modal fade" :id="'exampleModal' + advertisement.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <!--          <h5 class="modal-title" :id="'exampleModalLabel' + advertisement.id">Kuulutusele lisatud pilt</h5>-->
          <h5 class="modal-title" id="exampleModalLabel">Kuulutusele lisatud pilt</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img :src="picture" class="img-fluid">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sule</button>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShowPictureModal',
  props: {
    advertisement: {},
    advertisementId: Number

  },
  data: function () {
    return {
      picture: null
    }
  },
  methods: {
    setPicture: function (picture) {
      this.picture = picture
    }
  },
  watch: {
    picture: function () {
      alert("sadasd")
    }
  }
}
</script>