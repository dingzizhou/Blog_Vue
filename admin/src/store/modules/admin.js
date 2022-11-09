import {defineStore} from "pinia"

export const adminStore = defineStore({
    id:"app",
    state:()=>({
        token:"1",
    }),
})