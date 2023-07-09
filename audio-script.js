// const progressBar = document.getElementById("progressBar");
// const audio = document.querySelectorAll(".audio-player");
// const playAudioButton = document.querySelectorAll(".play-audio");
// const pauseAudioButton = document.querySelectorAll(".pause-audio");

// function playAudio() {
//     audio[0].play();
// }

// function pauseAudio() {
//     audio[0].pause();
// }

// function setAudioProgress(value) {
//     var duration = audio.duration;
//     var currentTime = (value / 100) * duration;
//     audio.currentTime = currentTime;
// }

// audio.forEach(function() {
//     audio[0].addEventListener("timeupdate", function() {
//         var duration = audio.duration;
//         var currentTime = audio.currentTime;
//         var progress = (currentTime / duration) * 100;
//         progressBar.value = progress;
//     });
// })

// playAudioButton.forEach(function() {
//     playAudioButton[0].addEventListener('click', playAudio)
// })

// pauseAudioButton.forEach(function() {
//     pauseAudioButton[0].addEventListener('click', pauseAudio)
// })

// function playAudio(button) {
//     var trackContainer = button.parentElement;
//     var audio = trackContainer.querySelector(".audio-player");
//     audio.play();
//   }

//   function pauseAudio(button) {
//     var trackContainer = button.parentElement;
//     var audio = trackContainer.querySelector(".audio-player");
//     audio.pause();
//   }

//   function setAudioProgress(value) {
//     var progressBar = event.target;
//     var trackContainer = progressBar.parentElement;
//     var audio = trackContainer.querySelector(".audio-player");
//     audio.currentTime = (audio.duration / 100) * value;
//   }

function playAudio(button) {
    var trackContainer = button.parentElement;
    var audio = trackContainer.querySelector(".audio-player");
    audio.play().catch(function (error) {
      // Autoplay was prevented, you can handle this case or fallback to a user-initiated play action.
      console.log("Autoplay prevented. Please click play again.");
    });
  }

  function pauseAudio(button) {
    var trackContainer = button.parentElement;
    var audio = trackContainer.querySelector(".audio-player");
    audio.pause();
  }

  function setAudioProgress(progressBar) {
    var trackContainer = progressBar.parentElement;
    var audio = trackContainer.querySelector(".audio-player");
    audio.currentTime = (audio.duration / 100) * progressBar.value;
  }

  function updateProgressBar(audio, trackContainer) {
    var progressBar = trackContainer.querySelector(".progress-bar");
    var progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
  }