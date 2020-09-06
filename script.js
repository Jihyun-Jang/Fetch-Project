const form = document.querySelector("form");
const article = document.querySelector("#display");

form.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);

    fetch(`https://pokeapi.co/api/v2/pokemon/${inputData.pokemon_name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            };
            return response.json();
        })
        .then(json => {
            showName(json);
            showPictures(json);
        })
        .catch(console.error);

})

function showName(json) {
    const name = json.forms[0].name;
    let nameH2 = document.createElement("h2");
    nameH2.textContent = name;
    article.appendChild(nameH2);
}

function showPictures(json) {
    const url = json.forms[0].url;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status)
            };
            return response.json();
        })
        .then(json => {
            const picture = json.sprites.front_default;
            let imgTag = document.createElement("img");
            imgTag.src = picture;
            article.appendChild(imgTag);
        })
        .catch(console.error);
}