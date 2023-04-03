<template>
    <film-list :films="films" @deleted="removeItem"></film-list>
</template>
<script>
const API_URL = "http://localhost:8080/tickets"
import filmList from "./filmList.vue"

export default {
        components: {
            filmList
        },
        props: {
            ticketID: Number,
            require: true
        },
        data() {
            return{
                films:[],
            }
        },
        created() 
        {
            this.fetchData()
        },
        methods: {
            async fetchData(){
                const url = `${API_URL}/${this.ticketID}`
                //const url = `${API_URL}`
                const userData = await (await fetch(url)).json()
                console.log(userData)
                this.films = userData.Sessions.map(gp => gp.Film)
                console.log(films)
            },
            removeItem(id) {
                this.films.splice(this.films.map(i => i.id).indexOf(id), 1)
            }
        }
    }
</script>
<style>

</style>