<template>
    <table class="table">
        <tr class="table thead th">
            <th>Film Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Tickets</th>
            <th></th>
        </tr>
        <tr v-for="session in sessions" :key="session.id">
            <td class="table td">{{ session.filmName }}</td>
            <td class="table td">{{ session.session_date }}</td>
            <td class="table td">{{ session.session_time }}</td>
            <td class="table td">{{ session.tickets }}</td>
            <td class="table td">
                <button id="show-details-modal" @click="sessionDetailId = session.id">Show Details</button>
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
                currentSession: null,
                error: null
            }
        },
        watch: {
            sessionDetailId(newId, oldId) {
                this.currentSession = this.sessions.find((item)=> item.id == newId)
            }
        }
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

