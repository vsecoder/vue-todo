<script setup>
let props = defineProps(['changed_day'])
let emit = defineEmits(['remove_item', 'add_item', 'edit_item'])

import TodoItem from './TodoItem.vue'
import TodoControl from './TodoControl.vue';

import { ref, computed } from 'vue';

let newItem = ref({ title: '', time: '' })
let changed_day = ref(props.changed_day)

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

const tasker = computed(() => {
  return changed_day.value
})
</script>

<template>
  <div
    class="tasker"
    :id="tasker.id"
  >
    <div class="bar">
      <img
        alt="star"
        class="star"
        src="../assets/star.svg"
        title="Перетащите в другой день для копирования задач"
      />
    </div>
    <TodoItem
      v-for="item in tasker.tasks"
      :key="item.id + _ + tasker.id"
      :day_id="tasker.id"
      :item="item"
      @remove="removeItem(tasker.id, item)"
      @edit="editItem"
    />
    <TodoControl
      :newItem="newItem"
      @add="addItem(tasker.id)"
    />
  </div>
</template>
