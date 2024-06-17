<script setup>
import TodoItem from './TodoItem.vue'
import TodoControl from './TodoControl.vue';

import { useTasksStore } from '@/stores/tasks';
import { computed } from 'vue';

let tasksStore = useTasksStore()

tasksStore.loadData()

const tasker = computed(() => {
  tasksStore.saveData()
  return {
    day: tasksStore.days[tasksStore.changed_day]
  }
})
</script>

<template>
  <div class="tasker">
    <div class="bar">
      <img alt="star" class="star" src="../assets/star.svg" title="Перетащите в другой день для копирования задач" />
    </div>
    <TodoItem v-for="item in tasker.day.tasks" :key="item.id + _ + tasker.day.id" :day_id="tasker.day.id" :item="item" />
    <p v-if="tasker.day.tasks.length === 0">Нет задач</p>
    <TodoControl />
  </div>
</template>
