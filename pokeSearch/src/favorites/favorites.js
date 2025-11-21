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
    actions: {
        addFavorite(pokemonId){
            if (!this.favorites.includes(pokemonId)) {
                this.favorites.push(pokemonId);
                console.log(this.favorites);
            }
            if (this.favorites.length > 6){
                alert("Solo puedes tener 6 pokemones favoritos");
            }
        },
        removeFavorite(pokemonId){
            if (this.favorites.includes(pokemonId)){
                this.favorites = this.favorites.filter(id => id !== pokemonId);
                console.log(this.favorites);
            }
        },
    }
});