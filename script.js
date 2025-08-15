const apiKey = "82919da47cf14f958f71c1d74867670e";

let receita = document.querySelector(".receita-destaque-info");
let receitaRight = document.querySelector(".receita-right");
fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((recipe) => {
      let div = document.createElement("div");
      let img = document.createElement("img");
      div.classList.add("receita-destaque-info");
      img.src = recipe.image;
      img.alt = recipe.title;
      img.classList.add("receita-destaque-img");
      receitaRight.appendChild(img);
      div.innerHTML = `
        
                    <h1>${recipe.title}</h1>
                    <p>${recipe.summary.slice(0, 300)}...</p>
                    <div class="receita-destaque-info-box">

                      <div class="box-info">
                          <i class="fa-solid fa-clock"></i>
                          <span>
                              ${recipe.readyInMinutes} minutos
                          </span>

                      </div>
                      <div class="box-info">
                          <i class="fa-solid fa-utensils"></i>
                          <span>
                              ${recipe.servings} porções
                          </span>
                      </div>
                      <div class="box-info">
                          <i class="fa-solid fa-star"></i>
                          <span>
                              ${recipe.healthScore}% saudável
                          </span>
                      </div>
                    </div>
                    <button>Ver receitas</button>
        
        `;

      receita.appendChild(div);
    });
  })

let btnReceitaSearch = document.querySelector(".btn-receita-search");
let inputReceitaSearch = document.querySelector(".input-receita-search");
btnReceitaSearch.addEventListener("click", () => {
  SearchReceitas(inputReceitaSearch.value);
});

function SearchReceitas(query) {
  let boxReceitaInfo = document.querySelector(".receita-content");
  boxReceitaInfo.innerHTML = "";
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((recipe) => {
        let div = document.createElement("div");
        div.classList.add("box-receita");
        div.innerHTML = `
          <h1>${recipe.title}</h1>
          <div class="box-receita-img">
            <img src="${recipe.image}" alt="">
          </div>
          <div class="box-receita-info">

           <button class="btn-receita">Ver receita</button>
          </div>
        `;
        boxReceitaInfo.appendChild(div);
      });
    })
}

function RandomReceitas() {
  let boxReceitaInfo = document.querySelector(".receita-content");
  fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      data.recipes.forEach((recipe) => {
        let div = document.createElement("div");
        div.classList.add("box-receita");
        div.innerHTML = `
        <div class="box-receita-img">
        <img src="${recipe.image}" alt="imagem" />
        </div>
        <h1 class="box-receita-title">${recipe.title.slice(0, 15)}...</h1>
            <div class="box-receita-info">
              <span> <i class="fa-solid fa-clock"></i> ${
                recipe.readyInMinutes
              } minutos</span>
            </div>  
            <div class="box-receita-btn">
              <button class="btn-receita" data-id="${recipe.id}">
                <i class="fa-solid fa-hand-pointer"></i>
                Ver receita</button>
              <button class="btn-receita-favoritar">
                <i class="fa-solid fa-heart"></i>
              </button>
            </div>
        `;

        let btnReceita = div.querySelector(".btn-receita");
        btnReceita.addEventListener("click", (e) => {
          let modalReceita = document.querySelector(".modal-receita-container");
          modalReceita.style.display = "block";
          e.preventDefault();
          // let id = e.target.dataset.id;
          // console.log(id);
          let divModal = document.createElement("div");
          divModal.classList.add("modal-receita");
          divModal.innerHTML = `
          <button class="btn-receita-close">
            <i class="fa-solid fa-xmark"></i>
          </button>
            <h1>${recipe.title}</h1>
            <p>${recipe.summary}</p>
          `;
          modalReceita.appendChild(divModal);
          let btnReceitaClose = divModal.querySelector(".btn-receita-close");
          btnReceitaClose.addEventListener("click", () => {
            modalReceita.style.display = "none";
          });
        });

        boxReceitaInfo.appendChild(div);

      });
    })
}

RandomReceitas();
