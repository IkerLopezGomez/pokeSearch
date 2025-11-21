import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", {
    state: () => ({
        favorites: []
    }),
    getters: {
        isFavorite: (state) => (pokemonId) => {
            return state.favorites.includes(pokemonId);
        }
    },
    addFavorite(pokemonId){
        if (!this.favorites.includes(pokemonId)) {
            this.favorites.push(pokemonId);
            console.log(this.favorites);
        }
    },
    removeFavorite(pokemonId){
        if (this.favorites.includes(pokemonId)){
            this.favorites = this.favorites.filter(id => id !== pokemonId);
            console.log(this.favorites);
        }
    },
    
});