<script setup>
let props = defineProps(['item', 'day_id'])

import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks';

const tasksStore = useTasksStore();

let day_id = props.day_id;
let item = ref(props.item);
let deleted = ref(false);

const is_outdated = () => {
  let now = new Date().getHours() * 60 + new Date().getMinutes();
  let item_time = parseInt(item.value.time.split(':')[0]) * 60 + parseInt(item.value.time.split(':')[1]);
  return now > item_time;
}

const edit_time = (e) => {
  item.value.time = e.target.innerText;
}

const edit_title = (e) => {
  item.value.title = e.target.innerText;
}

const deleteRow = () => {
  deleted.value = true;
  setTimeout(() => {
    tasksStore.removeTask(day_id, item.value.id);
  }, 300);
}
</script>

<template>
  <div class="row" :class="{ outdated: is_outdated(), delete: deleted }">
    <div contenteditable @input="edit_time">{{ item.time }}</div>
    <div contenteditable @input="edit_title">{{ item.title }}</div>
    <div><img src="../assets/del.svg" @click="deleteRow" alt="delete" /></div>
  </div>
</template>

<style scoped>
.outdated {
  color: red;
}

div img {
  cursor: pointer;
}
</style>