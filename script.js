const apiKey = "2eabe7358cbf40fb9b8fbbf1457849c6";

let receita = document.querySelector(".receita-destaque-info");
let receitaRight = document.querySelector(".receita-right");

function ModelCard(divModal, recipe){
  divModal.classList.add("modal-receita");
  divModal.innerHTML = `
       <button class="btn-receita-close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="principal-info">
        <h1>${recipe.title}</h1>
        <div class="info-receita">
          <span>
            <i class="fa-solid fa-clock"></i>
            ${recipe.readyInMinutes} minutos
          </span>
          <span>
            <i class="fa-solid fa-users"></i>
            ${recipe.servings} porções
          </span>
          <span>
            <i class="fa-solid fa-users"></i>
            ${recipe.healthScore}% saudável
          </span>
        </div>
      </div>

      <div class="main-info">
        <div class="left-info">
          <button>Descrição</button>
          <div class="description">
            <p>${recipe.summary}</p>
          </div>

          <button>Ingredientes</button>
          <div class="ingredients-container">
            ${recipe.extendedIngredients.map(
              (ingredient) => `
              <span>
                ${ingredient.original}
              </span>
            `
            )}
          </div>
          <button>Modo de preparo</button>
          <div class="preparation-container">
            <p>
              ${recipe.instructions}
            </p>
          </div>

          <button>Info adicionais</button>
          <div class="additional-info-container">
            <span>
              <i class="fa-solid fa-clock"></i>
              Preço: $ ${recipe.pricePerServing}
            </span>

            <span>
              <i class="fa-solid fa-clock"></i>
              Likes: ${recipe.aggregateLikes}
            </span>

            <span>
              <i class="fa-solid fa-clock"></i>
              Avaliação: ${recipe.spoonacularScore >= 10 ? 10 : recipe.spoonacularScore.toFixed(1)}
            </span>
          </div>
        </div>
        <div class="right-info">
          <img src="${recipe.image}" alt="">
          </div>
      </div>
`;
}

fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.recipes.forEach((recipe) => {
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
        
        `;

      receita.appendChild(div);
    });
  });

let btnReceitaSearch = document.querySelector(".btn-receita-search");
let inputReceitaSearch = document.querySelector(".input-receita-search");
btnReceitaSearch.addEventListener("click", () => {
  SearchReceitas(inputReceitaSearch.value);
});

function SearchReceitas(query) {
  let boxReceitaInfo = document.querySelector(".receita-content");
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.results.forEach((recipe) => {
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
          let id = e.target.dataset.id;
          console.log(id);
          fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
          )
            .then((response) => response.json())
            .then((recipe) => {
              let divModal = document.createElement("div");
              ModelCard(divModal, recipe)
              modalReceita.appendChild(divModal);
              let btnReceitaClose = divModal.querySelector(".btn-receita-close");
              btnReceitaClose.addEventListener("click", () => {
                modalReceita.style.display = "none";
              });
            });
        });

        boxReceitaInfo.appendChild(div);
      });
    });
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
          let divModal = document.createElement("div");
          ModelCard(divModal, recipe)
          modalReceita.appendChild(divModal);
          let btnReceitaClose = divModal.querySelector(".btn-receita-close");
          btnReceitaClose.addEventListener("click", () => {
            modalReceita.style.display = "none";
          });
        });
        boxReceitaInfo.appendChild(div);
      });
    });
}

RandomReceitas();