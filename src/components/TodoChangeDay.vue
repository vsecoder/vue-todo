<script setup>
let props = defineProps(['days', 'changed_day'])
let emit = defineEmits(['change_day', 'copy_day_tasks'])

import { ref } from 'vue'

var changed_day = ref(props.changed_day)

const changeDay = (day) => {
  changed_day.value = day
  emit('change_day', day)
}

const copyDayTasks = (day) => {
  emit('copy_day_tasks', changed_day.value, day)
}
</script>

<template>
  <div
    v-for="day in days"
    :key="day.id"
    :class="{ 'changed-day': day.title === changed_day }"
    @click="changeDay(day.title)"
    @drop="copyDayTasks(day.title)"
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
