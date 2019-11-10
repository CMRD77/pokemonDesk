const pokedex = document.getElementById('pachadex');

const getPokemon = () => {
    const promesas = [];
    for (let i = 1; i <= 20; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promesas.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promesas).then((results) => {
        const pokemon = results.map((result) => ({
            nombre: result.name,
            imagen: result.sprites['front_shiny'],
            altura: result.height,
            peso: result.weight,
            id: result.id,
            habilidades: result.abilities.map((ability)=> ability.ability.name).join(', ')
        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map((poke) =>
    `
        <li class="tarjeta">
            <img class="tarjeta-imagen" src="${poke.imagen}"/>
            <h2 class="tarjeta-titulo">${poke.id}. ${poke.nombre}</h2>
            <p class="tarjeta-subtitulo">Tipo:</p> <p>${poke.tipo}</p>
            <p class="tarjeta-subtitulo">Altura:</p> <p>${poke.altura}</p>
            <p class="tarjeta-subtitulo">Peso:</p> <p>${poke.peso}</p>
            <p class="tarjeta-subtitulo">Habilidades: </p><p>${poke.habilidades}</p>
        </li>
    `
        ).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

getPokemon();