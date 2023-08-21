const githubForm = document.querySelector("#github-form");
const nameInput = document.querySelector("#githubname");
const clearLastUsers = document.querySelector("#clear-last-users");
const lastUsers= document.querySelector("#last-users");
const git = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}

function getData(e){
    let username = nameInput.value.trim();
    if (username === "") {
        ui.showError("Lütfen geçerli bir kullanıcı adi girin.");
    }
    else{
        git.getGithubData(username)
        .then(response => {
            if (response.user.message === "Not Found") {
                ui.showError("Kullanıcı bulunamadı");
            } else {
                ui.addSearchedUserToUI(username)
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }
    ui.clearInput();
    
    e.preventDefault();
}

function clearAllSearched(){
        if (confirm("Emin misiniz?")) {
            Storage.clearAllSearchedUsersFromStorage();
            ui.clearAllSearchedFromUI();
        }
}

function getAllSearched(){
    let users = Storage.getSearchedUsersFromStorage();
    let result = "";
    users.forEach(user => {
        result += `<li class="list-group-item bg-dark text-light">${user}</li>`
    });

    lastUsers.innerHTML = result;
}