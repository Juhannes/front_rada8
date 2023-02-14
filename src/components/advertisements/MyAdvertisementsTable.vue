<template>
  <table class="table-hover col-8">
    <tbody>

    <tr v-if="myAdvertisements.status !== 'D'" v-for="myAdvertisements in myAdvertisements" :key="myAdvertisements.id" >
      <th scope="row">{{ myAdvertisements.header}}</th>
      <td>
        <div class="form-check col-2" style="padding: 10px">
          <input v-if="myAdvertisements.status === 'A'" disabled checked class="form-check-input" type="checkbox">
          <input v-else class="form-check-input" disabled type="checkbox">
          <label class="form-check-label">
            Aktiivne {{ myAdvertisements.id}}
          </label>
        </div>
      </td>
      <td>
        <div v-on:click="emitIsEdit(myAdvertisements.id)" class="col-1" style="padding: 10px">
          <font-awesome-icon icon="fa-regular fa-pen-to-square" class="mx-2 icon-hover"/>
        </div>
      </td>
      <td>
        <div v-on:click="deleteAdvertisement(myAdvertisements.id)" class="col-1" style="padding: 10px">
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
      ],
      isEdit: false
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

    setRequestedTypeId(typeId) {
      this.myAdvertisements.typeId = typeId
      this.getMyAdvertisements(2, typeId)
      console.log(2, typeId)
    },
    emitIsEdit(advertisementId) {
      this.$emit('emitIsEditEvent', advertisementId)
      this.$router.push({name: 'myAdvertisementsEditRoute', params: {advertisementId: advertisementId}})
    },
    deleteAdvertisement(advertisementId) {
      this.$router.push({name: 'myAdvertisementsDeleteRoute', params: {advertisementId: advertisementId}})
    },

  },
  beforeMount() {
    this.getMyAdvertisements(2,1)
  }
}
</script>
