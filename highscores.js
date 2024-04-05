const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores.map(score => {
    // map takes in an array and converts it into a string to give the required data
     
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
    // outputs the list of the players and their scores
  })
  .join("");
