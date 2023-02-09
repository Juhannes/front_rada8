<template>
  <select class="form-select" aria-label="Default select example">
    <option selected>Asukoht</option>
    <option value="1">One</option>
  </select>
</template>
<script>
export default {
  name: 'CitiesDropdown',
  data: function () {
    return {
      cities: [
        {
          id: 0,
          name: ''
        }
      ]
    }
  },
}
</script>