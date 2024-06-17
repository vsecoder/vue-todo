<script setup>
import { useItemStore } from '@/stores/item';
import { useTasksStore } from '@/stores/tasks';

let itemStore = useItemStore()
let tasksStore = useTasksStore()

const addItem = () => {
  if (!itemStore.time || !itemStore.title) return tasksStore.sortTasks()
  tasksStore.addTask(itemStore.time, itemStore.title)
  itemStore.setTime('')
  itemStore.setTitle('')
}
</script>

<template>
  <div class="row control">
    <input name="time" v-model="itemStore.time" />
    <input name="title" v-model="itemStore.title" />
    <button @click="addItem">
      <img src="../assets/plus.svg" alt="add" />
    </button>
  </div>
</template>