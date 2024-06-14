<script setup>
import TodoTasker from './TodoTasker.vue';
import TodoChangeDay from './TodoChangeDay.vue';

import { ref, onMounted, computed } from 'vue';

let now = new Date();
let day = now.getDay();

let days = [
  { id: 0, title: 'пн', tasks: ref([
    { id: 1, title: 'Обед', time: '13:30' },
    { id: 2, title: 'Скайпкол', time: '17:40' },
  ])},
  { id: 1, title: 'вт', tasks: ref([
    { id: 1, title: 'Завтрак', time: '08:30' },
    { id: 2, title: 'Ужин', time: '19:00' },
  ])},
  { id: 2, title: 'ср', tasks: ref([]) },
  { id: 3, title: 'чт', tasks: ref([]) },
  { id: 4, title: 'пт', tasks: ref([]) },
  { id: 5, title: 'сб', tasks: ref([]) },
  { id: 6, title: 'вс', tasks: ref([]) },
]


const saveData = () => {
  let copy = [];
  days.forEach(day => {
    copy.push({
      id: day.id,
      title: day.title,
      tasks: day.tasks.value
    })
  })
  localStorage.setItem('days', JSON.stringify(copy))
}

const loadData = () => {
  if (localStorage.getItem('days')) {
    JSON.parse(localStorage.getItem('days')).forEach(day => {
      days[day.id].tasks.value = day.tasks
    })
  }
}

let changed_day = ref(days[day-1]);

const sort_tasks = (day_id) => {
  days[day_id].tasks.value.sort((a, b) => {
    if (a.time < b.time) {
      return -1
    }
    if (a.time > b.time) {
      return 1
    }
    return 0
  })
  saveData()
}

const addItem = (day_id, newItem) => {
  // check if the fields are not empty
  if (newItem.title === '' || newItem.time === '') {
    // if the fields are empty, sort the tasks
    sort_tasks(day_id)
    return
  }
  // get the last id of the tasks array
  let last_id = days[day_id].tasks.value.length === 0 ? 0 : days[day_id].tasks.value[days[day_id].tasks.value.length-1].id + 1
  // add the new item to the tasks array
  days[day_id].tasks.value.push({
    id: last_id,
    title: newItem.title,
    time: newItem.time
  })
  // save the data to the local storage
  saveData()
}

const removeItem = (day_id, item) => {
  days[day_id].tasks.value.splice(days[day_id].tasks.value.indexOf(item), 1)
  saveData()
}

const changeDay = (day) => {
  changed_day.value = days.filter(d => d.title === day)[0]
}

const editItem = (day_id, item_id, item) => {
  days[day_id].tasks.value.filter(i => i.id === item_id)[0] = item
  saveData()
}

const copyDayTasks = (from_day, to_day) => {
  days.filter(d => d.title === to_day)[0].tasks.value = days.filter(d => d.title === from_day)[0].tasks.value
  saveData()
}

onMounted(() => {
  loadData()
})

const tasker = computed(() => {
  return {
    changed_day
  }
})
</script>

<template>
  <div
    class="middle"
  >
    <TodoTasker
      :changed_day="tasker.changed_day"
      @remove_item="removeItem"
      @add_item="addItem"
      @edit_item="editItem"
    />
  </div>
  <div class="middle styled">
    <TodoChangeDay
      :days="days"
      :changed_day="changed_day"
      @change_day="changeDay"
      @copy_day_tasks="copyDayTasks"
    />
  </div>
</template>
