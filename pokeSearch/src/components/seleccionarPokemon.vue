<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { fetchPokemonList } from "../../services/communicationManager.js";
import { useRoute } from "vue-router"; 

const route = useRoute();

const allPokemons = ref([]); 
const filteredPokemons = ref([]); 
const isLoading = ref(false);
const currentQuery = ref(''); 

async function loadAllPokemons() {
  isLoading.value = true;
  try {
    const data = await fetchPokemonList(905);
    allPokemons.value = data;
    applyFilter(route.query.q || '');
  } catch (error) {
    console.error("Error al cargar la lista base de Pokémon:", error);
  } finally {
    isLoading.value = false;
  }
}

function applyFilter(query) {
  currentQuery.value = query || '';
  const searchLower = currentQuery.value.toLowerCase();

  if (!searchLower) {
    filteredPokemons.value = allPokemons.value;
  } else {
    filteredPokemons.value = allPokemons.value.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(searchLower);
    });
  }
}

onMounted(loadAllPokemons);
watch(
  () => route.query.q,
  (newQuery) => {
    applyFilter(newQuery || '');
  },
  { immediate: true } 
);
</script>

<template>
  <h2>Resultados de Búsqueda</h2>
  
  <p v-if="isLoading">Cargando datos...</p>
  
  <div v-else>
    <p v-if="currentQuery">Mostrando resultados para: <strong>{{ currentQuery }}</strong></p>
    <p v-else>Mostrando todos los {{ filteredPokemons.length }} Pokémon.</p>

    <div v-if="filteredPokemons.length === 0">
      <p>No se encontraron Pokémon.</p>
    </div>

    <ul v-else>
      <li v-for="(pokemon, index) in filteredPokemons" :key="index">
        <router-link :to="`/pokemon/${pokemon.name}`">
          {{ index + 1 }}. {{ pokemon.name.toUpperCase() }}
        </router-link>
      </li>
    </ul>
  </div>
  <button @click="$router.back()">Volver</button>
</template>