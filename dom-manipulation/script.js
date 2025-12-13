const quoteDisplay = document.getElementById("quoteDisplay");
const newQuote = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");


let qoutes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don’t let yesterday take up too much of today.", category: "Motivation" },
  { text: "JavaScript is the language of the web.", category: "Programming" }
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * qoutes.length);

  
  const quote = qoutes[randomIndex];

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

  qoutes.push(createAddQuoteForm);


  saveQoute();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("Quote added successfully!");
}

// local storage for saving qoute
function saveQoute() {
  
  localStorage.setItem("qoutes", JSON.stringify(qoutes));
}

// load qoute from local storage
function loadQoutes() {
  
  const storedQuote = localStorage.getItem("qoutes");

  if (storedQuote) {
    qoutes = JSON.parse(storedQuote);
  } else {
    qoutes = [
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
    saveQoute();
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

    qoutes.push(...importedQuotes);
    saveQoute();

    alert("Quotes imported successfully!");
  };

  fileReader.readAsText(event.target.files[0]);
}



// filtering with catergory 

function populateCategories() {
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  const categories = qoutes
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
      ? qoutes
      : qoutes.filter(qoute => qoute.category === selectedCategory);

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




// calling the qoute
loadQoutes();
populateCategories();
loadSelectedCategory();

