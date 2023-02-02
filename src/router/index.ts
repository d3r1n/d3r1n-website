import { createRouter, Router, createWebHistory } from "vue-router";
// Import Components
import Home from "@/views/Home.vue";
import Music from "@/views/Music.vue";
import Projects from "@/views/Projects.vue";
import NotFound from "@/views/NotFound.vue";

interface Route {
	name: string;
	path: string;
	alias?: string[];
	component: any;
}

const routes: Array<Route> = [
	{ name: "home", path: "/", component: Home },
	{ name: "music", path: "/music", component: Music },
	{ name: "projects", path: "/projects", alias: ['/repos'], component: Projects },
	{ name: "not-found", path: "/404", alias:[ "/:pathMatch(.*)*" ], component: NotFound }
];

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
