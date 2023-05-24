<template>
    <table class="table">
        <tr class="table thead th">
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
        </tr>
        <tr v-for="ticket in tickets" :key="ticket.id">
            <td class="table td">{{ ticket.id }}</td>
            <td class="table td">{{ ticket.firstName + " " +  ticket.lastName }}</td>
            <td class="table td">{{ ticket.session_date }}</td>
            <td class="table td">{{ ticket.session_time }}</td>
            <td class="table td">
                <button id="show-details-modal" @click="ticketDetailId = ticket.id">Show Details</button>
            </td>
            <td class="table td">
                <button id="show-delete-modal" @click="ticketDeleteId = ticket.id">Delete</button>
            </td>
        </tr>
        
    </table>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="ticketDetailId !==0" @close="ticketDetailId = 0">
        <template #header>{{ currentTicket.id }}</template>
        <template #body>
            <ticketView :ticket="currentTicket"></ticketView>
        </template>
        </modal>
    </Teleport>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="ticketDeleteId !==0">
        <template #header>Delete {{ currentTicket.id }} ?</template>
        <template #body>
            Are you sure?
        </template>
        <template #footer>
        <div v-if="!error">
            <button
              class="modal-default-button button-danger"
              @click="deleteTicket"
            >Yes</button>
            <button
              class="modal-default-button button-safe"
              @click="ticketDeleteId = 0"
            >No</button>
        </div>
        <div v-else>
            <span class="button-danger">{{ error }}</span>
            <button
              class="modal-default-button button-safe"
              @click="ticketDeleteId = 0"
            >No</button>
        </div>
        </template>
        </modal>
    </Teleport>
</template>
<script>
import ticketView from './ticketsDetails.vue'
import Modal from './Modal.vue'
    export default {
        components: {
            Modal,
            ticketView
        },
        props: {
            tickets: Array,
            require: true
        },
        emits: ["deleted"],
        data() {
            return {
                ticketDetailId: 0,
                ticketDeleteId: 0,
                currentTicket: null,
                error: null
            }
        },
        watch: {
            ticketDetailId(newId, oldId) {
                this.currentTicket = this.tickets.find((item)=> item.id == newId)
            },
            ticketDeleteId(newId, oldId) {
                this.currentTicket = this.tickets.find((item)=> item.id == newId)
                this.error = null
            }
        },
        methods: {
            deleteTicket() {
                console.log("DELETE confirmed")
                const api_url = "http://localhost:8080"
                fetch(`${api_url}/tickets/${this.ticketDeleteId}`, {
                    method: "delete",
                })
                .then( async response => {
                    const isJson = response.headers.get("content-type")?.includes("application/json")
                    const data = isJson && await response.json()
                    if (!response.ok) {
                        const error = (data && data.error) || response.status
                        return Promise.reject(error)
                    }
                    this.$emit("deleted", this.ticketDeleteId)
                    this.ticketDeleteId = 0
                })
                .catch(error => {
                    console.log("Ticket delete error: ", error)
                    this.error = error
                })
            }
        },
    }
</script>
<style>
table,
th,
td {
    border: 1px solid black;
}
.button-danger{
    background-color: red;
}
.button-safe{
    background-color: green;
}
</style>

