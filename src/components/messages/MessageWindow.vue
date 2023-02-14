<template>
  <div v-if="Object.keys(message).length !== 0 && viewMessage" class="p-3 border bg-light">
    <ReceivedMessage @emitSendMessageEvent="sendReply" :message="message" ref="message"/>
    <MessageWindowButtons @emitReplyToMessageViewEvent="replyToMessage" :message="message"/>

  </div>
</template>
<script>
import ReceivedMessage from "@/components/messages/Message.vue";
import MessageWindowButtons from "@/components/messages/MessageWindowButtons.vue";

export default {
  name: 'MessageWindow',
  components: {MessageWindowButtons, ReceivedMessage},
  props: {
    message: {},
    viewMessage: false
  },
  data: function () {
    return {
      replyMessage: {
        senderId: sessionStorage.getItem('userId'),
        receiverId: 0,
        conversationId: 0,
        replyBody: '',
      }
    }
  },
  methods: {
    toggleMessage: function () {
      this.$emit('emitToggleMessageEvent', this.viewMessage)
    },
    replyToMessage: function () {
      this.$refs.message.respondToMessage()
    },
    getReplyData: function () {
      this.$refs.message.sendMessage()
    },
    sendReply: function (replyMessage) {
      this.replyMessage = replyMessage
      this.$emit('emitSendReplyEvent', this.replyMessage)
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

  }
}
</script>
