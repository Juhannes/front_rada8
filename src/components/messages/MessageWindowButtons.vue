<template>
  <div>
    <div v-if="!isNewMessage && !isSend">
      <div v-if="message.status === 'A'" style="display: flex; margin-top: 10px; width: 100%;">
        <button v-on:click="toggleEditable()" type="button" class="btn btn-outline-primary"
                style="margin: 10px; margin-left: 0">Vasta
        </button>

        <button v-on:click="deleteMessage(); refreshTable(); toggleMessage()" type="button"
                class="btn btn-outline-danger"
                style="margin: 10px">Kustuta
        </button>
        <button v-on:click="toggleMessage" type="button" class="btn btn-outline-secondary" style="margin: 10px">Sulge
        </button>
      </div>
      <div v-else-if="message.status === 'T'">
        <button v-on:click="restoreMessage(); refreshTable();" type="button" class="btn btn-outline-secondary"
                style="margin: 10px">Taasta
        </button>
      </div>
    </div>
    <div v-else-if="isNewMessage || isSend">
      <div v-if="isNewMessage">
        <button v-on:click="sendNewMesage(); toggleMessage()" type="button" class="btn btn-success"
                style="margin: 10px; margin-left: 0">Saada
        </button>
        <button v-on:click="toggleMessage()" type="button" class="btn btn-secondary" style="margin: 10px">Tühista
        </button>
      </div>
      <div v-else>
        <button v-on:click="sendReply(); toggleMessage()" type="button" class="btn btn-success"
                style="margin: 10px; margin-left: 0">Saada
        </button>
        <button v-on:click="toggleEditable()" type="button" class="btn btn-secondary" style="margin: 10px">Tühista
        </button>
      </div>


    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageWindowButtons',
  props: {
    message: {},
    isNewMessage: Boolean,
    isSend: Boolean
  },
  data: function () {
    return {}
  },
  methods: {
    toggleEditable: function () {
      this.$emit('emitToggleEditableWindowEvent');
    },
    sendReply: function () {
      this.$parent.getReplyData();
    },
    sendNewMesage: function () {
      this.$parent.getNewMessageData();
    },
    deleteMessage: function () {
      this.$parent.deleteMessage();
    },
    refreshTable: function () {
      this.$parent.refreshTable();
    },
    toggleMessage: function () {
      this.$parent.toggleMessage();
    },
    restoreMessage: function () {
      this.$parent.restoreMessage();
    },
  },
  mounted() {
  }
}
</script>
