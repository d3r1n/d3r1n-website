import VueRouter from "vue-router";
// Import Components
import Home from "../views/Home.vue";

const routes: Array<{ path: string; component: Object }> = [
	{ path: "/", component: Home },
];

const router: VueRouter.Router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	routes,
});

export default router;
