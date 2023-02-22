<template>
  <div>
    <div v-if="messageGroups.length > 0">
      <div v-if="isInbox">
        <div v-for="(messageGroup, groupIndex) in messageGroups">
          <div
              v-for="(message, messageIndex) in messageGroup.filter(messageX => messageX.sender.userId !== userId && messageX.status === messageFilter)"
              :key="message.messageId"
              :class="{ 'child' : messageIndex !== 0 }">
            <div
                class="row" style="margin: 0.6rem;">
              <div v-on:click="showMessage(message); clearMessageWindow(); turnActive(messageIndex, groupIndex)"
                   class="accordion accordion-flush"
                   style="cursor: pointer;" id="accordionFlushExample">
                <div class="accordion-item" style="box-shadow: 2px 2px 2px rgba(86,86,86,0.64)">
                  <h2 class="accordion-header">
              <span class="messageButtonArea"
                    :class="{ active: activeMessageIndex === messageIndex && activeGroupIndex === groupIndex }">
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
        <div v-for="(messageGroup, groupIndex) in messageGroups">
          <div
              v-for="(message, messageIndex) in messageGroup.filter(messageX => messageX.sender.userId === userId && messageX.status === messageFilter)"
              :key="message.messageId"
              :class="{ 'child' : messageIndex !== 0 }">
            <div
                class="row" style="margin: 0.6rem;">
              <div v-on:click="showMessage(message); clearMessageWindow(); turnActive(messageIndex, groupIndex)"
                   class="accordion accordion-flush"
                   style="cursor: pointer" id="accordionFlushExample">
                <div class="accordion-item" style="box-shadow: 2px 2px 2px rgba(86,86,86,0.64)">
                  <h2 class="accordion-header">
              <span class="messageButtonArea"
                    :class="{ active: activeMessageIndex === messageIndex && activeGroupIndex === groupIndex }">
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
    return {
      activeMessageIndex: null,
      activeGroupIndex: null
    }
  },
  methods: {
    showMessage: function (message) {
      this.$emit('emitShowMessageEvent', message)
    },
    clearMessageWindow: function () {
      this.isActive = false
      this.$emit('clearMessageWindowEvent')
    },
    turnActive: function (activeMessageIndex, activeGroupIndex) {
      this.activeMessageIndex = activeMessageIndex;
      this.activeGroupIndex = activeGroupIndex
    }
  },
  mounted() {
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
  width: 95%;
  margin-left: auto;
  margin-right: 0;
}

.active {
  background-color: #f4f4f4;
  border-bottom: solid 1px black;
  border-left: solid 1px black;
}
</style>