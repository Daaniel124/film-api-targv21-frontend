<template>
    <table>
        <tr>
            <th>Title</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="film in films" :key="film.id">
            <td>{{ film.title }}</td>
            <td>
                <button id="show-details-modal" @click="filmDetailId = film.id">Show Details</button>
            </td>
            <td>
                <button id="show-delete-modal" @click="filmDeleteId = film.id">Delete</button>
            </td>
        </tr>
        
    </table>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="filmDetailId !==0" @close="filmDetailId = 0">
        <template #header>{{currentFilm.title}}</template>
        <template #body>
            <filmView :film="currentFilm"></filmView>
        </template>
        </modal>
    </Teleport>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="filmDeleteId !==0" @close="filmDeleteId = 0">
        <template #header>Delete {{currentFilm.title}} ?</template>
        <template #body>
            Are you sure?
        </template>
        <template #footer>
            <button
              class="modal-default-button button-danger"
              @click="$emit('confirmed')"
            >Yes</button>
            <button
              class="modal-default-button button-safe"
              @click="$emit('close')"
            >No</button>
        </template>
        </modal>
    </Teleport>
</template>
<script>
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
                filmDeleteId: 0,
                currentFilm: null
            }
        },
        watch: {
            filmDetailId(newId, oldId) {
                this.currentFilm = this.films.find((item)=> item.id == newId)
            },
            filmDeleteId(newId, oldId) {
                this.currentFilm = this.films.find((item)=> item.id == newId)
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

