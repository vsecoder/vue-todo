<script setup>
let props = defineProps(['item', 'day_id'])
let emit = defineEmits(['remove', 'edit'])

import { ref } from 'vue'

let day_id = props.day_id;
let item = ref(props.item);
let deleted = ref(false);

const edit_time = (e) => {
  item.value.time = e.target.innerText;
  emit('edit', day_id, item.value.id, item.value);
}

const edit_title = (e) => {
  item.value.title = e.target.innerText;
  emit('edit', day_id, item.value.id, item.value);
}

const is_outdated = () => {
  let now = new Date().getHours() * 60 + new Date().getMinutes();
  let item_time = parseInt(item.value.time.split(':')[0]) * 60 + parseInt(item.value.time.split(':')[1]);
  return now > item_time;
}

const deleteRow = () => {
  deleted.value = true;
  setTimeout(() => {
    emit('remove', day_id, item.value.id);
  }, 300);
}
</script>

<template>
  <tr :class="{ outdated: is_outdated(), delete: deleted }">
    <td><div contenteditable @input="edit_time">{{ item.time }}</div></td>
    <td><div contenteditable @input="edit_title">{{ item.title }}</div></td>
    <td>
      <img src="../assets/del.svg" @click="deleteRow" alt="delete" />
    </td>
  </tr>
</template>

<style scoped>
.outdated {
  color: red;
}
</style>