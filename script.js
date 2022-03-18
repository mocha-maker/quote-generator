// HTML elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

// Hide Loading 
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;

}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Check for null author
    if (!quote.author) { 
        authorText.textContent = 'Anonymous';
    } else {
        authorText.textContent = quote.author;
    }

    // Check if long quote longer than 50
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote')
    }
    // Set Quote and Hide Loader
    quoteText.textContent = quote.text;
    complete();    
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);  // set only if fetchable
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
        console.log('Unable to retrieve quotes.')
    }
}

// Twitter Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);


// On Load
getQuotes();
