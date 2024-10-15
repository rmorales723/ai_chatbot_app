const setupTextarea = document.getElementById('setup-textarea'); 
const setupInputContainer = document.getElementById('setup-input-container');
const movieBossText = document.getElementById('movie-boss-text');

document.getElementById("send-btn").addEventListener("click", () => {
   if (setupTextarea.value) {
       const userInput = setupTextarea.value;

       // Display loading indicator
       setupInputContainer.innerHTML = `<img src="loading.svg" class="loading" id="loading">`;
       movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;

       // Fetch responses
       fetchBotReply(userInput);
       fetchSynopsis(userInput);
   }
});

async function fetchBotReply(outline) {
    const apiKey = 'sk-FNfsoWNaqlzUF7-5k1d5FEVy5QBm4uwOL2QzBHv-nCT3BlbkFJOEwyDpa7wSObmW2gcj2lYq0s3fHnSOPlMM8BIeT6EA'; // Replace with your actual OpenAI API key

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: `Generate a short message to enthusiastically say "${outline}" sounds interesting and
                         that you need some minutes to think about it. Mention one aspect of the sentence.`,
                max_tokens: 60
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        movieBossText.innerText = data.choices[0].text.trim();
    } catch (error) {
        console.error('Error:', error);
        movieBossText.innerText = 'Sorry, something went wrong.';
    }
}

async function fetchSynopsis(outline) {
    const apiKey = 'sk-FNfsoWNaqlzUF7-5k1d5FEVy5QBm4uwOL2QzBHv-nCT3BlbkFJOEwyDpa7wSObmW2gcj2lYq0s3fHnSOPlMM8BIeT6EA'; // Replace with your actual OpenAI API key

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: `Generate engaging, professional, and marketable movie synopsis 
                         based on the following idea: ${outline}`,
                max_tokens: 700
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('output-text').innerText = data.choices[0].text.trim();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output-text').innerText = 'Sorry, something went wrong.';
    }
}




/*
const setupTextarea = document.getElementById('setup-textarea'); 
const setupInputContainer = document.getElementById('setup-input-container');
const movieBossText = document.getElementById('movie-boss-text');

document.getElementById("send-btn").addEventListener("click", () => {
   if(setupTextarea.value) {

    const userInput = setupTextarea.value

    setupInputContainer.innerHTML = `<img src="loading.svg" class="loading" id="loading">`;
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
    fetchBotReply(userInput);
    fetchSynopsis(userInput);
   }
});

async function fetchBotReply(outline) {
    const apiKey = 'sk-FNfsoWNaqlzUF7-5k1d5FEVy5QBm4uwOL2QzBHv-nCT3BlbkFJOEwyDpa7wSObmW2gcj2lYq0s3fHnSOPlMM8BIeT6EA'; // Replace with your actual OpenAI API key

    try {
        const response = await fetch(`https://api.openai.com/v1/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: `Generate a short message to enthusiastically say "${outline}" sounds interesting and
                        that you need some minutes to think about it. Mention one aspect of the sentence.`,
                max_tokens: 60
            
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        movieBossText.innerText = data.choices[0].text.trim()
        console.log(response)
    } catch (error) {
        console.error('Error:', error);
        movieBossText.innerText = 'Sorry, something went wrong.';
    }
}

const configuration = {
  apiKey: 'sk-FNfsoWNaqlzUF7-5k1d5FEVy5QBm4uwOL2QzBHv-nCT3BlbkFJOEwyDpa7wSObmW2gcj2lYq0s3fHnSOPlMM8BIeT6EA', // Replace with your actual OpenAI API key
};
const openai = new OpenAIApi(configuration)

async function fetchSynopsis(outline){
  const response = await openai.createCompletion({
    model: 'gpt-3.5-turbo-instruct',
    prompt: `Generate engaging, professional and marketable movie synopsis 
    based on the following idea: ${outline}`,
    max_tokens: 700
  })
    document.getElementById('output-text').innerText = data.choices[0].text.trim()
}
/*

/*
import { process } from '/env';
import { Configuration, OpenAIApi } from 'openai';


const setupTextarea = document.getElementById('setup-textarea') 
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

document.getElementById("send-btn").addEventListener("click", () => {
  //if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
 // } 
  fetchBotReply();
})

 async function fetchBotReply() {
    const response = await openai.createCompletion({
        'model' : 'gpt-3.5-turbo-instruct' ,
        'prompt' : "how do i let go of hurt in five words or less?"
    })
        movieBossText.innerText = response.data.choices[0].text

    } /*
      

/* 
import fetch from 'node-fetch';

   //Import node-fetch for Node.js

const apiKey = "";
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