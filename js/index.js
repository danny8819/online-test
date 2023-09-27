const progressBar = document.getElementById("progress-value")
progressBar.addEventListener("animationend", listener, false);

function listener(e) {
    location.replace('./home.html')
}