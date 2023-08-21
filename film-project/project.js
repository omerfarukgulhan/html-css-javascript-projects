const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const clear = document.getElementById("clear-films");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
// Tüm eventleri yükleme

eventListeners();

function eventListeners(e) {
  form.addEventListener("submit", addFilm);
  secondCardBody.addEventListener("click", deleteFilm);
  document.addEventListener("DOMContentLoaded", loadFilmstoUI);
  clear.addEventListener("click", clearAllFilms);
}
function loadFilmstoUI() {
  let films = Storage.getFilmsFromStorage();
  UI.loadAllFilms(films);
}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director == "" || url === "") {
    UI.displayMessage("danger", "Değerleri boş bırakmayın");
  } else {
    const newFilm = new Film(title, director, url);
    UI.addFilmToUI(newFilm);
    Storage.addFilmToStorage(newFilm);
    UI.displayMessage("success", "Film Başarıyla eklendi.");
  }
  UI.clearInputs(titleElement, directorElement, urlElement);
  e.preventDefault();
}

function deleteFilm(e) {
  if (e.target.id === "delete-film") {
    UI.deleteFilmFromUI(e.target.parentElement.parentElement);
    Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    UI.displayMessage("success", "Başarıyla silindi.");
  }
}

function clearAllFilms() {
  if (confirm("Bütün Filmleri silmek istediğinizden emin misiniz?")) {
    Storage.clearAllFilmsFromStorage();
    UI.clearAllFilmsFromUI();
  }
}
