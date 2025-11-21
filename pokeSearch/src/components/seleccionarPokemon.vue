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
<style scoped>
/* Contenedor principal para centrar y dar espacio */
.list-container {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9; /* Fondo muy claro para el contenedor */
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

/* --- Títulos y Mensajes --- */

h2 {
    color: #36454F; /* Gris oscuro */
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.8em;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
}

p {
    text-align: center;
    margin: 15px 0;
    color: #555;
    font-size: 1.1em;
}

strong {
    color: #4682B4; /* Azul Acero para destacar la búsqueda */
}

/* --- Lista de Resultados (ul) --- */

ul {
    list-style: none; /* Quita los puntos predeterminados */
    padding: 0;
    margin: 20px 0;
}

li {
    /* Estructura de la tarjeta */
    margin: 10px 0;
    padding: 10px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
}

li:hover {
    transform: translateY(-2px); /* Pequeño efecto al pasar el ratón */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: #4682B4; /* Destaca el borde al pasar el ratón */
}

/* --- Enlaces (router-link) --- */

li a {
    text-decoration: none; /* Quita el subrayado del enlace */
    color: #36454F; /* Gris oscuro para el texto del enlace */
    font-size: 1.15em;
    display: block; /* Hace que todo el <li> sea clicable a través del enlace */
    font-weight: 500;
}

li a:hover {
    color: #4682B4; /* Azul Acero al pasar el ratón */
}

/* --- Botón "Volver" (Estilos consistentes con el componente de Búsqueda) --- */

button {
    /* Diseño y tamaño */
    display: block; 
    width: 100%;
    max-width: 200px; /* Limita el ancho del botón */
    padding: 10px 20px;
    margin: 30px auto 0 auto; /* Centra el botón y da espacio arriba */
    
    /* Apariencia */
    background-color: #F08080; /* Rojo claro/coral para la acción de "Volver" */
    color: white;
    font-weight: bold;
    font-size: 1em;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    /* Sombra y transición */
    box-shadow: 0 4px #CD5C5C; /* Sombra más oscura para el rojo */
    transition: all 0.1s ease;
}

button:hover {
    background-color: #FA8072; /* Color más claro al pasar el ratón */
}

button:active {
    /* Efecto de "clic" */
    transform: translateY(4px); 
    box-shadow: 0 0 #CD5C5C; 
}
</style>