<script setup>
var props = defineProps(['days', 'changed_day'])
var emit = defineEmits(['change_day'])

import { ref } from 'vue'

var changed_day = ref(props.changed_day)

const changeDay = (day) => {
  changed_day.value = day
  emit('change_day', day)
}
</script>

<template>
  <div
    v-for="day in days"
    :key="day.id"
    @click="changeDay(day.title)"
    :class="{ 'changed-day': day.title === changed_day }"
  >
    {{ day.title }}
  </div>
</template>

<style scoped>
.changed-day {
  background-color: #F8F8F9;
}
</style>
