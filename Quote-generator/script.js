const QuoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuotBtn = document.getElementById('new-quot');
const linkedBtn = document.getElementById('linkedin');
const Loader = document.getElementById('loader');

// show loading
function showLoading() {
    showLoading.hidden = false;
    QuoteContainer.hidden = true;
}

// Hide loading
function complete(){
    QuoteContainer.hidden = false;
    Loader.hidden = true;
}

let apiQuotes = [];
// Show new quotes by local data file
// function newQuotes(){
//     // Pick a random quote from apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }

function newQuotes(){
    showLoading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);

    // Check if author field is blank and replace with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }
    else{
        quoteText.textContent = quote.author;    
    }

    // Check quote length to determine styling
    if (quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    authorText.textContent = quote.author;

    // Set quote and hide loader
    complete();
}
// Get quotes from API response
async function getQuotes(){
    showLoading();
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuotes();
    }
    catch(err){
    // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote(){
    // Twitter Url = https://twitter.com/intent/tweet
    const twitterUrl = ` https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Post quote on Linkedin
function postQuote(){
    // Linkedin Url = https://www.linkedin.com/share
    const linkedinUrl = `https://www.linkedin.com/share?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(linkedinUrl,'_blank');
}

// Event Listeners
newQuotBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuote);
linkedBtn.addEventListener('click',postQuote);
// // On load
getQuotes();
// newQuotes();