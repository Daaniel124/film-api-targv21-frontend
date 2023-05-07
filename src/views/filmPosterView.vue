<template>
    <!--<film-list :films="films" ></film-list>-->
    <film-poster :films="films" ></film-poster>
</template>
<script>
const API_URL = "http://localhost:8080/films"
import filmList from "../components/filmList.vue"
import filmPoster from "../components/filmPoster.vue"

export default {
        components: {
            filmList,
            filmPoster
        },
        data() {
        return {
            id: 4,
            film: {
                id: "",
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
            //const url = `${API_URL}${this.id}`
            const url = `${API_URL}`
            this.films = await (await fetch(url)).json()
        }
    }
    }
</script>
<style>

</style>