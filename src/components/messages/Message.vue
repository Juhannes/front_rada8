<template>
  <div>
    <div>
      <div class="input-group" style=" justify-content: space-between;">
        <div class="input-group mb-3" style="width: 70%;">
          <div v-if="!isSend && isInbox" class="input-group">
            <span  class="input-group-text" id="basic-addon1">Saatja</span>
            <input v-model:value="message.sender.userName" type="text" disabled readonly class="form-control"
                   style="background-color: white; border-bottom-right-radius: 0.375rem; border-top-right-radius: 0.375rem;">
          </div>
          <div v-else-if="!isSend && !isInbox" class="input-group">
            <span  class="input-group-text" id="basic-addon1">Saaja</span>
            <input v-model:value="message.receiver.userName" type="text" disabled readonly class="form-control"
                   style="background-color: white; border-bottom-right-radius: 0.375rem; border-top-right-radius: 0.375rem;">
          </div>
          <div v-else-if="isSend || isNewMessage" class="input-group">
            <span  class="input-group-text" id="basic-addon1">Saaja</span>
            <input v-model:value="message.sender.userName" type="text" disabled readonly class="form-control"
                   style="background-color: white; border-bottom-right-radius: 0.375rem; border-top-right-radius: 0.375rem;">
          </div>
          <p v-if="!isSend" class="dateTime" style="margin-left: 15px">{{ moment.utc(message.dateTime).format('HH:mm DD/MM/YYYY') }}</p>
          <p v-else-if="isSend || isNewMessage" class="dateTime" style="margin-left: 15px; visibility: hidden">
            {{ moment.utc(message.dateTime).format('HH:mm DD/MM/YYYY') }}</p>
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
    <div v-if="!isSend" class="form-floating">

    <textarea v-model:content="message.body" class="form-control" disabled readonly placeholder="Leave a message"
              id="floatingTextarea2" style="height: 300px; background-color: white"></textarea>
      <label for="floatingTextarea2">Sõnum</label>

    </div>
    <div v-else-if="isSend || isNewMessage" class="form-floating">
    <textarea v-model="outGoingMessage.messageBody" class="form-control" placeholder="Reply message"
              id="floatingTextarea2" style="height: 300px; background-color: white"></textarea>
      <label for="floatingTextarea2">Sõnum</label>
    </div>
  </div>

</template>
<script>
import ImageInput from "@/components/ImageInput.vue";
import moment from "moment/moment";

export default {
  name: 'Message',
  computed: {
    moment() {
      return moment
    }
  },
  components: {ImageInput},
  props: {
    message: {},
    isNewMessage: false,
    isSend: Boolean,
    isInbox: Boolean,
  },
  data: function () {
    return {
      outGoingMessage: {
        senderId: Number(sessionStorage.getItem('userId')),
        conversationId: 0,
        receiverId: 0,
        messageBody: ''
      },
    }
  },
  methods: {
    toggleMessage: function () {
      this.$parent.toggleMessage();
    },
    sendMessage: function () {
      this.outGoingMessage.conversationId = this.message.conversationId
      this.outGoingMessage.receiverId = this.message.sender.userId
      if (this.isNewMessage) {
        this.$emit('emitSendNewMessageEvent', this.outGoingMessage)
      } else {
        this.$emit('emitSendReplyMessageEvent', this.outGoingMessage)
      }
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