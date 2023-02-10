<template>
  <table class="table-hover col-8">
    <tbody>

    <tr v-for="myAdvertisements in myAdvertisements" :key="myAdvertisements.advertisementId" >
      <th scope="row">{{ myAdvertisements.header }}</th>
      <td>
        <div class="form-check col-2" style="padding: 10px">
          <input v-if="myAdvertisements.status === 'A'" checked class="form-check-input" type="checkbox">
          <input v-else class="form-check-input" type="checkbox">
          <label class="form-check-label">
            Aktiivne
          </label>
        </div>



      </td>
      <td>
        <div class="col-1" style="padding: 10px">
          <font-awesome-icon icon="fa-regular fa-pen-to-square" class="mx-2 icon-hover"/>
        </div>
      </td>
      <td>
        <div class="col-1" style="padding: 10px">
          <font-awesome-icon icon="fa-solid fa-trash-can" class="mx-2 icon-hover"/>
        </div>
      </td>
    </tr>

    </tbody>
  </table>
</template>
<script>
export default {
  name: 'MyAdvertisementsTable',
  data: function () {
    return {
      myAdvertisements: [
        {
          advertisementId: 0,
          userId: 0,
          header: '',
          body: '',
          typeId: 0,
          cityId: 0,
          createdTimestamp: null,
          editedTimestamp: null,
          status: '',
          picture: null
        }
      ]
    }
  },
  methods: {

    getMyAdvertisements: function (userId, typeId) {
      this.$http.get("/my-advertisements", {
            params: {
              userId: userId,
              typeId: typeId
            }
          }
      ).then(response => {
        console.log(response.data)
        this.myAdvertisements = response.data
      }).catch(error => {
        console.log(error)
      })
    },

    checked: function () {
      this.myAdvertisements.status = ((this.myAdvertisements.status == 'A') ? 'I' : 'A')
    }

  },
  beforeMount() {
    this.getMyAdvertisements(2,1)
  }
}
</script>
