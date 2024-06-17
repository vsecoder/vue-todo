import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    days: [
      { id: 0, title: 'пн', tasks: ref([]) },
      { id: 1, title: 'вт', tasks: ref([]) },
      { id: 2, title: 'ср', tasks: ref([]) },
      { id: 3, title: 'чт', tasks: ref([]) },
      { id: 4, title: 'пт', tasks: ref([]) },
      { id: 5, title: 'сб', tasks: ref([]) },
      { id: 6, title: 'вс', tasks: ref([]) },
    ],
    changed_day: ref(1)
  }),
  actions: {
    getNowChangedDay() {
      let now = new Date().getDay() - 1
      this.changed_day = now;
    },
    addTask(task_time, task_title) {
      let last_day_id = 0
      if (this.days[this.changed_day].tasks.length) {
        last_day_id = this.days[this.changed_day].tasks[this.days[this.changed_day].tasks.length - 1].id
      }
      this.days[this.changed_day].tasks.push({
        id: last_day_id + 1,
        time: task_time,
        title: task_title
      })
    },
    removeTask(taskId) {
      this.days[this.changed_day].tasks.splice(this.days[this.changed_day].tasks.indexOf(taskId), 1)
    },
    editTaskTitle(taskId, title) {
      const task = this.days[this.changeDay].tasks.find(task => task.id === taskId)
      task.title = title
    },
    editTaskTime(taskId, time) {
      const task = this.days[this.changeDay].tasks.find(task => task.id === taskId)
      task.time = time
    },
    changeDay(day) {
      console.log(this.days[day])
      this.changed_day = day
    },
    copyTasks(day_to) {
      this.days[day_to].tasks = this.days[this.changed_day].tasks.map(task => ({ ...task }))
    },
    sortTasks() {
      this.days[this.changed_day].tasks.sort((a, b) => {
        if (a.time < b.time) {
          return -1
        }
        if (a.time > b.time) {
          return 1
        }
        return 0
      })
    },
    saveData() {
      let copy = []
      this.days.forEach(day => {
        copy.push({
          id: day.id,
          title: day.title,
          tasks: day.tasks
        })
      })
      localStorage.setItem('days', JSON.stringify(copy))
    },
    loadData() {
      if (localStorage.getItem('days')) {
        JSON.parse(localStorage.getItem('days')).forEach(day => {
          this.days[day.id].tasks = day.tasks
        })
      }
    }
  },
})
