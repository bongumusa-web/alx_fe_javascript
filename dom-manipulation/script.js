const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");

const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Motivation" },
  { text: "JavaScript is the language of the web.", category: "Programming" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = "";

  const quoteText = document.createElement("p");
  const quoteCategory = document.createElement("span");

  quoteText.textContent = `"${quote.text}"`;
  quoteCategory.textContent = ` — ${quote.category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

newQuote.addEventListener("click", showRandomQuote);

function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields");
    return;
  }

  const createAddQuoteForm = {
    text: quoteText,
    category: quoteCategory
  };

  quotes.push(createAddQuoteForm);

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}
