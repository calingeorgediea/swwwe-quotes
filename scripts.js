const quoteText = document.getElementById("quote-text");
const quoteSource = document.getElementById("quote-source");

function getTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
}

function fetchQuote() {
    const token = getTokenFromURL();

    if (!token) {
        quoteText.textContent = "Error: No token provided in the query string.";
        quoteSource.textContent = '';
        return;
    }

    const url = `https://www.swwwe.ro/api/apps/quotes/random?token=${token}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const quote = data.quote.quote;
            const source = data.quote.source;

            // Set quote text and source
            quoteText.textContent = `"${quote}"`;
            quoteSource.textContent = `— ${source}`;
        })
        .catch(error => {
            console.error('Error fetching quote:', error);
            quoteText.textContent = "Sorry, couldn't fetch a new quote. Try again!";
            quoteSource.textContent = '';
        });
}

// Initial quote fetch on page load
window.onload = fetchQuote;
