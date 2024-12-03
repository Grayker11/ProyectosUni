async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const pokemonInfoDiv = document.getElementById('pokemonInfo');
    pokemonInfoDiv.innerHTML = '<p>Cargando...</p>';

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const pokemonData = await response.json();
        pokemonInfoDiv.innerHTML = `
            <h2>${pokemonData.name.toUpperCase()}</h2>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
            <p><strong>ID:</strong> ${pokemonData.id}</p>
            <p><strong>Tipo:</strong> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
            <p><strong>Altura:</strong> ${pokemonData.height / 10} m</p>
            <p><strong>Peso:</strong> ${pokemonData.weight / 10} kg</p>
        `;
    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}
