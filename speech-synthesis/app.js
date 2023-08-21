let voices = [];

const msg = new SpeechSynthesisUtterance();

const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

msg.text = document.querySelector('[name="text"]').value;

eventListener();

function eventListener() {
  speakButton.addEventListener("click", toggle);
  stopButton.addEventListener("click", () => toggle(false));

  options.forEach((option) => {
    option.addEventListener("change", setOption);
  });

  speechSynthesis.addEventListener("voiceschanged", populateVoices);
  voicesDropdown.addEventListener("change", setVoice);
}

function setOption() {
  msg[this.name] = this.value;
}

function setVoice(e) {
  msg.voice = voices.find((voice) => voice.name === this.value);
}

function populateVoices() {
  voicesDropdown.innerHTML = "";
  voices = this.getVoices();
  voices.forEach((voice) => {
    voicesDropdown.innerHTML += `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
  });
  msg.voice = voices[0]; // Set default as a first option.
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
