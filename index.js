
const setupInputContainer = document.getElementById('setup-input-container');
const movieBossText = document.getElementById('movie-boss-text');
const outputImg = document.getElementById('output-img');


document.getElementById("send-btn").addEventListener("click", () => {
  const setupTextarea = document.getElementById('setup-textarea'); 
    if (setupTextarea.value) {
       const userInput = setupTextarea.value;

       // Display loading indicator
       setupInputContainer.innerHTML = `<img src="loading.svg" class="loading" id="loading">`;
       movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;

       // Fetch responses
       fetchBotReply(userInput);
       fetchSynopsis(userInput);
       generateImage(userInput);
   }
});

async function fetchBotReply(outline) {
    const apiKey = `sk-M2-LO9YcJgo6efGHfaQgDrUoJ-hCbDpII3tGb1D0jGT3BlbkFJ0323EekSIxULK4tVKzdCcew325aEPAWAj6IsyWmWAA`; 

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
                ###
                outline: Two dogs fall in love and move to Hawaii to learn to surf.
                message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
                ###
                outline:A plane crashes in the jungle and the passengers have to walk 1000km to safety.
                message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
                ###
                outline: A group of corrupt lawyers try to send an innocent woman to jail.
                message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
                ###
                outline: ${outline}
                message: 
            `,
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
    const apiKey = 'sk-M2-LO9YcJgo6efGHfaQgDrUoJ-hCbDpII3tGb1D0jGT3BlbkFJ0323EekSIxULK4tVKzdCcew325aEPAWAj6IsyWmWAA'; 

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: `Generate an engaging, professional and marketable movie synopsis based on 
                an outline. The synopsis should include actors names in brackets after each 
                character. Choose actors that would be ideal for this role. 
    ###
    outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly 
    mission.
    synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to 
    refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is 
    sent to the school, his reckless attitude and cocky demeanor put him at odds with the 
    other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't 
    only competing to be the top fighter pilot, he's also fighting for the attention of his 
    beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns 
    the respect of his instructors and peers - and also the love of Charlotte, but struggles to 
    balance his personal and professional life. As the pilots prepare for a mission against a 
    foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep 
    in his past to become the best fighter pilot and return from the mission triumphant.  
    ###
    outline: ${outline}
    synopsis: 
    `,
    max_tokens: 700
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const synopsis = data.choices[0].text.trim();
        document.getElementById('output-text').innerText = synopsis;
        fetchTitle(synopsis);
        fetchStars(synopsis);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output-text').innerText = 'Sorry, something went wrong.';
    }
}

async function fetchTitle(synopsis) {
    const apiKey = 'sk-M2-LO9YcJgo6efGHfaQgDrUoJ-hCbDpII3tGb1D0jGT3BlbkFJ0323EekSIxULK4tVKzdCcew325aEPAWAj6IsyWmWAA'; 
    
    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: `Generate a catchy movie title for this synopsis: ${synopsis}`,
                max_tokens: 25,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const title = data.choices[0].text.trim();
        document.getElementById('output-title').innerText = title;

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output-title').innerText = 'Sorry, something went wrong.';
    }
}

async function fetchStars(synopsis) {
    const apiKey = 'sk-M2-LO9YcJgo6efGHfaQgDrUoJ-hCbDpII3tGb1D0jGT3BlbkFJ0323EekSIxULK4tVKzdCcew325aEPAWAj6IsyWmWAA'; 

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo-instruct',
                prompt: `Extract the names in brackets from the synopsis.
                ###
                synopsis: The Top Gun Naval Fighter Weapons School is where the best 
                of the best train to refine their elite flying skills. When hotshot 
                fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless 
                attitude and cocky demeanor put him at odds with the other pilots, 
                especially the cool and collected Iceman (Val Kilmer). But Maverick 
                isn't only competing to be the top fighter pilot, he's also fighting 
                for the attention of his beautiful flight instructor, Charlotte Blackwood 
                (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
                names: Tom Cruise, Val Kilmer, Kelly McGillis    
                ###
    synopsis: ${synopsis}
    stars:`,
                max_tokens: 30
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const stars = data.choices[0].text.trim();
        document.getElementById('output-stars').innerText = stars;

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output-stars').innerText = 'Sorry, something went wrong.';
    }
}

  
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("submit-btn").addEventListener("click", () => {
      const prompt = document.getElementById("instruction").value;
      generateImage(prompt);
    });
  });
  
  async function generateImage(prompt) {
    const apiKey = 'sk-M2-LO9YcJgo6efGHfaQgDrUoJ-hCbDpII3tGb1D0jGT3BlbkFJ0323EekSIxULK4tVKzdCcew325aEPAWAj6IsyWmWAA'; // Replace with your actual OpenAI API key

    try {
        console.log("Generating image with prompt:", prompt); // Log the prompt being sent

        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: '256x256',
                response_format: 'url'
            })
        });

        const data = await response.json();

        console.log('Image generation response:', data); // Log the entire response

        // Check if the response contains valid data
        if (data && data.data && data.data.length > 0) {
            const imageUrl = data.data[0].url; // Get the image URL
            
            // Display the image in the 'output-img-container'
            document.getElementById('output-img-container').innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
            
            // Update the setup container with the 'View Pitch' button
            setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`;

            // Add event listener for the 'View Pitch' button
            document.getElementById('view-pitch-btn').addEventListener('click', () => {
                // Hide the setup container and show the output container
                document.getElementById('setup-container').style.display = 'none';
                document.getElementById('output-container').style.display = 'flex';

                // Update the movie boss text
                movieBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`;
            });
        } else {
            console.error('Image URL not found in the response.');
            document.getElementById('output-img-container').innerText = 'Sorry, no image generated.';
        }
    } catch (error) {
        console.error('Error generating image:', error); // Log the error
        document.getElementById('output-img-container').innerText = 'Sorry, something went wrong while generating the image.';
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
    const apiKey = ''; // Replace with your actual OpenAI API key

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
  apiKey: '', // Replace with your actual OpenAI API key
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
