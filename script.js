function togglePlay() {
    var playIcon = document.getElementById("playIcon");
    var pauseIcon = document.getElementById("pauseIcon");

    if (playIcon.style.display === "none") {
        playIcon.style.display = "inline";
        pauseIcon.style.display = "none";
        // Add code here for pausing the audio or video
    } else {
        playIcon.style.display = "none";
        pauseIcon.style.display = "inline";
        // Add code here for playing the audio or video
    }
}
