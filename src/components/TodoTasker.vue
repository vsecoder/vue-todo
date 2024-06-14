<script setup>
defineProps(['day', 'changed_day'])
var emit = defineEmits(['remove_item', 'add_item', 'edit_item'])

import TodoItem from './TodoItem.vue'
import TodoControl from './TodoControl.vue';

import { ref } from 'vue';

var newItem = ref({ title: '', time: '' })

const addItem = (day_id) => {
  emit('add_item', day_id, newItem.value)
  newItem.value.time = ''
  newItem.value.title = ''
}

const removeItem = (day_id, item) => {
  emit('remove_item', day_id, item)
}

const editItem = (day_id, item_id, item) => {
  emit('edit_item', day_id, item_id, item)
}
</script>

<template>
    <table
      v-show="day.title === changed_day"
    >
      <tbody>
        <TodoItem
          v-for="item in day.tasks.value"
          :key="item.id"
          :day_id="day.id"
          :item="item"
          @remove="removeItem(day.id, item)"
          @edit="editItem"
        />
        <TodoControl
          :newItem="newItem"
          @add="addItem(day.id)"
        />
      </tbody>
    </table>
</template>
