<template>
  <div v-if="Object.keys(message).length !== 0 && viewMessage" class="p-3 border bg-light">
    <div>
      <div class="input-group" style=" justify-content: space-between;">
        <div class="input-group mb-3" style="width: 70%;">
          <span class="input-group-text" id="basic-addon1" >Saatja</span>
          <input v-model:value="message.sender.userName" type="text" disabled readonly class="form-control" style="background-color: white; border-bottom-right-radius: 0.375rem; border-top-right-radius: 0.375rem">
          <p class="dateTime" style="margin-left: 15px">{{message.dateTime}}</p>
        </div>
        <div class="input-group" style="width: fit-content;">

          <font-awesome-icon icon="fa-solid fa-xmark" class="fa-2x" v-on:click="toggleMessage" style="margin-left: 30px; cursor: pointer" />
        </div>
      </div>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Pealkiri</span>
      <input v-model:value="message.subject" type="text" disabled readonly class="form-control" style="background-color: white">
    </div>
    <div class="form-floating">
      <textarea v-model:content="message.body" class="form-control" disabled readonly placeholder="Leave a comment here" id="floatingTextarea2" style="height: 300px; background-color: white"></textarea>
      <label for="floatingTextarea2">Sõnum</label>
    </div>
    <div v-if="message.status == 'A'" style="display: flex; margin-top: 10px; width: 100%;">
      <button type="button" class="btn btn-outline-primary" style="margin: 10px; margin-left: 0px">Vasta</button>

      <button v-on:click="deleteMessage(); refreshTable(); toggleMessage()" type="button" class="btn btn-outline-danger" style="margin: 10px">Kustuta</button>
      <button v-on:click="toggleMessage" type="button" class="btn btn-outline-secondary" style="margin: 10px">Sulge</button>
    </div>
    <div v-else-if="message.status == 'T'">
      <button v-on:click="restoreMessage(); refreshTable();" type="button" class="btn btn-outline-secondary" style="margin: 10px">Taasta</button>
    </div>

  </div>
</template>
<script>
export default {
  name: 'MessageWindow',
  props: {
    message: {},
    viewMessage: false
  },
  methods: {
    toggleMessage: function () {

      this.$emit('emitToggleMessageEvent', this.viewMessage)

    },
    deleteMessage: function () {
      this.$emit('emitDeleteMessageEvent', this.message.messageId)
    },
    restoreMessage: function () {
      this.$emit('emitRestoreMessageEvent', this.message)
    },
    refreshTable: function () {
      this.$emit('emitRefreshTableEvent')
    },

  }
}
</script>
<style>
.dateTime {
  font-style: italic;
  color: #7d7d7d;
  text-align: center;
}
</style>