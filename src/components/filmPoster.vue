<template>
    <table class="table">
        <tr class="table thead th">
            <th>Title</th>
            <th>
                <a v-bind:href="'/usersessions'">Show Sessions</a>
            </th>
        </tr>
        <tr v-for="film in films" :key="film.id">
            <td class="table td">{{ film.title }}</td>
            <td class="table td">
                <button id="show-details-modal" @click="filmDetailId = film.id">Show Details</button>
            </td>
        </tr>
        
    </table>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="filmDetailId !==0" @close="filmDetailId = 0">
        <template #header>{{ currentFilm.title }}</template>
        <template #body>
            <filmView :film="currentFilm"></filmView>
        </template>
        </modal>
    </Teleport>
</template>

<script>
const API_URL = "http://localhost:8080/films"
import filmView from './filmDetails.vue'
import Modal from './Modal.vue'
    export default {
        components: {
            Modal,
            filmView
        },
        props: {
            films: Array,
            require: true
        },
        data() {
            return {
                filmDetailId: 0,
                currentFilm: null,
                error: null
            }
        },
        watch: {
            filmDetailId(newId, oldId) {
                this.currentFilm = this.films.find((item)=> item.id == newId)
            },
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

