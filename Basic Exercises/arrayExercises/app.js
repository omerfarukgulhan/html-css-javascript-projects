const inventors = [
  { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
  { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
  { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
  { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
  { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
];

const data = ["car", "car", "truck", "truck", "bike", "walk", "car", "van", "bike", "walk", "car", "van", "car", "truck"];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's
const bornInFifteenth = inventors.filter((inventor) => {
  if (inventor.year >= 1500 && inventor.year < 1600) {
    return true;
  } else {
    return false;
  }
});
// console.table(bornInFifteenth);

// Array.prototype.map()
// 2. Give us an array of the inventors first and last names
const firstAndLastNames = inventors.map((inventor) => {
  return `${inventor.first} ${inventor.last}`;
});
// console.table(firstAndLastNames);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest
const sortByBirth = inventors.sort((firstInventor, secondInventor) => {
  if (firstInventor.year > secondInventor.year) {
    return 1;
  } else {
    return -1;
  }
});
// console.table(sortByBirth);

// Array.prototype.reduce()
// 4. How many years did all the inventors live all together?
const lifeTime = inventors.reduce((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}, 0);
// console.log(lifeTime);

// 5. Sort the inventors by years lived
const sortByAge = inventors.sort((firstInventor, secondInventor) => {
  if (firstInventor.passed - firstInventor.year > secondInventor.passed - secondInventor.year) {
    return 1;
  } else {
    return -1;
  }
});
// console.table(sortByAge);

// 6. Reduce Exercise
// Sum up the instances of each of these
const transportation = data.reduce((obj, item) => {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
// console.log(transportation);
