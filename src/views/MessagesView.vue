<template>
  <div>
    <div class="row">

      <!--  COLUMN 1  -->
      <div style="text-align: left; margin: 10px; margin-left: 30px">
        {{ selectedFilter }}
      </div>
      <div class="col col-7">

        <div class="col">

          <div class="col-12 btn-group" role="group" aria-label="Basic radio toggle button group">
            <input v-on:click="setMessageFilter('A'); setSelectedFilter('Saabunud sõnumid')" checked type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
            <label class="btn btn-outline-secondary" for="btnradio1">Saabunud</label>

            <input v-on:click="setToOutbox('A'); setSelectedFilter('Saadetud sõnumid')" type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
            <label class="btn btn-outline-secondary" for="btnradio2">Saadetud</label>

            <input v-on:click="setMessageFilter('T'); setSelectedFilter('Prügikast')" type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
            <label class="btn btn-outline-secondary" for="btnradio3">Kustutatud</label>
          </div>

        </div>

        <div class="col">
          <MessageTable @emitShowMessageEvent="showMessage"
                        @clearMessageWindowEvent="clearMessageWindow"
                        refs="messageTable" :message-groups="messageGroups" :message-filter="this.messageFilter" :user-id="this.userId" :is-inbox="isInbox"/>
        </div>
      </div>

      <!-- COLUMN 2  -->
      <!--                       @emitSendReplyEvent="sendMessageReply"-->
      <div class="col col-4" style="margin-top: 2rem">
        <MessageWindow @emitToggleMessageEvent="toggleMessage" @emitDeleteMessageEvent="deleteMessage"
                       @emitRefreshTableEvent="getReceivedMessages()"
                       @emitRestoreMessageEvent="restoreMessage"
                       @activateIsSendEvent="changeIsSendToTrue()"
                       :message="this.message" :view-message="viewMessage" :is-send="isSend" :is-inbox="isInbox" ref="messageWindow"/>

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
      isInbox: true,
      alertMessage: '',
      alertType: '',
      isSend: false,

      messageGroups: [
        [
          {
            messageId: 0,
            conversationId: 0,
            subject: '',
            sender: {
              userId: 0,
              userName: '',
              email: ''
            },
            receiver: {
              userId: 0,
              userName: '',
              email: ''
            },
            body: '',
            dateTime: '',
            status: '',
            advertisementId: 0
          }
        ]
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
    getReceivedMessages: function () {
      this.$http.get("/message", {
            params: {
              userId: this.userId,
            }
          }
      ).then(response => {
        this.messageGroups = response.data
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
    showMessage: function (message) {
      this.message = message
      this.viewMessage = true
    },
    changeIsSendToTrue: function () {
      if (!this.isSend) {
        this.isSend = true;
      } else if (this.isSend) {
        this.isSend = false
      }

    },
    clearMessageWindow: function () {
      this.isSend = false
    },
    toggleMessage: function (viewMessage) {
      this.viewMessage = !viewMessage;
    },
    setMessageFilter: function (filterStatus) {
      this.messageFilter = filterStatus
      this.isInbox = true
    },
    setSelectedFilter: function (selected) {
      this.selectedFilter = selected
    },
    setToOutbox: function (filterStatus) {
      this.messageFilter = filterStatus
      this.isInbox = false;
    }

  },
  beforeMount() {
    this.getReceivedMessages(this.userId)
  }
}
</script>

<!--Kui kunagi jõuab siis võib teha MessageWindows this.body = sessionStorage vms, et kirjutatud sõnum ära ei kaoks kui kuhugile klikata-->