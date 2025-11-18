import { createRouter, createWebHistory } from 'vue-router';
import buscarPoke from '@/components/buscarPoke.vue';
import seleccionarPoke from '@/components/seleccionarPokemon.vue';
import infoPoke from '@/components/infoPokemon.vue';

const routes = [
    { path: '/buscar', component: buscarPoke },
    { path: '/seleccionar', component: seleccionarPoke },
    { path: '/info', component: infoPoke }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;