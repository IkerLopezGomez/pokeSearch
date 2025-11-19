import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

//funciones 

export async function fetchPokemonList(limit = 151) {
    try {
        const response = await api.get(`pokemon?limit=${limit}`);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching Pokémon list:", error);
        throw error;
    }
};
export async function fetchPokemonDetails(pokemonName) {
    try {
        const response = await api.get(`pokemon/${pokemonName}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for ${pokemonName}:`, error);
        throw error;
    }
};

export default {
    fetchPokemonList,
    fetchPokemonDetails
};