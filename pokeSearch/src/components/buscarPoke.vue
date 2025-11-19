<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchPokemonList } from "../../services/communicationManager.js";
import { useRouter } from "vue-router";

const router = useRouter();

const allPokemons = ref([]); 
const searchTerm = ref(""); 
const displayedSearchTerm = ref(""); 

const hasSearched = ref(false);
const isLoading = ref(false);

async function loadAllPokemons() {
  isLoading.value = true;
  try {

    const data = await fetchPokemonList(151);
    allPokemons.value = data;
  } catch (error) {
    console.error("Error al cargar la lista base de Pokémon:", error);
  } finally {
    isLoading.value = false;
  }
}

function startSearch() {
  displayedSearchTerm.value = searchTerm.value;
  hasSearched.value = true;
}
const filteredPokemons = computed(() => {
  const searchLower = displayedSearchTerm.value.toLowerCase();

  if (!searchLower) {
    return allPokemons.value;
  }

  return allPokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchLower);
  });
});

onMounted(loadAllPokemons);
</script>

<template>
  <h1>Buscar Pokémon</h1>

  <input
    type="text"
    v-model="searchTerm"
    placeholder="Escribe el nombre de un Pokémon..."
    :disabled="isLoading"
  />

  <button @click="router.push('/lista')" :disabled="isLoading">
    {{ isLoading ? "Cargando base de datos..." : "Buscar Pokémon" }}
  </button>



    <ul v-if="hasSearched">
      <li v-for="(pokemon, index) in filteredPokemons" :key="index">
        {{ pokemon.name.toUpperCase() }}
      </li>
    </ul>
</template>

<style scoped>
/* Tu estilo */
</style>
