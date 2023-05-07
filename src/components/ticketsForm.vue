<template>
    <form @submit.prevent="addTickets">
        <label>
            First Name:
            <input type="text" v-model="ticket.firstName">
        </label>
        <label>
            Last Name:
            <input type="text" v-model="ticket.lastName">
        </label>
        <label>
            Row:
            <input type="number" v-model="ticket.row">
        </label>
        <label>
            Place Number:
            <input type="number" v-model="ticket.columnNumber">
        </label>
        <label>
            Price:
            <input type="text" v-model="ticket.price">
        </label>
        <label>
            Session:
            <select v-model="ticket.sessionID">
              <option disabled value="0">Choose session</option>
              <option v-for ="session in sessions" :value="session.id">{{ session.session_date + " " + session.session_time + " " + session.filmName }}</option>
            </select>
        </label>

        <button type="submit">Add ticket</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>

export default {
    data() {
        return {
            ticket: {
                firstName: "",
                lastName: "",
                row: "",
                columnNumber: "",
                price: "",
                sessionID: ""
            },
            sessions: [],
            errors: null
        }
    },
    async created() {
        this.sessions = await(await fetch("http://localhost:8080/sessions")).json()
    },
    emits: ["submit"],
    computed: {
        canSubmit() {
            return this.price.length > 0 && this.lastName.length > 0
        }
    },
    methods: {
        addTickets() {
            this.errors = null
            const api_url = "http://localhost:8080"
            fetch(api_url + "/tickets", {
                method: "post",
                body: JSON.stringify(this.ticket),
                headers: { 'Content-type': 'application/json; charset=UTF-8'},
            }).then((response) => { return response.json() })
                .then((data) => {
                    console.log("Add ticket: ", data)
                    if (data.error) {
                        this.error = data.error
                        throw data.error
                    } else {
                        this.ticket = { firstName: "", lastName: "", row: "", columnNumber: "", price: "", sessionID: "" }
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