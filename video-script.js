// const openVideoButton = document.querySelectorAll(".video-button");
// const closeVideoButton = document.querySelectorAll(".close-video");
// const iframeContainer = document.querySelectorAll(".iframe-container");

// function playVideo() {
//     iframeContainer[0].classList.add('show');
// }

// function removeVideo() {
//     iframeContainer[0].classList.remove('show');
// }

// openVideoButton.forEach(function(e) {
//     openVideoButton[0].addEventListener('click', playVideo)
// })

// closeVideoButton.forEach(function(e) {
//     closeVideoButton[0].addEventListener('click', removeVideo)
// })

const openVideoButtons = document.querySelectorAll(".play-video");
const closeVideoButtons = document.querySelectorAll(".close-video");

function playVideo(event) {
  const button = event.target;
  const iframeContainer = button.nextElementSibling;
  iframeContainer.classList.add('show');
}

function removeVideo(event) {
  const button = event.target;
  const iframeContainer = button.parentElement;
  iframeContainer.classList.remove('show');
}

openVideoButtons.forEach(function(button) {
  button.addEventListener('click', playVideo);
});

closeVideoButtons.forEach(function(button) {
  button.addEventListener('click', removeVideo);
});