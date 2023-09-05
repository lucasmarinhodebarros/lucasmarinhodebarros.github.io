window.addEventListener('load', function () {
            var loadingScreen = document.querySelector('.loading-screen');
            loadingScreen.style.display = 'none';
        });

var client = {
    init: function() {
        var o = this;

        $("img.pfp").mousedown(function(e){
            e.preventDefault();
        });

        $("img.pfp").on("contextmenu", function(e){
            return false;
        });
    }
};
