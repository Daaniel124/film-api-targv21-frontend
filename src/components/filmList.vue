<template>
    <table>
        <tr>
            <th>Title</th>
            <th></th>
        </tr>
        <tr v-for="film in films" :key="film.id">
            <td>{{ film.title }}</td>
            <td>Link detailidele</td>
        </tr>
    </table>
</template>
<script>
    export default {
        props: {
            films: Array,
            require: true
        }
    }
</script>