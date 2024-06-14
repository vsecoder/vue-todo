<script setup>
var props = defineProps(['newItem'])
defineEmits(['add'])

import { ref, watch } from 'vue'

var newItem = ref(props.newItem)

watch(() => props.newItem, (newVal) => {
  newItem.value = newVal
})
</script>

<template>
  <tr>
    <td><input name="time" v-model="newItem.time" @keyup.enter="$emit('add')" /></td>
    <td><input name="title" v-model="newItem.title" @keyup.enter="$emit('add')" /></td>
    <td>
      <button @click="$emit('add')">
        <img src="../assets/plus.svg" alt="add" />
      </button>
    </td>
  </tr>
</template>

<style scoped>
input[name="time"] {
  width: 80px;
}

input[name="title"] {
  width: 200px;
}
</style>