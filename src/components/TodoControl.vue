<script setup>
let props = defineProps(['newItem'])
defineEmits(['add'])

import { ref, watch } from 'vue'

let newItem = ref(props.newItem)

watch(() => props.newItem, (newVal) => {
  newItem.value = newVal
})
</script>

<template>
  <div class="row control">
    <input name="time" v-model="newItem.time" @keyup.enter="$emit('add')" />
    <input name="title" v-model="newItem.title" @keyup.enter="$emit('add')" />
    <button @click="$emit('add')">
      <img src="../assets/plus.svg" alt="add" />
    </button>
  </div>
</template>

<style scoped>
input[name="time"] {
  width: 80px;
}

input[name="title"] {
  width: 200px;
}
</style>