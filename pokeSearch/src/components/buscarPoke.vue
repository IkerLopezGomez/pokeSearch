<script setup>
import { ref, computed, onMounted } from "vue";
import { fetchPokemonList } from "../../services/communicationManager.js";

// Estado para la lógica de búsqueda
const allPokemons = ref([]); // Lista completa (base de datos)
const searchTerm = ref(""); // Valor del input (lo que el usuario escribe)
const displayedSearchTerm = ref(""); // Valor usado para el filtro (solo cambia al pulsar botón)

// ✅ NUEVO: Flag para saber si se ha buscado alguna vez
const hasSearched = ref(false);

const isLoading = ref(false);

// --- Lógica de Carga Base ---
async function loadAllPokemons() {
  isLoading.value = true;
  try {
    // Carga una lista grande (ej. los primeros 151)
    const data = await fetchPokemonList(151);
    allPokemons.value = data;
  } catch (error) {
    console.error("Error al cargar la lista base de Pokémon:", error);
  } finally {
    isLoading.value = false;
  }
}

// --- Lógica del Botón ---
function startSearch() {
  // 1. Copia el valor del input para activar el filtro
  displayedSearchTerm.value = searchTerm.value;

  // 2. ✅ ACTIVA EL FLAG: Indica que la búsqueda ya ha ocurrido
  hasSearched.value = true;
}

// --- Propiedad Computada (Filtro) ---
const filteredPokemons = computed(() => {
  const searchLower = displayedSearchTerm.value.toLowerCase();

  // Si el término de búsqueda está vacío (y ya se buscó), muestra la lista completa
  if (!searchLower) {
    return allPokemons.value;
  }

  // Filtra la lista base según el término
  return allPokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchLower);
  });
});

// Carga la lista base al montar el componente (permanece oculta)
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

  <button @click="startSearch" :disabled="isLoading">
    {{ isLoading ? "Cargando base de datos..." : "Buscar Pokémon" }}
  </button>

  <p v-if="isLoading">Cargando base de datos de Pokémon (oculto)...</p>

  <div v-else-if="hasSearched">
    <div v-if="filteredPokemons.length === 0">
      <p>
        No se encontraron Pokémon que coincidan con "{{ displayedSearchTerm }}"
      </p>
    </div>

    <ul v-else>
      <li v-for="(pokemon, index) in filteredPokemons" :key="index">
        {{ pokemon.name.toUpperCase() }}
      </li>
    </ul>
  </div>

  <div v-else>
    <p>Escribe un término y haz clic en "Buscar Pokémon".</p>
  </div>
</template>

<style scoped>
/* Tu estilo */
</style>
