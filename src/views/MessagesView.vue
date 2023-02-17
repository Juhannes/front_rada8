<template>
  <div>
    <div class="row">

      <!--  COLUMN 1  -->
      <div style="text-align: left; margin: 10px; margin-left: 30px">
        {{ selectedFilter }}
      </div>
      <div class="col col-7">
        <div class="col text-start" style="margin-left: 2rem">
          <button v-on:click="setMessageFilter('A'); setSelectedFilter('Saabunud sõnumid')" type="button"
                  class="btn btn-success btn-sm">Saabunud
          </button>
          <button type="button" class="btn btn-secondary btn-sm" style="margin-left: 10px; margin-right: 10px">
            Saadetud
          </button>
          <button v-on:click="setMessageFilter('T'); setSelectedFilter('Prügikast')" type="button"
                  class="btn btn-warning btn-sm">Prügikast
          </button>

        </div>

        <div class="col">
          <MessageTable @emitShowMessageEvent="showMessage"
                        @clearMessageWindowEvent="clearMessageWindow"
                        refs="messageTable" :messages="messages" :message-filter="messageFilter"/>
        </div>
      </div>

      <!-- COLUMN 2  -->
      <!--                       @emitSendReplyEvent="sendMessageReply"-->
      <div class="col col-4" style="margin-top: 2rem">
        <MessageWindow @emitToggleMessageEvent="toggleMessage" @emitDeleteMessageEvent="deleteMessage"
                       @emitRefreshTableEvent="getReceivedMessages(this.userId)"
                       @emitRestoreMessageEvent="restoreMessage"

                       @activateIsSendEvent="changeIsSendToTrue"
                       :message="this.message" :view-message="viewMessage" :is-send="isSend" ref="messageWindow"/>

      </div>


    </div>

  </div>
</template>

<script>
import MessageTable from "@/components/messages/MessageTable.vue";
import MessageWindow from "@/components/messages/MessageWindow.vue";
import AlertWarning from "@/components/alert/AlertWarning.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "MessagesView",
  components: {AlertSuccess, AlertWarning, MessageWindow, MessageTable},
  data: function () {
    return {
      userId: Number(sessionStorage.getItem('userId')),
      message: {},
      viewMessage: false,
      messageFilter: 'A',
      selectedFilter: 'Saabunud sõnumid',
      alertMessage: '',
      alertType: '',
      isSend: false,

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
          status: '',
          advertisementId: 0
        }
      ],
      outGoingMessage: {
        senderId: 0,
        receiverId: 0,
        conversationId: 0,
        messageBody: ''
      }
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
    deleteMessage: function (messageId) {
      this.$http.delete("/message", {
            params: {
              messageId: messageId,
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
      this.message.status = 'T'
      this.alertType = 'Warning'
      this.alertMessage = 'Sõnum lendas prügikasti!'
      setTimeout(() => {
        this.alertMessage = '';
      }, 2000)
    },
    restoreMessage: function () {
      this.$http.put("/message", this.message, {
            params: {
              messageId: this.message.messageId
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
      this.message.status = 'A'
      this.alertType = 'Warning'
      this.alertMessage = 'Sõnum taastatud!'
      setTimeout(() => {
        this.alertMessage = '';
      }, 2000)
    },
    showMessage: function (messageId) {
      this.message = this.messages.find(message => message.messageId === messageId)
      this.viewMessage = true
    },
    changeIsSendToTrue: function () {
      this.isSend = true
    },
    clearMessageWindow: function () {
      this.isSend = false
    },
    toggleMessage: function (viewMessage) {
      this.viewMessage = !viewMessage;
    },
    setMessageFilter: function (filterStatus) {
      this.messageFilter = filterStatus
    },

    setSelectedFilter: function (selected) {
      this.selectedFilter = selected
    },

  },
  beforeMount() {
    this.getReceivedMessages(this.userId)
  }
}
</script>

<!--Kui kunagi jõuab siis võib teha MessageWindows this.body = sessionStorage vms, et kirjutatud sõnum ära ei kaoks kui kuhugile klikata-->