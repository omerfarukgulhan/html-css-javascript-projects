const amount = document.querySelector("#amount");
const firstCurrency = document.querySelector("#firstCurrency");
const secondCurrency = document.querySelector("#secondCurrency");
const outputFirst = document.querySelector("#outputFirst");
const outputSecond = document.querySelector("#outputSecond");
const outputResult = document.querySelector("#outputResult");
const currency = new Currency(firstCurrency.value, secondCurrency.value);
const ui = new UI();

eventListener();

function eventListener() {
  amount.addEventListener("input", exchangeCurrency);
  firstCurrency.onchange = function () {
    currency.changeFirstCurrency(firstCurrency.options[firstCurrency.selectedIndex].textContent);
    ui.changeOutputFirst(firstCurrency.options[firstCurrency.selectedIndex].textContent);
    exchangeCurrency();
  };
  secondCurrency.onchange = function () {
    currency.changeSecondCurrency(secondCurrency.options[secondCurrency.selectedIndex].textContent);
    ui.changeOutputSecond(secondCurrency.options[secondCurrency.selectedIndex].textContent);
    exchangeCurrency();
  };
}

function exchangeCurrency() {
  currency.changeAmount(amount.value);
  currency
    .exchange()
    .then((result) => {
      ui.changeOutputResult(result);
    })
    .catch((err) => console.log(err));
}
