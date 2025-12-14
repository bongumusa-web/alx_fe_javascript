const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");


let quotes = [
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

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
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


  saveQuote();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

// local storage for saving qoute
function saveQuote() {
  
  localStorage.setItem("qoutes", JSON.stringify(qoutes));
}

// load qoute from local storage
function loadQuotes() {
  
  const storedQuote = localStorage.getItem("qoutes");

  if (storedQuote) {
    quotes = JSON.parse(storedQuote);
  } else {
    quotes = [
      {
        text: "The best way to get started is to quit talking and begin doing.",
        category: "Motivation"
      },
      {
        text: "Don’t let yesterday take up too much of today.",
        category: "Motivation"
      },
      {
        text: "JavaScript is the language of the web.",
        category: "Programming"
      }
    ];
    saveQuote();
  }
}

// exporting the qoute to JSON
function exportQuotes() {
  const data = JSON.stringify(qoutes, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// reading the file and changing JSON to JavaScript
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);

    quotes.push(...importedQuotes);
    saveQuote();

    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}



// filtering with catergory 

function populateCategories() {
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = quotes
    .map(qoute => qoute.category)
    .filter((category, index, array) => array.indexOf(category) === index);

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}








function filterQuotes() {
  const selectedCategory = categoryFilter.value;

  localStorage.setItem("selectedCategory", selectedCategory);

  quoteDisplay.innerHTML = "";

  // change height based on selected category
if (selectedCategory === "Motivation" || selectedCategory === "Programming") {
 quoteDisplay.style.height = "300px";
  quoteDisplay.style.overflow = "hidden";
  quoteDisplay.style.transition = "height 0.4s ease";
} else {
  quoteDisplay.style.height = "100px";
}


  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(qoute => qoute.category === selectedCategory);

  filteredQuotes.forEach(qoute => {
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${qoute.text}" — ${qoute.category}`;
    quoteDisplay.appendChild(quoteText);
  });
}
// storing category on the local storeage 

function loadSelectedCategory() {
  const savedCategory = localStorage.getItem("selectedCategory");

  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}



//syc data using JSON PLACEHOLDER 

  async function fetchQuotesFromServer() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  // Convert server posts into quotes
  const serverQuotes = data.slice(0, 5).map(post => ({
    text: post.title,
    category: "Server"
  }));

  return serverQuotes;
}

function notifyUser(message){
  const notification = document.getElementById('notification');
  notification.innerHTML = message;

  setTimeout(() => {
    notification.innerHTML = "";
  }, 3000);

}

 async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();
  const loadQuotes = quotes;

  // conflict rule to make sure that the server wins 

  quotes = serverQuotes;

  saveQuote();
  populateCategories();
  filterQuotes();

  notifyUser("Quotes synced with server (server data used)");
 }





// calling the qoute
loadQuotes();
populateCategories();
loadSelectedCategory();
setInterval(syncWithServer, 15000);


