const apiKey = "2eabe7358cbf40fb9b8fbbf1457849c6";

let receita = document.querySelector(".receita-destaque-info");
let receitaRight = document.querySelector(".receita-right");
fetch(`h1ttps://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
  .then((response) => response.json())
  .then((data) => {
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
                    <button>Ver receitas</button>
        
        `;

      receita.appendChild(div);
    });
  })
  .catch((error) => {
    console.error("Erro ao buscar receitas:", error.message);
  });

  let btnReceitaSearch = document.querySelector(".btn-receita-search");
  let inputReceitaSearch = document.querySelector(".input-receita-search");
  btnReceitaSearch.addEventListener("click", () => {
    SearchReceitas(inputReceitaSearch.value);
  })

  function SearchReceitas(query){
    let boxReceitaInfo = document.querySelector(".receita-content");
    boxReceitaInfo.innerHTML = "";
    fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`)
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
           <span>
            ${recipe.readyInMinutes} minutos
           </span>
           <span>
            ${recipe.servings} porções
           </span>
           <span>
            ${recipe.healthScore}% saudável
           </span>
           <button class="btn-receita">Ver receita</button>
          </div>
        `;
        boxReceitaInfo.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar receitas:", error.message);
    });
  }

  function RandomReceitas(){
    let boxReceitaInfo = document.querySelector(".receita-content");
    fetch(`1https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      data.recipes.forEach((recipe) => {
        let div = document.createElement("div");
        div.classList.add("box-receita");
        div.innerHTML = `
          <h1>${recipe.title}</h1>
          <div class="box-receita-img">
            <img src="${recipe.image}" alt="">
          </div>
          <div class="box-receita-info">
           <span>
            ${recipe.readyInMinutes} minutos
           </span>
           <span>
            ${recipe.servings} porções
           </span>
           <span>
            ${recipe.healthScore}% saudável
           </span>
           <button class="btn-receita">Ver receita</button>
          </div>
        `;
        boxReceitaInfo.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar receitas:", error.message);
    });
  }

  RandomReceitas();