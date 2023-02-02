import { createRouter, Router, createWebHistory } from "vue-router";
// Import Components
import Home from "@/views/Home.vue";
import Music from "@/views/Music.vue";
import Projects from "@/views/Projects.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<{ name?: string, path: string; alias?: string[]; component: Object }> = [
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
