<template>
    <form @submit.prevent="addSession">
        <label>
            Date:
            <input type="date" v-model="session.session_date">
        </label>
        <label>
            Time:
            <input type="time" v-model="session.session_time">
        </label>
        <label>
            Hall:
            <input type="number" v-model="session.hall">
        </label>
        <label>
            Language:
            <input type="text" v-model="session.language">
        </label>
        <label>
            Film:
            <select v-model="session.filmID">
              <option disabled value="0">Choose film</option>
              <option v-for ="film in films" :value="film.id">{{ film.title }}</option>
            </select>
        </label>

        <button type="submit">Add session</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>

export default {
    data() {
        return {
            session: {
                session_date: "",
                session_time: "",
                hall: "",
                language: "",
                filmID: ""
            },
            films: [],
            errors: null
        }
    },
    async created() {
        this.films = await(await fetch("http://localhost:8080/films")).json()
    },
    emits: ["submit"],
    computed: {
        canSubmit() {
            return this.language.length > 0 && this.filmID.length > 0
        }
    },
    methods: {
        addSession() {
            this.errors = null
            const api_url = "http://localhost:8080"
            fetch(api_url + "/sessions", {
                method: "post",
                body: JSON.stringify(this.session),
                headers: { 'Content-type': 'application/json; charset=UTF-8'},
            }).then((response) => { return response.json() })
                .then((data) => {
                    console.log("Add session: ", data)
                    if (data.error) {
                        this.error = data.error
                        throw data.error
                    } else {
                        this.session = { session_date: "", session_time: "", hall: "", language: "", filmID: "" }
                        this.$emit("submit")
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