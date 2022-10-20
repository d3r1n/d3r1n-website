import { createRouter, Router, createWebHistory } from "vue-router";
// Import Components
import Home from "../views/Home.vue";
// import About from "../views/About.vue";

const routes: Array<{ name: string, path: string; component: Object }> = [
	{ name: "home", path: "/", component: Home },
	// { name: "about", path: "/about", component: About },
];

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
