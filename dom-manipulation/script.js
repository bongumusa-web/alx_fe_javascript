const quaoteDisplay = document.getElementById("quateDisplay");
const newQuote = document.getElementById("newQuote");


const quotes = [
{ text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
{ text: "Don’t let yesterday take up too much of today.", category: "Motivation" },
{ text: "JavaScript is the language of the web.", category: "Programming" }
];

function showRandomQuote() {
const randomIndex = Math.floor(Math.random() * quotes.length);
const quote = quotes[randomIndex];


quoteDisplay.innerHTML = `"${quote.text}" — ${quote.category}`;
}

newQuote.addEventListener('click',showRandomQuote);



// Function to add a new quote
function addQuote() {
const quoteText = document.getElementById("newQuoteText").value.trim();
const quoteCategory = document.getElementById("newQuoteCategory").value.trim();


if (quoteText === "" || quoteCategory === "") {
alert("Please fill in both fields");
return;
}


const newQuote = {
text: quoteText,
category: quoteCategory
};


quotes.push(newQuote);


document.getElementById("newQuoteText").value = "";
document.getElementById("newQuoteCategory").value = "";


alert("Quote added successfully!");
};

