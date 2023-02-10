<template>
  <div>
    <div class="row">

      <!--  COLUMN 1  -->
      <div style="text-align: left; margin: 10px; margin-left: 30px">
        {{ selectedFilter }}
      </div>
      <div class="col col-7">
        <div class="col text-start" style="margin-left: 2rem">
          <button v-on:click="setMessageFilter('A'); setSelectedFilter('Saabunud sõnumid')" type="button" class="btn btn-success btn-sm">Saabunud</button>
          <button type="button" class="btn btn-secondary btn-sm" style="margin-left: 10px; margin-right: 10px">Saadetud</button>
          <button v-on:click="setMessageFilter('T'); setSelectedFilter('Prügikast')" type="button" class="btn btn-warning btn-sm">Prügikast</button>

        </div>

        <div class="col">
          <MessageTable @emitShowMessageEvent="showMessage" :messages="messages" :message-filter="messageFilter"/>
        </div>
      </div>

      <!-- COLUMN 2  -->
      <div class="col col-4" style="margin-top: 2rem">
        <div v-if="alertMessage != ''" class="alert alert-warning" role="alert">
          {{ alertMessage }}
        </div>
        <MessageWindow @emitToggleMessageEvent="toggleMessage" @emitDeleteMessageEvent="deleteMessage"
                       @emitRefreshTableEvent="getReceivedMessages(this.userId)"
                       @emitRestoreMessageEvent="restoreMessage"
                       :message="this.message" :view-message="viewMessage"/>

      </div>


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
      viewMessage: false,
      messageFilter: 'A',
      selectedFilter: 'Saabunud sõnumid',
      alertMessage: '',

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
      this.alertMessage = 'Sõnum lendas prügikasti!'
      setTimeout(() =>  {
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
      this.alertMessage = 'Sõnum taastatud!'
      setTimeout(() =>  {
        this.alertMessage = '';
      }, 2000)
    },
    showMessage: function (messageId) {
      let message = this.messages.find(message => message.messageId == messageId)
      this.message = message
      this.viewMessage = true
    },
    toggleMessage: function (viewMessage) {
      if (viewMessage) {
        this.viewMessage = false
      } else {
        this.viewMessage = true
      }
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

