<template>
    <table class="table">
        <tr class="table thead th">
            <th>ID</th>
            <th>Film Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Tickets</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="session in sessions" :key="session.id">
            <td class="table td">{{ session.id }}</td>
            <td class="table td">{{ session.filmName }}</td>
            <td class="table td">{{ session.session_date }}</td>
            <td class="table td">{{ session.session_time }}</td>
            <td class="table td">{{ session.tickets }}</td>
            <td class="table td">
                <button id="show-details-modal" @click="sessionDetailId = session.id">Show Details</button>
            </td>
            <td class="table td">
                <button id="show-delete-modal" @click="sessionDeleteId = session.id">Delete</button>
            </td>
        </tr>
        
    </table>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="sessionDetailId !==0" @close="sessionDetailId = 0">
        <template #header>{{ currentSession.filmName }}</template>
        <template #body>
            <sessionView :session="currentSession"></sessionView>
        </template>
        </modal>
    </Teleport>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="sessionDeleteId !==0">
        <template #header>Delete {{ currentSession.filmName }} ?</template>
        <template #body>
            Are you sure?
        </template>
        <template #footer>
        <div v-if="!error">
            <button
              class="modal-default-button button-danger"
              @click="deleteSession"
            >Yes</button>
            <button
              class="modal-default-button button-safe"
              @click="sessionDeleteId = 0"
            >No</button>
        </div>
        <div v-else>
            <span class="button-danger">{{ error }}</span>
            <button
              class="modal-default-button button-safe"
              @click="sessionDeleteId = 0"
            >No</button>
        </div>
        </template>
        </modal>
    </Teleport>
</template>
<script>
import sessionView from './sessionDetails.vue'
import Modal from './Modal.vue'
    export default {
        components: {
            Modal,
            sessionView
        },
        props: {
            sessions: Array,
            require: true
        },
        emits: ["deleted"],
        data() {
            return {
                sessionDetailId: 0,
                sessionDeleteId: 0,
                currentSession: null,
                error: null
            }
        },
        watch: {
            sessionDetailId(newId, oldId) {
                this.currentSession = this.sessions.find((item)=> item.id == newId)
            },
            sessionDeleteId(newId, oldId) {
                this.currentSession = this.sessions.find((item)=> item.id == newId)
                this.error = null
            }
        },
        methods: {
            deleteSession() {
                console.log("DELETE confirmed")
                const api_url = "http://localhost:8080"
                fetch(`${api_url}/sessions/${this.sessionDeleteId}`, {
                    method: "delete",
                })
                .then( async response => {
                    const isJson = response.headers.get("content-type")?.includes("application/json")
                    const data = isJson && await response.json()
                    if (!response.ok) {
                        const error = (data && data.error) || response.status
                        return Promise.reject(error)
                    }
                    this.$emit("deleted", this.sessionDeleteId)
                    this.sessionDeleteId = 0
                })
                .catch(error => {
                    console.log("Session delete error: ", error)
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

