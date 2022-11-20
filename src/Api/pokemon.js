class Pokemon {
    pokemonList() {
        const res = fetch(`http://localhost:5000/pokemon-list`);
        return res;
    }

    pokemonDetail(name) {
        const res = fetch(`http://localhost:5000/pokemon-detail/${name}`);
        return res;
    }
}

export default Pokemon;