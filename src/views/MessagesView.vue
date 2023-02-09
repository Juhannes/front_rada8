<template>
  <div>
    <div class="row">

      <!--  COLUMN 1  -->
      <div class="col col-7">
        <div class="col text-start" style="margin-left: 2rem">
          Sissetulnud sõnumid / <u>Saadetud sõnumid</u>
        </div>
        <div class="col">
          <MessageTable @emitShowMessageEvent="showMessage" :messages="messages" />
        </div>
      </div>


      <!-- COLUMN 2  -->
      <MessageWindow :message="this.message"/>


    </div>

  </div>
</template>

<script>
import MessageTable from "@/components/messages/MessageTable.vue";
import MessageWindow from "@/components/messages/MessageWindow.vue";

export default {
  name: "MessagesView",
  components: {MessageWindow, MessageTable},
  data: function () {
    return {
      // userId: sessionStorage.getItem('userId')
      userId: 3,
      message: {},

      messages: [
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
          advertisementId: 0
        }
      ]
    }
  },
  methods: {
    getReceivedMessages: function (userId) {
      this.$http.get("/message", {
            params: {
              userId: userId,
            }
          }
      ).then(response => {
        this.messages = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    showMessage: function (messageId) {
      let message = this.messages.find(message => message.messageId == messageId)
      this.message = message


    },
    sortMessagesByDate: function () {
      this.messages.sort()
    },
  },
  beforeMount() {
    this.getReceivedMessages(this.userId)
  }
}
</script>

