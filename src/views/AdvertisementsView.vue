<template>
  <div>
    <div class="row">
      <div class="col-3">
        <div>
          Asukoht:
        </div>
        <CitiesDropdown :is-search="isSearch" :advertisements="advertisements"/>
        <br>
        <br>
        <br>
        <div>
          Otsin:
        </div>
        <TypeDropdown :is-search="isSearch"/>
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
          cityName: '',
          createdTimestamp: null,
          modifiedTimestamp: null,
          status: '',
          picture: null
        }
      ],
      isNewMessage: false,
      isSearch: true,
      outGoingMessage:
          {
            messageId: 0,
            conversationId: 0,
            subject: '',
            sender: {
              userId: 0,
              userName: '',
              email: ''
            },
            body: '',
            dateTime: '',
            status: '',
            advertisementId: 0
          }
    }
  },


  methods: {
    callMethodsInPiano: function () {

      this.$refs.advertisementsPiano.isUserLoggedIn()
      this.$refs.advertisementsPiano.isUserAdmin()
      this.$refs.advertisementsPiano.isUserAdvertiser()

    },
    getAllAdvertisements: function () {
      this.$http.get("/advertisements")
          .then(response => {
            this.advertisements = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }
    ,
    getAdvertisementOwner: function (userId) {
      this.$http.get("/user", {
            params: {
              userId: userId,
            }
          }
      ).then(response => {
        this.outGoingMessage.sender = response.data;
      }).catch(error => {
        console.log(error)
      })
    }
    ,
    openMessageWindow: function (advertisementId) {
      this.isNewMessage = true
      let advertisement = this.advertisements.find(advertisement => advertisement.id === advertisementId)
      this.outGoingMessage.subject = advertisement.header;
      this.getAdvertisementOwner(advertisement.userId);
      this.outGoingMessage.advertisementId = advertisementId;
    }
    ,
  }
  ,
  beforeMount() {
    this.getAllAdvertisements()
  }
}


</script>
