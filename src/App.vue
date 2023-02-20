<template>
    <film-view :film="film"></film-view>
    <film-list :films="films"></film-list>
</template>
<script>
const API_URL = "http://localhost:8080/films/"

import filmView from "./components/filmView.vue"
import filmList from "./components/filmList.vue"
export default {
    components:{
        filmView,
        filmList
    },
    data() {
        return {
            id: 10,
            film: {
                title: "Avatar",
                genre: "Adventure",
                duration: "2:15:00",
                producer: "Jim Kerry",
                actors: "Leonardo",
                description: "This is so good film!"
            },
            films: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData(){
            const url = `${API_URL}${this.id}`
            this.film = await (await fetch(url)).json()
        }
    }
}
</script>
