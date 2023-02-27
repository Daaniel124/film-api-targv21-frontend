<template>
    <table>
        <tr>
            <th>Title</th>
            <th></th>
        </tr>
        <tr v-for="film in films" :key="film.id">
            <td>{{ film.title }}</td>
            <td>
                <button id="show-modal" @click="filmDetailId = film.id">Show Details</button>
            </td>
        </tr>
        
    </table>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="filmDetailId !==0" @close="filmDetailId = 0">
      <template #header>{{currentFilm.title}}
      </template>
      <template #body>
        <filmView :film="currentFilm"></filmView>
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
                currentFilm: null,
                current: {
                    title: null,
                    genre: null,
                    duration: null,
                    producer: null,
                    actors: null,
                    description: null
                }
            }
        },
        watch: {
            filmDetailId(newId, oldId) {
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
</style>

