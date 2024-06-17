import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('item', {
    state: () => ({
        time: ref(''),
        title: ref(''),
    }),
    actions: {
        setTime(time) {
            this.time = time
        },
        setTitle(title) {
            this.title = title
        },
        clear() {
            this.time = ''
            this.title = ''
        }
    },
})