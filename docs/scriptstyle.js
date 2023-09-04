window.addEventListener('load', function () {
            var loadingScreen = document.querySelector('.loading-screen');
            loadingScreen.style.display = 'none';
        });

$('img').mousedown(function (e) {
  if(e.button == 2) { // right click
    return false; // do nothing!
  }
});
