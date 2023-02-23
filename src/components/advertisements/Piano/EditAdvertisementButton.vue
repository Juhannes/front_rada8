<template>
  <button v-on:click="this.pushToMyAdvertisementEdit" type="button" class="btn btn-secondary btn-sm mystyle">
    <font-awesome-icon icon="fa-regular fa-pen-to-square" class="mx-2 icon-hover"/>
    Muuda kuulutust
  </button>
</template>
<script>
export default {
  name: 'EditAdvertisementButton',
    props: {
    advertisement: {}
  },
  methods: {
    pushToMyAdvertisementEdit: function () {


      this.$router.push({name: "myAdvertisementsRoute"})
    }
  }
}
</script>