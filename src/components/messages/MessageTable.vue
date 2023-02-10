<template>
  <div>
    <div v-if="messages.length > 0">
      <div v-for="message in messages" v-if="message.status == messageFilter"  class="row" style="margin: 0.6rem;">
        <div v-on:click="showMessage(message.messageId)" class="accordion accordion-flush" style="cursor: pointer" id="accordionFlushExample">
          <div class="accordion-item" style="box-shadow: 2px 2px 2px rgba(86,86,86,0.64)">
            <h2 class="accordion-header">
              <div class="messageButtonArea">
                {{ message.subject }} <span class="dateTime">{{ message.dateTime }}</span>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 50px">
      <h3>Ei ole sissetulnud sõnumeid</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageTable',
  props: {
    messages: undefined,
    messageFilter: ''
  },
  data: function () {
    return {

    }
  },
  methods: {
    showMessage: function (messageId) {

      this.$emit('emitShowMessageEvent', messageId)

    }
  },

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

</style>