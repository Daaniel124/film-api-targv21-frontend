<template>
    <h1>Film title: {{ film.title }}</h1>
    <p>Genre: {{ film.genre }}</p>
    <h3>Duration: {{ film.duration }}</h3>
    <p>Producer: {{ film.producer }}</p>
    <p>Actors: {{ film.actors }}</p>
    <p>Description: {{ film.description }}</p>
</template>
<script>
    export default {
        props: {
            film: Object,
            require: true
        },
        data() {
            return {
                title: this.film.title,
                genre: this.film.genre,
                duration: this.film.duration,
                producer: this.film.producer,
                actors: this.film.actors,
                description: this.film.description
            }
        }
    }
</script>