


let sprite = document.getElementById(`sprite`);
const searchBar = document.getElementById(`searchBar`);
const fetchBtn = document.getElementById(`fetchBtn`);

const url = `https://pokeapi.co/api/v2/pokemon/`;



fetchBtn.addEventListener(`click`,() => {
    let pokemon = searchBar.value;



    async function getData(){
    const object = await fetch(url + pokemon);
    const data = await object.json();
    console.log(data.sprites.front_default);
    sprite.src = data.sprites.front_default;
    
}
getData();

});


