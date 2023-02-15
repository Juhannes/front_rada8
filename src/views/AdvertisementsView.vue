<template>
  <div>

    <div class="row">
      <div class="col-3" style="border: thin solid black">
        <CitiesDropdown/>
        <br>
        <br>
        <br>
        <div>
          Otsin:
        </div>
        <TypeDropdown/>
      </div>
      <AdvertisementsPiano :advertisements="advertisements" ref="advertisementsPiano"/>
    </div>

  </div>
</template>

<script>
import CitiesDropdown from "@/components/CitiesDropdown.vue";
import TypeDropdown from "@/components/TypeDropdown.vue";
import AdvertisementsPiano from "@/components/AdvertisementsPiano.vue";

export default {
  name: "AdvertisementsView",
  components: {AdvertisementsPiano, CitiesDropdown, TypeDropdown},
  mounted() {
    this.callMethodInPiano()

  },
  data: function () {
    return {


      advertisements: [
        {
          advertisementId: 0,
          userId: 0,
          header: '',
          body: '',
          typeId: 0,
          cityId: 0,
          createdTimestamp: null,
          modifiedTimestamp: null,
          status: '',
          picture: null
        }
      ],
    }
  },

  methods: {

    callMethodInPiano: function () {

      this.$refs.advertisementsPiano.isUserLoggedOut()

    },


    getAllAdvertisements: function () {
      this.$http.get("/advertisements")
          .then(response => {
            this.advertisements = response.data
          })
          .catch(error => {
            console.log(error)
          })

    },

  },

  beforeMount() {

    this.getAllAdvertisements()



  }


}


</script>
