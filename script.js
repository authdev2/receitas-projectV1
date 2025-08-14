const apiKey = "1cb880b0e01b44c0a9f8799e352301e27";

let receita = document.querySelector(".receita-destaque-info");
let receitaRight = document.querySelector(".receita-right");
fetch(`https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`)
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
