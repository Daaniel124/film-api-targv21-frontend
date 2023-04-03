import { createRouter, createWebHistory } from "vue-router"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            components: () => import("../views/filmListView.vue")
        },
        {
            path: "/userTickets/:ticketID",
            name: "userTickets",
            components: () => import("../views/userTicketsView.vue"),
            props: route => {return {ticketID: Number(route.params.ticketID)}}
        },
    ],
})

 export default router