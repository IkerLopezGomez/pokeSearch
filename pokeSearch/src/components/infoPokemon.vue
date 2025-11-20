<script setup>
    import { ref, onMounted, watch} from 'vue';
    import { useRoute } from 'vue-router';
    import { fetchPokemonDetails } from '../../services/communicationManager.js';

    const route = useRoute();

    // 1. ELIMINAR variables no utilizadas en este componente (filteredPokemons, etc.)
    // 2. ⭐ DEFINIR la variable reactiva que contendrá los detalles.
    const pokemonDetails = ref(null); 
    const isLoading = ref(false);
    
    // 3. ⭐ CORREGIDO: getGeneration no necesita ser async
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
        return "Desconocida"; // Añadir un valor por defecto
    }

    async function loadPokemonDetails(){
        isLoading.value = true;
        try{
            const data = await fetchPokemonDetails(route.params.name);
            const id = data.id;
            
            // 4. ⭐ CORREGIDO: Eliminar 'await'
            const generation = getGeneration(id); 
            
            const type = data.types.map(t => t.type.name).join(', ');
            
            // 5. ⭐ CORREGIDO: Asignar los datos a la variable reactiva 'pokemonDetails'
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
    
    onMounted(loadPokemonDetails);
    
    // Opcional pero recomendado: si la URL cambia, recarga los detalles
    watch(
      () => route.params.name,
      loadPokemonDetails
    );

</script>
<template>
        <h1>
             {{ pokemonDetails ? pokemonDetails.name.toUpperCase() : 'Cargando...' }}
        </h1>
        <div v-if="pokemonDetails">
            <p><strong>Número de Pokédex:</strong> #{{ pokemonDetails.id }}</p>
            <p><strong>Generación:</strong> {{ pokemonDetails.generation }}</p>
            <p><strong>Tipo(s):</strong> {{ pokemonDetails.types.toUpperCase() }}</p>
        </div>
</template>

<style scoped>

</style>