class Currency {
  constructor(firstCurrency, secondCurrency) {
    this.url = "https://api.exchangerate.host/latest?base=";
    this.firstCurrency = firstCurrency;
    this.secondCurrency = secondCurrency;
    this.amount = null;
  }

  exchange() {
    return new Promise((resolve, reject) => {
      fetch(this.url + this.firstCurrency)
        .then((response) => response.json())
        .then((data) => {
          let total = Number(this.amount) * data.rates[this.secondCurrency];
          resolve(total);
        })
        .catch((err) => reject(err));
    });
  }

  changeAmount(amount) {
    this.amount = amount;
  }

  changeFirstCurrency(newFirstCurrency) {
    this.firstCurrency = newFirstCurrency;
  }

  changeSecondCurrency(newSecondCurrency) {
    this.secondCurrency = newSecondCurrency;
  }
}
