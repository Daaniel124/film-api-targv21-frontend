<template>
    <form @submit.prevent="addFilm">
        <label>
            Title:
            <input type="text" v-model="film.title">
        </label>
        <label>
            Genre:
            <input type="text" v-model="film.genre">
        </label>
        <label>
            Duration:
            <input type="time" v-model="film.duration">
        </label>
        <label>
            Producer:
            <input type="text" v-model="film.producer">
        </label>
        <label>
            Actors:
            <input type="text" v-model="film.actors">
        </label>
        <label>
            Description:
            <input type="text" v-model="film.description">
        </label>

        <button type="submit" @click="addFilm">Add film</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>

export default {
    data() {
        return {
            film: {
                title: "",
                genre: "",
                duration: "",
                producer: "",
                actors: "",
                description: ""
            }
        }
    },
    computed: {
        canSubmit() {
            return this.title.length > 0 && this.genre.length > 0
        }
    },
    methods: {
        addFilm() {
            const api_url = import.meta.env.VITE_API_URL
            fetch(api_url + "/films", {
                method: "post",
                body: JSON.stringify(this.film),
                headers: { 'Content-type': 'application/json; charset=UTF-8', }
            }).then((response) => { return response.json() })
                .then((data) => {
                    console.log("Add film: ", data)
                    if (data.error) {
                        this.error = data.error
                        throw data.error
                    } else {
                        this.film = { title: "", genre: "", duration: "", producer: "", actors: "", description: "" }
                    }
                })
                .catch(error => console.error("Error: ", error))
        }
    }
}
</script>
<style>
select,
input,
button {
    display: block;
    margin: 0.5em 0;
    font-size: 15px;
}

input[disabled] {
    color: #999;
}

p {
    color: red;
}
</style>