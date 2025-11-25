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

<style scoped>
div {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f2f2f2;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  font-size: 18px;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  border: none;
  background-color: #4CAF50;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

</style>
