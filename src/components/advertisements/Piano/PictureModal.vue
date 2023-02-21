<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>
      <img class="img-fluid" :src="this.picture">
    </div>
    <div class="modal-footer" @click="$emit('close-modal')">
      <button type="button" class="btn btn-secondary">Sule</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PictureModal",
  props: {
    advertisement: {},


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
}

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {

  position: relative;
  display: flex;
  flex-direction: column;
  width: 40%;
  color: var(--bs-modal-color);
  pointer-events: auto;
  background-color: var(--bs-modal-bg);
  background-clip: padding-box;
  border: var(--bs-modal-border-width) solid var(--bs-modal-border-color);
  border-radius: var(--bs-modal-border-radius);
  outline: 0;

}

.close {
  margin: 10% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.image {
  width: 300px;
}


</style>