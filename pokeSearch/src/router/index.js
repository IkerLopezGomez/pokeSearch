import { createRouter, createWebHistory } from "vue-router";
import buscarPoke from "@/components/buscarPoke.vue";
import seleccionarPoke from "@/components/seleccionarPokemon.vue";
import infoPoke from "@/components/infoPokemon.vue";
import gameEngine from "@/components/gameEngine.vue";
import favoritos from "@/components/favoritos.vue";

const routes = [
  { path: "/buscar", component: buscarPoke },
  { path: "/lista", component: seleccionarPoke },
  { path: "/info", component: infoPoke },
  { path: "/game", component: gameEngine },
  { path: "/favoritos", component: favoritos },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
