<script setup>
    import { ref, onMounted, watch} from 'vue';
    import { useRoute } from 'vue-router';
    import { fetchPokemonDetails } from '../../services/communicationManager.js';
    import { useFavoritesStore } from '../favorites/favorites.js';

    const store = useFavoritesStore();

    const route = useRoute();

    const pokemonDetails = ref(null); 
    const isLoading = ref(false);
    
    function getGeneration(id){
        if (id <= 151){
            return "I";
        }
        if (id <= 251){
            return "II";
        }
        if (id <= 386){
            return "III";
        }
        if (id <= 493){
            return "IV";
        }
        if (id <= 649){
            return "V";
        }
        if (id <= 721){
            return "VI";
        }
        if (id <= 809){
            return "VII";
        }
        if (id <= 905){
            return "VIII";
        }
        return "Desconocida"; 
    }

    async function loadPokemonDetails(){
        isLoading.value = true;
        try{
            const data = await fetchPokemonDetails(route.params.name);
            const id = data.id;
            const generation = getGeneration(id); 
            
            const type = data.types.map(t => t.type.name).join(', ');
            pokemonDetails.value = {
                id: data.id,
                name: data.name,
                height: data.height,
                weight: data.weight,
                types: type,
                generation: generation
            }
            console.log(pokemonDetails.value);

        } catch (error) {
            console.error("Error al cargar los detalles del Pokémon:", error);
        } finally {
            isLoading.value = false;
        }
    }

    async function addToFavorites(){
        if (pokemonDetails.value) {
            await store.addFavorite(pokemonDetails.value);
        }
    }
    
    onMounted(loadPokemonDetails);
    watch(
      () => route.params.name,
      loadPokemonDetails
    );

</script>
<template>
        <h1>
             {{ pokemonDetails ? pokemonDetails.name.toUpperCase() : 'Cargando...' }}
        </h1>
        <div v-if="pokemonDetails" class="pokemon-card">
            <p><strong>Número de Pokédex:</strong> #{{ pokemonDetails.id }}</p>
            <p><strong>Generación:</strong> {{ pokemonDetails.generation }}</p>
            <p><strong>Tipo(s):</strong> {{ pokemonDetails.types.toUpperCase() }}</p>
            <p><strong>Altura:</strong> {{ pokemonDetails.height / 10 }} m</p>
            <p><strong>Peso:</strong> {{ pokemonDetails.weight / 10 }} kg</p>
            <button @click="$router.back()">Volver</button>
            <button @click="addToFavorites()">Añadir a Favoritos</button>
        </div>
</template>

<style scoped>
/* Contenedor principal para centrar y dar espacio */
h1 {
    color: #36454F; /* Gris oscuro para el encabezado */
    text-align: center;
    margin-bottom: 30px;
}

.pokemon-card {
    /* Estructura de la tarjeta */
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    transition: transform 0.2s;
}

.pokemon-card:hover {
    transform: translateY(-3px); /* Pequeño efecto al pasar el ratón */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Estilo para los detalles del texto */
.pokemon-card p {
    margin: 8px 0;
    padding: 5px 10px;
    border-left: 4px solid #F08080; /* Color distintivo (rojo claro) */
    background-color: #F8F8F8; /* Fondo ligero para la línea */
    font-size: 1.1em;
}

/* Estilo específico para las etiquetas fuertes (strong) */
.pokemon-card strong {
    color: #4682B4; /* Azul acero para las etiquetas (e.g., "Número de Pokédex:") */
    font-weight: 600;
}
button {
    /* Diseño y tamaño */
    display: inline-block;
    padding: 10px 20px;
    margin: auto; 
    width: auto;
    
    /* Apariencia */
    background-color: #4682B4; /* Azul Acero (color primario) */
    color: white;
    font-weight: bold;
    font-size: 1em;
    text-align: center;
    text-decoration: none; 
    border: none;
    border-radius: 8px;
    cursor: pointer;
    
    /* Sombra y transición */
    box-shadow: 0 4px #2F4F4F; 
    transition: all 0.1s ease;
}

button:hover {
    background-color: #5B9BD5; 
}

button:active {
    /* Efecto de "clic" */
    transform: translateY(4px); 
    box-shadow: 0 0 #2F4F4F; 
}
</style>