<script setup>
    import { ref, onMounted, watch} from 'vue';
    import { useRoute } from 'vue-router';
    import { fetchPokemonDetails } from '../../services/communicationManager.js';

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
        <div v-if="pokemonDetails">
            <p><strong>Número de Pokédex:</strong> #{{ pokemonDetails.id }}</p>
            <p><strong>Generación:</strong> {{ pokemonDetails.generation }}</p>
            <p><strong>Tipo(s):</strong> {{ pokemonDetails.types.toUpperCase() }}</p>
            <p><strong>Altura:</strong> {{ pokemonDetails.height / 10 }} m</p>
            <p><strong>Peso:</strong> {{ pokemonDetails.weight / 10 }} kg</p>
        </div>
</template>

<style scoped>

</style>