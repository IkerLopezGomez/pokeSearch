<script setup>
import { ref, onMounted } from "vue";
import { fetchPokemonList } from "../../services/communicationManager.js";
import { useRouter } from "vue-router";

const router = useRouter();
const searchTerm = ref("");
const isLoading = ref(false);
function goToPokemonList() {
  if (isLoading.value) return;
  router.push({
    path: "/lista",
    query: { q: searchTerm.value },
  });
}

onMounted(async () => {
});
</script>

<template>
  <h1>Buscar Pokémon</h1>

  <input
    type="text"
    v-model="searchTerm"
    placeholder="Escribe el nombre de un Pokémon..."
    :disabled="isLoading"
  />

  <button @click="goToPokemonList" :disabled="isLoading">
    {{ isLoading ? "Cargando..." : "Buscar Pokémon" }}
  </button>
</template>
