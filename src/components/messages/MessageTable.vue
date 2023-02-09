<template>
  <div>
    <div v-for="message in messages" class="row"  style="margin: 1rem">
      <div class="accordion accordion-flush" style="background-color: aliceblue" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <div class="accordion-button collapsed">
              <button v-on:click="showMessage(message.messageId)">Show message</button>
              {{ message.subject }} <span class="dateTime">{{message.dateTime}}</span>
            </div>
          </h2>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'MessageTable',
  props: {
    messages: undefined
  },
  data: function () {
    return {
      // userId: sessionStorage.getItem('userId'),

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
</style>