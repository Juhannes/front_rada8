<template>
  <div v-if="Object.keys(message).length !== 0" class="col col-4 p-3 border bg-light" style="margin-top: 2rem">
    <div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Saatja</span>
        <input v-model:value="message.sender.userName" type="text" readonly class="form-control">
      </div>
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Pealkiri</span>
      <input v-model:value="message.subject" type="text" readonly class="form-control">
    </div>
    <div class="form-floating">
      <textarea v-model:content="message.body" class="form-control" readonly placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
      <label for="floatingTextarea2">Sõnum</label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MessageWindow',
  props: {
    message: {}
  }
}
</script>