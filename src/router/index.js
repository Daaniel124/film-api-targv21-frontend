import { createRouter, createWebHistory } from "vue-router"
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),

    routes: [
        {
            path: "/",
            name:"Home",
            component: () => import("../views/filmListView.vue"),
        },
        {
            path: "/sessions",
            name: "sessions",
            component: () => import("../views/sessionsView.vue"),
        },
        {
            path: "/tickets",
            name: "userTickets",
            component: () => import("../views/ticketsView.vue"),
        },
        /*{
            path: "/userTickets/:ticketID",
            name: "userTickets",
            components: () => import("../views/userTicketsView.vue"),
            props: route => {return {ticketID: Number(route.params.ticketID)}}
        },*/
        {
            path: "/poster",
            name: "filmPoster",
            component: () => import("../views/filmPosterView.vue"),
        },
        {
            path: "/usersessions",
            name: "userSessions",
            component: () => import("../views/userSessionsView.vue"),
        },
    ],
})

 export default router