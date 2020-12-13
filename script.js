const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter"); 
const facebookBtn = document.getElementById("facebook");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//Show Loading

function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading

function hideLoading() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API

async function getQuote() {
    showLoading();
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&key=654321';
    try {
        const response = await fetch(proxyURL + apiURL);
        const data = await response.json();
        //Populating an empty author
        if(data.quoteAuthor === '') {
            authorText.innerText = "Unknown";
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        
        //Reduce font size for longer quotes
        if(data.quoteText.length > 120) {
            quoteText.classList.add("long-quote");
        }
        else {
            quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        hideLoading();
    }
    catch(error) {
        //getQuote();
        console.log("No Quote", error);
    }
}

//Share the Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterAPI = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterAPI, '_blank');
}

function postQuote() {
    FB.init(
        {
            appId : '0000000000'        //Won't work; just a sample
        });
        
        FB.ui(
        {
            method: 'feed',
            message: `Hey, see this awesome quote I read ${quote} - ${author}`
        });
}
//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click', postQuote);

//On Load
getQuote();