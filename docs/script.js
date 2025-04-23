// Função para ocultar a tela de carregamento
window.addEventListener('load', function () {
  var loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.style.display = 'none';
});

// Evitar que a imagem do perfil seja clicada com o botão direito ou arrastada
var pfpImage = document.getElementsByClassName("pfp");
if (pfpImage.length > 0) {
  pfpImage[0].addEventListener("contextmenu", function (e) {
      e.preventDefault(); 
  });

  pfpImage[0].addEventListener("dragstart", function (e) {
      e.preventDefault();
  });
}

// Função para alternar a visibilidade do menu dropdown
function toggleMenu() {
  var menu = document.getElementById("menu");
  if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
  } else {
      menu.style.display = "none";
  }
}

// Fechar o menu dropdown se o usuário clicar fora dele
window.onclick = function(event) {
  var menu = document.getElementById("menu");
  var button = document.querySelector(".dropdown button");
  if (!event.target.matches(".dropdown button")) {
      if (menu.style.display === "block") {
          menu.style.display = "none";
      }
  }
};

// Função para evitar o comportamento de seleção de texto
document.addEventListener("mousedown", function(event) {
  if (event.target.closest("a")) {
      event.preventDefault();
  }
});
