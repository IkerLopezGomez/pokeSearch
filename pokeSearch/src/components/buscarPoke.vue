<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { fetchPokemonList } from '../../services/communicationManager.js';
    async function pokemonList() {
        try {
            const data = await fetchPokemonList(10, 0);
            console.log(data);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }
</script>

<template>
    <h1>Buscar Pokémon</h1>
    <button @click="pokemonList">Cargar Pokémon</button>
    <ul>
        <li v-for="pokemon in pokemons" :key="pokemon.id">{{ pokemon.name }}</li>
    </ul>
</template>

<style scoped>

</style>