<template>
    <div>
        <p>First Name: {{ currentTicket.firstName }}</p>
        <p>Last Name: {{ currentTicket.lastName }}</p>
        <p>Row: {{ currentTicket.row }}</p>
        <p>Place Number: {{ currentTicket.columnNumber }}</p>
        <p>Price EUR: {{ currentTicket.price }}</p>
    </div>
</template>
<script>
const API_URL = "http://localhost:8080/tickets"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        ticket: Object,
        require: true
    },
    data() {
        return {
            currentTicket: { firstName: "", lastName: "", row: "", columnNumber: "", price: ""}
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentTicket = await (await fetch(url + "/" + this.ticket.id)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>