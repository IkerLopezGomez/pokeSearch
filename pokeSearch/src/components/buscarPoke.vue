<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { fetchPokemonList } from '../../services/communicationManager.js';

    const pokemons = ref([]);
    async function pokemonList() {
        try {
            const data = await fetchPokemonList(10, 0);
            console.log(data);
            pokemons.value = data;
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }
</script>

<template>
    <h1>Buscar Pokémon</h1>
    <button @click="pokemonList">Cargar Pokémon</button>
    <ul>
        <li v-for="(pokemon, index) in pokemons" :key="index">
            {{ pokemon.name }}
        </li>
    </ul>
</template>

<style scoped>

</style>