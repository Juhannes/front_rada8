<template>
  <div>
    <div>
      <AlertWarning v-if="alertMessage !== '' && alertType === 'Warning'" :message-warning="alertMessage"/>
      <AlertSuccess v-else-if="alertMessage !== '' && alertType === 'Success'" :message-success="alertMessage"/>
    </div>
    <div v-if="!isNewMessage && viewMessage && isInbox" class="p-3 border bg-light">
      <Message @emitSendReplyMessageEvent="sendReplyMessage" :is-inbox="isInbox" :message="message" :is-send="isSend" ref="message"/>

      <MessageWindowButtons @emitToggleEditableWindowEvent="activateIsSend" :message="message" :is-send="isSend"
                            ref="buttons"/>
    </div>
    <div v-else-if="isNewMessage && viewMessage && !isInbox" class="p-3 border bg-light">
      <Message @emitSendNewMessageEvent="sendNewMessage" :is-inbox="isInbox" :message="message" :is-new-message="isNewMessage"
               :is-send="true"
               ref="message"/>
      <MessageWindowButtons @emitToggleEditableWindowEvent="activateIsSend" :message="message"
                            :is-new-message="isNewMessage" :is-send="true" ref="buttons"/>
    </div>
    <div v-else-if="!isNewMessage && viewMessage && !isInbox" class="p-3 border bg-light">
      <Message @emitSendReplyMessageEvent="sendReplyMessage" :message="message" :is-send="isSend" ref="message"/>
    </div>
  </div>

</template>
<script>
import Message from "@/components/messages/Message.vue";
import MessageWindowButtons from "@/components/messages/MessageWindowButtons.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertWarning from "@/components/alert/AlertWarning.vue";

export default {
  name: 'MessageWindow',
  components: {AlertWarning, AlertSuccess, MessageWindowButtons, Message},
  props: {
    message: {},
    viewMessage: false,
    isNewMessage: false,
    isSend: Boolean,
    isInbox: Boolean,
    newOutgoingMessage: {},
    advertisementId: 0

  },
  data: function () {
    return {
      outGoingMessage: {
        senderId: Number(sessionStorage.getItem('userId')),
        receiverId: 0,
        conversationId: 0,
        messageBody: '',
      },
      alertMessage: '',
      alertType: ''
    }
  },
  methods: {
    sendReplyMessage: function (replyMessage) {
      this.outGoingMessage = replyMessage
      this.$http.post("/message/reply", this.outGoingMessage
      ).then(response => {
        this.alertType = 'Success'
        this.alertMessage = 'Sõnum saadetud!'
        setTimeout(() => {
          this.alertMessage = '';
        }, 2000)
      }).catch(error => {
        console.log(error)
      })
    },
    sendNewMessage: function (newMessage) {
      this.outGoingMessage = newMessage
      this.$http.post("/message/new-message", this.outGoingMessage, {
            params: {
              advertisementId: this.advertisementId,
            }
          }
      ).then(response => {
        this.alertType = 'Success'
        this.alertMessage = 'Sõnum saadetud!'
        setTimeout(() => {
          this.alertMessage = '';
        }, 2000)
      }).catch(error => {
        console.log(error)
      })
    },
    toggleMessage: function () {
      this.$emit('emitToggleMessageEvent', this.viewMessage)
    },
    activateIsSend: function () {
      this.$emit('activateIsSendEvent')
    },
    getReplyData: function () {
      this.$refs.message.sendMessage()
    },
    getNewMessageData: function () {
      this.$refs.message.sendMessage()
    }
    ,
    deleteMessage: function () {
      this.$emit('emitDeleteMessageEvent', this.message.messageId)
    },
    restoreMessage: function () {
      this.$emit('emitRestoreMessageEvent', this.message)
    },
    refreshTable: function () {
      this.$emit('emitRefreshTableEvent')
    },
  },
}
</script>
