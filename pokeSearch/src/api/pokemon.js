import axios from 'axios';

const apiPokemon = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/', 
    headers: {'Content-Type': 'application/json' }
})