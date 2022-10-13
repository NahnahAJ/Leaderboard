import './styles.css';

const formSubmit = document.getElementById('form');
const refreshBtn = document.getElementById('refreshBtn');
const scoresTab = document.querySelector('.scores-tab');
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/5o0ngsRqtDwdY7IseEIK/scores/';

// Sending scores to the API
formSubmit.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(formSubmit);

  // Extract data from formData
  const extractedData = [...formData];
  const userData = extractedData[0][1];
  const scoreData = extractedData[1][1];

  // Create an object with extracted Data
  const scoreObject = {
    user: userData,
    score: scoreData,
  };

  const sendScores = async () => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scoreObject),
    });
    const data = await res.json();
    console.log('Data', data);
  };
  sendScores();
});

// Retrieving and Displaying Scores from the API
refreshBtn.addEventListener('click', () => {
  const getScores = async () => {
    const res = await fetch(url, {
      method: 'GET',
    });
    const data = await res.json();
    // Set the DOM container to empty before each render
    scoresTab.innerHTML = '';
    return data.result.forEach((recorded) => {
      //  create DOM elements and Append to display in the DOM
      const list = document.createElement('li');
      list.innerHTML = `${recorded.user}: ${recorded.score}`;
      scoresTab.append(list);
    });
  };
  getScores();
});
