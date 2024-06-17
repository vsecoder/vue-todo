<script setup>
import { useTasksStore } from '@/stores/tasks';

let tasksStore = useTasksStore()

tasksStore.getNowChangedDay()

const changeDay = (day) => {
  tasksStore.changeDay(day)
}

const copyDayTasks = (day) => {
  tasksStore.copyTasks(day)
}
</script>

<template>
  <div
    v-for="day in tasksStore.days"
    :key="day.id"
    :class="{ 'changed-day': day.id === tasksStore.changed_day }"
    @click="changeDay(day.id)"
    @drop="copyDayTasks(day.id)"
    @dragover.prevent
    @dragenter.prevent
  >
    {{ day.title }}
  </div>
</template>

<style scoped>
.changed-day {
  background-color: #F8F8F9;
}
</style>
