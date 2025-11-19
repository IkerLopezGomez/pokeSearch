<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { fetchPokemonList } from '../../services/communicationManager.js';
    async function pokemonList() {
        try {
            const data = await fetchPokemonList(50, 0);
            console.log(data);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }
</script>

<template>
    <h1>Buscar Pokémon</h1>
</template>

<style scoped>

</style>