<template>
  <div>
    <div>
      <div class="input-group" style=" justify-content: space-between;">
        <div class="input-group mb-3" style="width: 70%;">
          <span v-if="!isRespond" class="input-group-text" id="basic-addon1">Saatja</span>
          <span v-else class="input-group-text" id="basic-addon1">Saaja</span>
          <input v-model:value="message.sender.userName" type="text" disabled readonly class="form-control"
                 style="background-color: white; border-bottom-right-radius: 0.375rem; border-top-right-radius: 0.375rem;">
          <p v-if="!isRespond" class="dateTime" style="margin-left: 15px">{{ message.dateTime }}</p>
          <p v-else class="dateTime" style="margin-left: 15px; visibility: hidden">{{ message.dateTime }}</p>
        </div>
        <div class="input-group" style="width: fit-content;">

          <font-awesome-icon icon="fa-solid fa-xmark" class="fa-2x" v-on:click="toggleMessage"
                             style="margin-left: 30px; cursor: pointer"/>
        </div>
      </div>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Pealkiri</span>
      <input v-model:value="message.subject" type="text" disabled readonly class="form-control"
             style="background-color: white">
    </div>
    <div v-if="!isRespond" class="form-floating">
    <textarea v-model:content="message.body" class="form-control" disabled readonly placeholder="Leave a message"
              id="floatingTextarea2" style="height: 300px; background-color: white"></textarea>
      <label for="floatingTextarea2">Sõnum</label>
    </div>
    <div v-else class="form-floating">
    <textarea v-model="replyMessage.replyBody" class="form-control"  placeholder="Reply message"
              id="floatingTextarea2" style="height: 300px; background-color: white"></textarea>
      <label for="floatingTextarea2">Sõnum</label>
    </div>
  </div>

</template>
<script>
export default {
  name: 'receivedMessage',
  props: {
    message: {},
  },
  data: function () {
    return {
      isRespond: false,
      replyMessage: {
        senderId: sessionStorage.getItem('userId'),
        conversationId: this.message.conversationId,
        receiverId: this.message.sender.userId,
        replyBody: ''
      }
    }
  },
  methods: {
    toggleMessage() {
      this.$parent.toggleMessage();
    },
    respondToMessage: function () {
      this.isRespond = !this.isRespond;
    },
    sendMessage() {
      this.$emit('emitSendMessageEvent', this.replyMessage)
    }
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