<template>
    <!--<film-view :film="film"></film-view>-->
    <film-list :films="films"></film-list>
</template>
<script>
const API_URL = "http://localhost:8080/films"

import filmView from "./components/filmDetails.vue"
import filmList from "./components/filmList.vue"
import Modal from './components/Modal.vue'
export default {
    components:{
        //filmView,
        filmList,
        Modal
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
            films: [],
            showModal: false
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
