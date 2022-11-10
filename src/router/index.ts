import { createRouter, Router, createWebHistory } from "vue-router";
// Import Components
import Home from "../views/Home.vue";
import Music from "../views/Music.vue";
import Projects from "../views/Projects.vue";
import Contact from "../views/Contact.vue";

const routes: Array<{ name: string, path: string; component: Object }> = [
	{ name: "home", path: "/", component: Home },
	{ name: "music", path: "/music", component: Music },
	{ name: "projects", path: "/projects", component: Projects },
	{ name: "contact", path: "/contact", component: Contact },
];

const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
