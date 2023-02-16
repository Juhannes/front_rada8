<template>
  <div>

    <div class="row">
      <div class="col-3">
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
import AdvertisementsPiano from "@/components/advertisements/Piano/AdvertisementsPiano.vue";

export default {
  name: "AdvertisementsView",
  components: {AdvertisementsPiano, CitiesDropdown, TypeDropdown},
  mounted() {
    this.callMethodsInPiano()

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

    callMethodsInPiano: function () {

      this.$refs.advertisementsPiano.isUserLoggedIn()
      this.$refs.advertisementsPiano.isUserAdmin()

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
