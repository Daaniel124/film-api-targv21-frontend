<template>
    <div>
        <h1>Film title: {{ currentFilm.title }}</h1>
        <p>Genre: {{ currentFilm.genre }}</p>
        <h3>Duration: {{ currentFilm.duration }}</h3>
        <p>Producer: {{ currentFilm.producer }}</p>
        <p>Actors: {{ currentFilm.actors }}</p>
        <p>Description: {{ currentFilm.description }}</p>
        <!--<p>Session Date: {{ useDateFormating(currentFilm.session_date) }}</p>-->
    </div>
</template>
<script>
const API_URL = "http://localhost:8080/films"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        film: Object,
        require: true
    },
    data() {
        return {
            currentFilm: { title: "", genre: "", duration: "", producer: "", actors: "", description: ""/*, session_date: ""*/}
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentFilm = await (await fetch(url + "/" + this.film.id)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>