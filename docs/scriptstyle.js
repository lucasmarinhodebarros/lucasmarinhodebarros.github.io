function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "none" || menu.style.display === "") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  }
  
  window.onclick = function(event) {
    var menu = document.getElementById("menu");
    var button = document.querySelector(".dropdown button");
    if (!event.target.matches(".dropdown button")) {
      if (menu.style.display === "block") {
        menu.style.display = "none";
      }
    }
  }

window.addEventListener('load', function () {
            var loadingScreen = document.querySelector('.loading-screen');
            loadingScreen.style.display = 'none';
        });
