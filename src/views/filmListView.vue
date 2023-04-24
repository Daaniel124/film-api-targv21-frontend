<template>
    <!--<film-details :film="film"></film-details>-->
    <film-list :films="films" @deleted="removeItem"></film-list>
    <!--<film-form @submit="fetchData"></film-form>-->
</template>
<script>
const API_URL = "http://localhost:8080/films"

import filmDetails from "../components/filmDetails.vue"
import filmList from "../components/filmList.vue"
import filmForm from "../components/filmForm.vue"
export default {
    components:{
        filmDetails,
        filmList,
        filmForm,
    },
    data() {
        return {
            id: 4,
            //ticketID: 6,
            film: {
                //id: "",
                title: "Avatar",
                /*genre: "Adventure",
                duration: "2:15:00",
                producer: "Jim Kerry",
                actors: "Leonardo",
                description: "This is so good film!"*/
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
        },
        removeItem(id) {
            console.log("Item ", id)
            this.films.splice(this.films.map(i => i.id).indexOf(id), 1)
        }
    }
}
</script>
