const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 18 or older?
const now = new Date().getFullYear();
const isAdult = people.some((person) => {
  return now - person.year >= 18;
});
// console.log(isAdult);

// Array.prototype.every() // is everyone 18 or older?
const allAdults = people.every((person) => {
  return now - person.year >= 18;
});
// console.log(allAdults);

// Array.prototype.find()
// Find the comment with the ID of 823423
const findComment = comments.find((comment) => {
  return comment.id === 823423;
});
// console.log(findComment);

// Array.prototype.findIndex()
// Find the comment with this ID of 542328
//const findCommentIndex = comments.findIndex(comment => comment.id === 542328); //One line version.
const findCommentIndex = comments.findIndex((comment) => {
  return comment.id === 542328;
});
// console.log(findCommentIndex);

// Delete the comment with the ID of 123523
comments.splice(
  comments.findIndex((comment) => comment.id === 123523),
  1
);
// console.log(comments);
