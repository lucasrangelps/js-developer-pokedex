const pokemonDetail = document.getElementById('pokemonDetail');
const loadDetail = document.getElementById('loadDetail');
const loadMore = document.getElementById('loadMore')


const maxRecords1 = 150
const limit1 = 50
let offset1 = 0;

function goback() {
    window.history.back()
}

function convertPokemonDetail(pokemon) {
    return `
    <section id="pokemondetail" class="contentdetail ${pokemon.type}">
    <a href="index.html"> 
        <img class="backpokemons" src="https://cdn-icons-png.flaticon.com/512/1280/1280115.png">
    </a>
    <div class="coluna-1">
        <li class="pokemonpage ${pokemon.type}">
        
        <span class="namepage">${pokemon.name}</span> 
        <span class="numberpage">#00${pokemon.number}</span>
    
        
        <div class="detailpage">
        <ol class="typespage">
            ${pokemon.types.map((type) => `<li class="typepage ${type}">${type}</li>`).join('')}
            
        </ol>
        </div>
        <div class="imgpage">
        <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </div>

    <div class="coluna-2">    
        <div class="linha">
            <div class="coluna-50"><a href="#">About</a>
            <hr>
            <span class="infoname">Heigth: </span><strong>  ${pokemon.height}cm</strong><br>
            <span class="infoname">Weight: </span><strong>  ${pokemon.weight.toFixed(2)/10}Kg</strong><br>
            <span class="infoname">Abilities: </span><strong> ${pokemon.abilities}</strong>
            </div>
            <div class="coluna-51"><a href="#">Base Stats</a></div>
            <div class="coluna-52"><a href="#">Evolution</a></div>
            <div class="coluna-53"><a href="#">Moves</a></div>
            
        </div>
            
    </div>
  
    </li>
    </section>
            `
}

function loadPokemonDetail(id) {
    
    pokeApi.getPokemons(id-1, 1).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonDetail).join('');
        pokemonDetail.innerHTML += newHtml;
    })

    
    pokemonList.style.display = "none"
    loadMoreButton.style.display = "none"
}
loadPokemonDetail();
pokemonDetail.addEventListener('click', () => {
    loadPokemonDetail();
})

loadMore.addEventListener('click', () => {
    offset1 += limit1
    const qtdRecordsWithNexPage = offset1 + limit1

    if (qtdRecordsWithNexPage >= maxRecords1) {
        const newLimit = maxRecords1 - offset1
        loadPokemonDetail(offset1, newLimit)

        
    } else {
        loadPokemonDetail(offset1, limit1)
    }
})

