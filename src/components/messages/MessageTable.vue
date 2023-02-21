<template>
  <div>
    <div v-if="messageGroups.length > 0">
      <div v-if="isInbox">
        <div v-for="messageGroup in messageGroups">
          <div v-for="(message, index) in messageGroup" :key="message.messageId"
               :class="{ 'class' : index !== 0 }">
            <div v-if="message.status === messageFilter && message.sender.userId !== userId"
                 class="row" style="margin: 0.6rem;">
              <div v-on:click="showMessage(message); clearMessageWindow()" class="accordion accordion-flush"
                   style="cursor: pointer;" id="accordionFlushExample">
                <div class="accordion-item" style="box-shadow: 2px 2px 2px rgba(86,86,86,0.64)">
                  <h2 class="accordion-header">
              <span class="messageButtonArea">
                {{ message.subject }} <span class="dateTime">{{ message.dateTime }}</span>
              </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!isInbox">
        <div v-for="messageGroup in messageGroups">
          <div v-for="message in messageGroup">
            <div v-if="message.status === messageFilter && message.sender.userId === userId"
                 class="row" style="margin: 0.6rem;">
              <div v-on:click="showMessage(message); clearMessageWindow()" class="accordion accordion-flush"
                   style="cursor: pointer" id="accordionFlushExample">
                <div class="accordion-item" style="box-shadow: 2px 2px 2px rgba(86,86,86,0.64)">
                  <h2 class="accordion-header">
              <span class="messageButtonArea">
                {{ message.subject }} <span class="dateTime">{{ message.dateTime }}</span>
              </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageTable',
  props: {
    userId: 0,
    messageGroups: undefined,
    messageFilter: String,
    isInbox: Boolean
  },
  data: function () {
    return {}
  },
  methods: {
    showMessage: function (message) {
      this.$emit('emitShowMessageEvent', message)
    },
    clearMessageWindow: function () {
      this.$emit('clearMessageWindowEvent')
    }
  },
  mounted() {
    console.log(sessionStorage.getItem('userId'))
    console.log(this.userId)
  }

}
</script>
<style>
.dateTime {
  font-style: italic;
  color: #7d7d7d;
  margin-left: 2rem;
}

.messageButtonArea {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  background-color: #fff;
  border: 0;
  border-radius: 0;
  overflow-anchor: none;
}

.child {
  width: 80%;
  margin-left: auto;
  margin-right: 0;
}
</style>