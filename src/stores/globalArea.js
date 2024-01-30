import { defineStore } from 'pinia'
import { ref } from 'vue';

export const sharedReload = ref(false);

export const useMainStore = defineStore('main', {
    state: () => ({
        areaId: 1,
    })
})