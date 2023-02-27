<template>
    <!--<film-view :film="film"></film-view>-->
    <film-list :films="films"></film-list>
    <!--<film-form></film-form>-->
</template>
<script>
const API_URL = "http://localhost:8080/films"

import filmDetails from "./components/filmDetails.vue"
import filmList from "./components/filmList.vue"
import filmForm from "./components/filmForm.vue"
export default {
    components:{
        //filmDetails,
        filmList,
        //filmForm
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
            //const url = `${API_URL}${this.id}`
            const url = `${API_URL}`
            this.films = await (await fetch(url)).json()
        }
    }
}
</script>
