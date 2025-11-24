<script setup>
import { ref, onMounted } from "vue";
import { fetchPokemonDetails, fetchPokemonList } from "../../services/communicationManager.js";
import { useRouter } from "vue-router";
import { useFavoritesStore } from "../favorites/favorites.js";

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

const favoritesStore = useFavoritesStore();

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
  <button @click="router.push('/favoritos')">
    Ver Favoritos
  </button>
</template>
<style scoped>
/* Contenedor principal para centrar y dar espacio */
.pokemon-search-container {
    max-width: 500px;
    margin: 40px auto; /* Centra y da espacio */
    padding: 20px;
    text-align: center; /* Centra los elementos de línea/bloque */
}

/* Encabezado */
h1 {
    color: #36454F; /* Gris oscuro */
    text-align: center;
    margin-bottom: 30px;
    font-size: 2em;
}

/* Campo de entrada de texto (Input) */
input[type="text"] {
    /* Tamaño y espacio */
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 20px;
    box-sizing: border-box; /* Asegura que padding y border no aumenten el ancho total */
    
    /* Apariencia */
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 1.1em;
    color: #333;
    transition: border-color 0.2s, box-shadow 0.2s;
}

input[type="text"]:focus {
    border-color: #4682B4; /* Azul Acero al enfocar */
    outline: none; /* Quita el borde de enfoque predeterminado del navegador */
    box-shadow: 0 0 5px rgba(70, 130, 180, 0.5);
}

/* Botón (Mismos estilos que tu referencia) */
button {
    /* Diseño y tamaño */
    display: block; /* Para que ocupe todo el ancho o se pueda centrar si se desea */
    width: 100%; /* Opcional: Ancho completo */
    max-width: 300px; /* Limita el ancho del botón */
    padding: 12px 25px;
    margin: 0 auto; /* Centra el botón si es de ancho limitado */
    
    /* Apariencia */
    background-color: #4682B4; /* Azul Acero (color primario) */
    color: white;
    font-weight: bold;
    font-size: 1.1em;
    text-align: center;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    /* Sombra y transición */
    box-shadow: 0 4px #2F4F4F; /* Gris oscuro para la sombra */
    transition: all 0.1s ease;
}

button:hover:not(:disabled) {
    background-color: #5B9BD5; /* Azul más claro al pasar el ratón */
}

button:active:not(:disabled) {
    /* Efecto de "clic" */
    transform: translateY(4px); 
    box-shadow: 0 0 #2F4F4F; 
}

/* Estilo para el estado deshabilitado */
button:disabled {
    background-color: #A9A9A9; /* Gris oscuro para deshabilitado */
    cursor: not-allowed;
    box-shadow: 0 4px #808080;
}
</style>