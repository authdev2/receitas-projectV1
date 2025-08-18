let receita = document.querySelector(".receita-destaque-info");
let receitaRight = document.querySelector(".receita-right");

function ModelCard(divModal, recipe) {
  divModal.classList.add("modal-receita");
  divModal.innerHTML = "";
  divModal.innerHTML = `
       <button class="btn-receita-close">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="principal-info">
        <h1>${recipe.nome}</h1>
        <div class="info-receita">
          <span>
            <i class="fa-solid fa-clock"></i>
            ${recipe.minutos} minutos
          </span>
          <span>
            <i class="fa-solid fa-users"></i>
            ${recipe.porcoes} porções
          </span>
          <span>
            <i class="fa-solid fa-users"></i>
            ${recipe.nivelSaudavel}% saudável
          </span>
        </div>
      </div>

      <div class="main-info">
        <div class="left-info">
          <button>Descrição</button>
          <div class="description">
            <p>${recipe.descricao}</p>
          </div>

          <button>Ingredientes</button>
          <div class="ingredients-container">
            <h3>Lista de Ingredientes</h3>
            <ol>
              ${recipe.ingredientes.map(
                (ingredient) => `
                  <li>${ingredient}</li>
              `
              )}
            </ol>
          </div>
          <button>Modo de preparo</button>
          <div class="preparation-container">
            <p>
              ${recipe.modoPreparo}
            </p>
          </div>

          <button>Info adicionais</button>
          <div class="additional-info-container">
            <span>
              <i class="fa-solid fa-clock"></i>
              Preço: $ ${recipe.preco}
            </span>

            <span>
              <i class="fa-solid fa-clock"></i>
              Likes: ${recipe.likes}
            </span>

            <span>
              <i class="fa-solid fa-clock"></i>
              Avaliação: ${
                recipe.avaliacao >= 10
                  ? 10
                  : recipe.avaliacao.toFixed(1)
              }
            </span>
          </div>
        </div>

      </div>
`;
}

function BoxReceitas(div, recipe) {
  div.classList.add("box-receita");
  div.innerHTML = "";
  div.innerHTML = `
  <div class="box-receita-img">
  <img src="${recipe.imagem}" alt="imagem" />
  </div>
  <h1 class="box-receita-title">${recipe.nome.slice(0, 15)}...</h1>
      <div class="box-receita-info">
        <span> <i class="fa-solid fa-clock"></i> ${
          recipe.minutos
        } minutos</span>
      </div>  
      <div class="box-receita-btn">
        <button class="btn-receita" data-id="${recipe.id}" data-nome="${recipe.nome}">
          <i class="fa-solid fa-hand-pointer"></i>
          Ver receita</button>
      </div>
  `;
}

async function SearchReceitas(query) {
  let boxReceitaInfo = document.querySelector(".receita-content");
  let response = await fetch(
    `http://localhost:3000/receitas/searchCompleta/${query}`
  );
  let data = await response.json();
  boxReceitaInfo.innerHTML = "";
  console.log(data);
  data.forEach((recipe) => {
    let div = document.createElement("div");
    div.innerHTML = "";
    BoxReceitas(div, recipe);

    let btnReceita = div.querySelector(".btn-receita");
    btnReceita.addEventListener("click", (e) => {
      let divModal = document.createElement("div");
      let modalReceita = document.querySelector(".modal-receita-container");
      modalReceita.style.display = "block";
      e.preventDefault();
      ModelCard(divModal, recipe);
      modalReceita.appendChild(divModal);
      let btnReceitaClose = divModal.querySelector(".btn-receita-close");
      btnReceitaClose.addEventListener("click", () => {
        modalReceita.style.display = "none";
      });
    });

    boxReceitaInfo.appendChild(div);
  });
}

async function RandomReceitas() {
  let boxReceitaInfo = document.querySelector(".receita-content");
  let response = await fetch(
    `http://localhost:3000/receitas`
  );
  let data = await response.json();
  console.log(data);
  data.forEach((recipe) => {
    let div = document.createElement("div");
    BoxReceitas(div, recipe);

    let btnReceita = div.querySelector(".btn-receita");
    btnReceita.addEventListener("click", (e) => {
      let modalReceita = document.querySelector(".modal-receita-container");
      modalReceita.style.display = "block";
      e.preventDefault();
      let divModal = document.createElement("div");
      ModelCard(divModal, recipe);
      modalReceita.appendChild(divModal);
      let btnReceitaClose = divModal.querySelector(".btn-receita-close");
      btnReceitaClose.addEventListener("click", () => {
        modalReceita.style.display = "none";
      });
    });
    boxReceitaInfo.appendChild(div);
  });
}

fetch(`http://localhost:3000/receitas/random`)
  .then((response) => response.json())
  .then((recipe) => {
      let div = document.createElement("div");
      let img = document.createElement("img");
      div.classList.add("receita-destaque-info");
      img.src = recipe.imagem;
      img.alt = recipe.nome;
      img.classList.add("receita-destaque-img");
      receitaRight.appendChild(img);
      console.log(recipe.imagem)
      div.innerHTML = `
                    <h1>${recipe.nome}</h1>
                    <p>${recipe.descricao.slice(0, 300)}...</p>
                    <div class="receita-destaque-info-box">

                        <div class="box-info">
                            <i class="fa-solid fa-clock"></i>
                            <span>
                                ${recipe.minutos} minutos
                            </span>

                        </div>
                        <div class="box-info">
                            <i class="fa-solid fa-utensils"></i>
                            <span>
                                ${recipe.porcoes} porções
                            </span>
                        </div>
                        <div class="box-info">
                            <i class="fa-solid fa-star"></i>
                            <span>
                                ${recipe.nivelSaudavel}% saudável
                            </span>
                        </div>
                    </div>
        
        `;

      receita.appendChild(div);
    });

let btnReceitaSearch = document.querySelector(".btn-receita-search");
let inputReceitaSearch = document.querySelector(".input-receita-search");
btnReceitaSearch.addEventListener("click", () => {
  SearchReceitas(inputReceitaSearch.value);
});

RandomReceitas();

document.addEventListener("DOMContentLoaded", function () {
  const colaborados = document.querySelectorAll(".colaborado");

  colaborados.forEach((colaborado, index) => {
    colaborado.style.opacity = "0";
    colaborado.style.transform = "translateY(30px)";

    setTimeout(() => {
      colaborado.style.transition = "all 0.6s ease";
      colaborado.style.opacity = "1";
      colaborado.style.transform = "translateY(0)";
    }, index * 200);
  });

  colaborados.forEach((colaborado) => {
    colaborado.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });

    colaborado.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
    });

    colaborado.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

const menuMobile = document.getElementById("menu-mobile");
menuMobile.addEventListener("click", () => {
  const menuBlock = document.querySelector(".lins-mobile");

  menuBlock.classList.toggle("active-mobile");
  let dja = document.querySelector("#menu-mobile i");
  if (dja.classList.contains("fa-bars")) {
    dja.classList.remove("fa-bars");
    dja.classList.add("fa-xmark");
  } else {
    dja.classList.remove("fa-xmark");
    dja.classList.add("fa-bars");
  }
});