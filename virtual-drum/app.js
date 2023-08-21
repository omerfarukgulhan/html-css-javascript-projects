const keys = document.querySelectorAll(".key");

eventListener();

function eventListener() {
  window.addEventListener("keydown", playSound);
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

  if (audio === null) {
    console.log("asd");
    return;
  } else {
    key.classList.add("playing");
    audio.play();
    audio.currentTime = 0;
    setTimeout(() => {
      key.classList.remove("playing");
    }, 100);
  }
}
