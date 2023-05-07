<template>
    <session-list :sessions="sessions"></session-list>
    <ticket-form @submit="fetchData"></ticket-form>
</template>
<script>
const API_URL = "http://localhost:8080/sessions"

import sessionDetails from "../components/sessionDetails.vue"
import sessionList from "../components/sessionUser.vue"
import ticketForm from "../components/ticketsForm.vue"
export default {
    components:{
        sessionDetails,
        sessionList,
        ticketForm,
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
        }
    }
}
</script>
