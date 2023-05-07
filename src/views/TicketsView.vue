<template>
    <ticket-list :tickets="tickets" @deleted="removeItem"></ticket-list>
    <tickets-form @submit="fetchData"></tickets-form>
</template>
<script>
const API_URL = "http://localhost:8080/tickets"

import ticketDetails from "../components/ticketsDetails.vue"
import ticketList from "../components/ticketsList.vue"
import ticketsForm from "../components/ticketsForm.vue"
export default {
    components:{
        ticketDetails,
        ticketList,
        ticketsForm
    },
    data() {
        return {
            id: 4,
            ticketID: 6,
            ticket: {
                id: "",
                firstName: "Daaniel",
                lastName: "Loginov",
                sessionID: 4,
                filmID: 4,
                session_time: "15:30:00",
                session_date: "2023-02-28T00:00:00.000Z"
            },
            tickets: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData(){
            //const url = `${API_URL}${this.id}`
            const url = `${API_URL}`
            this.tickets = await (await fetch(url)).json()
        },
        removeItem(id) {
            console.log("Item ", id)
            this.tickets.splice(this.tickets.map(i => i.id).indexOf(id), 1)
        }
    }
}
</script>
<style>

</style>