
const setupTextarea = document.getElementById('setup-textarea') 
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

document.getElementById("send-btn").addEventListener("click", () => {
  if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
  }
})

const apiKey = " "
const url = "https://api.openai.com/v1/completions"

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json' ,
        'Authorization' : 'Bearer ${apiKey}'
    }, 
    body: JSON.stringify({
        'model' : 'gpt-3.5-turbo-instruct' ,
        'prompt' : "What is the capital of spain?"
    }),
}).then(response => response.json().then(data => console.log(data)))



/*

import fetch from 'node-fetch';

  // Import node-fetch for Node.js

const apiKey = " ";
const url = "https://api.openai.com/v1/completions";
const setupInputContainer = document.getElementById('setup-input-container');
const movieBossText = document.getElementById('movie-boss-text');

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    'model': 'gpt-3.5-turbo-instruct',
    'prompt': "What is the capital of Spain?"
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

  */