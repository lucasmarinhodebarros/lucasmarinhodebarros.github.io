window.addEventListener('load', function () {
            var loadingScreen = document.querySelector('.loading-screen');
            loadingScreen.style.display = 'none';
        });

var pfpImage = document.getElementsByClassName("pfp");

        pfpImage.addEventListener("contextmenu", function (e) {
            e.preventDefault(); 
        });

        pfpImage.addEventListener("dragstart", function (e) {
            e.preventDefault();
        });
