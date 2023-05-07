<template>
    <div>
        <p>Date: {{ currentSession.session_date }}</p>
        <p>Time: {{ currentSession.session_time }}</p>
        <p>Hall: {{ currentSession.hall }}</p>
        <p>Language: {{ currentSession.language }}</p>
    </div>
</template>
<script>
const API_URL = "http://localhost:8080/sessions"
import useDateFormating from "../composables/useDateFormating.js"
export default {
    props: {
        session: Object,
        require: true
    },
    data() {
        return {
            currentSession: { session_date: "", session_time: "", hall: "", language: ""}
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentSession = await (await fetch(url + "/" + this.session.id)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>