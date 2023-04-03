<template>
    <film-list :films="films" @deleted="removeItem"></film-list>
</template>
<script>
const API_URL = "http://localhost:8080/tickets"
import filmList from "../components/filmList.vue"

export default {
        components: {
            filmList
        },
        props: {
            ticketID: Number,
            require: true
        }
    }
</script>
<style>

</style>