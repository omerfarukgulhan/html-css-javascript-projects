const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const skipButtons = document.querySelectorAll("[data-skip]");
const ranges = document.querySelectorAll(".player__slider");
const fullscreenButton = document.querySelector(".fullscreen");

eventListener();

function eventListener() {
  video.addEventListener("click", togglePlay);
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 32) {
      // This will allow us to pause/resume the video with space.
      togglePlay();
    }
  });

  video.addEventListener("play", updateButton);
  video.addEventListener("pause", updateButton);
  video.addEventListener("timeupdate", handleProgress);

  toggle.addEventListener("click", togglePlay);
  skipButtons.forEach((button) => button.addEventListener("click", skip));
  ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
  ranges.forEach((range) => range.addEventListener("mousemove", handleRangeUpdate));
  fullscreenButton.addEventListener("click", fullscreen);
  video.addEventListener("dblclick", fullscreen);

  let mousedown = false;
  progress.addEventListener("click", scrub);
  progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
  progress.addEventListener("mousedown", () => (mousedown = true));
  progress.addEventListener("mouseup", () => (mousedown = false));
}

function togglePlay(e) {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  // video[video.paused ? 'play' : 'pause'](); //Single line.
}
function updateButton() {
  if (video.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "❚ ❚";
  }
  // toggle.textContent = this.paused ? "►" : "❚ ❚"; // Single line.
}

function handleProgress() {
  progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`;
}

function skip(e) {
  video.currentTime += parseFloat(e.target.dataset.skip); // Insted of "e.target.dataset.skip" we couldd use "this.datase.skip".
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullscreen(e) {
  video.requestFullscreen();
}
