const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// ENABLE / DISABLE THE BUTTON

function toggleButton() {
    button.disabled = !button.disabled;
}


// Joke teller function using button
function tellMeJoke(joke) {
    VoiceRSS.speech({
        "key": "42971ab0766b4a2ba577216b11ea87ce",
        "src": joke,
        "hl": "en-us",
        "r": "0",
        "c": "mp3",
        "f": "8khz_8bit_mono"
    });
}




async function getJoke() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMeJoke(joke);
        // disable the button right time
        toggleButton()
    } catch (error) {
        // catch the error
        console.log('Some thing wrong'. error);
    }
}


button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
