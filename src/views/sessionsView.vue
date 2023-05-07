<template>
    <session-list :sessions="sessions" @deleted="removeItem"></session-list>
    <session-form @submit="fetchData"></session-form>
</template>
<script>
const API_URL = "http://localhost:8080/sessions"

import sessionDetails from "../components/sessionDetails.vue"
import sessionList from "../components/sessionList.vue"
import sessionForm from "../components/sessionForm.vue"
export default {
    components:{
        sessionDetails,
        sessionList,
        sessionForm,
    },
    data() {
        return {
            id: 4,
            session: {
                id: "",
                filmName: "Avatar",
                tickets: 1,
                session_time: "15:30:00",
                session_date: "2023-02-28"
            },
            sessions: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData(){
            //const url = `${API_URL}${this.id}`
            const url = `${API_URL}`
            this.sessions = await (await fetch(url)).json()
        },
        removeItem(id) {
            console.log("Item ", id)
            this.sessions.splice(this.sessions.map(i => i.id).indexOf(id), 1)
        }
    }
}
</script>
