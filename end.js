const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;


// local storage only uses key value pairs with the values being stored as strings
username.addEventListener('keyup', () => {
// 'keyup' upates the value of the current character being inputed in an input field for each character in the input
    
saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        // score: Math.floor(Math.random() * 100),
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
// defined sortation algorithm used to return less or greater than 0 
// (there is an explicit rreturn so we do not need to close brackets )
// if the b score is greater than the a score put b before a

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    // stringify used to convert arrays or other type datatypes to string while parse converts to an array
    
    window.location.assign('/');
};
