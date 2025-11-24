<script setup>
import { useFavoritesStore } from "../favorites/favorites.js";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchPokemonDetails } from "../../services/communicationManager.js";

const router = useRouter();
const favoritesStore = useFavoritesStore();
</script>

<template>
  <div>
    <h1>Mi Equipo Pokémon</h1>
    <ul>
      <li v-for="id in favoritesStore.favorites" :key="id">
        <span>{{ id.name }}</span>
      </li>
    </ul>
    <button @click="router.push('/')">Volver a Buscar</button>
  </div>
</template>

<style scoped></style>
