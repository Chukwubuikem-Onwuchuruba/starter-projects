const API_URL = "https://api.chucknorris.io/jokes/random";

const fontColors = [
  "black",
  "white",
  "yellow",
  "orange",
  "purple",
  "pink",
  "cyan",
  "magenta",
];

const searchBox = document.getElementById("search-box");
const dropDown = document.getElementById("dropdown");
const searchBtn = document.querySelector('button[type="submit"]');
const h3Element = document.querySelector(".row.center .display-card h3");

async function handleRandomJoke() {
  const response = await fetch(API_URL);
  const data = await response.json();
  h3Element.textContent = data.value;
  searchBtn.textContent = "Search again!";
}

async function handleQueryJoke(query) {
  const response = await fetch(`${API_URL}/search?query=${query}`);
  if (!response.ok) {
    h3Element.textContent = "No jokes found for your search.";
  } else {
    const data = await response.json();
    h3Element.textContent = data.value;
    searchBtn.textContent = "Search again!";
  }
  searchBox.value = "";
}

async function handleCategoryJoke(category) {
  const response = await fetch(`${API_URL}?category=${category}`);
  if (!response.ok) {
    h3Element.textContent =
      "There was a problem getting the joke. Refresh and try again.";
  } else {
    const data = await response.json();
    h3Element.textContent = data.value;
    searchBtn.textContent = "Search again!";
  }
}

searchBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * fontColors.length);

  h3Element.textContent = "Getting joke...";
  if (searchBox.value != "") {
    handleQueryJoke(searchBox.value.toLowerCase());
  } else if (dropDown.value != "") {
    handleCategoryJoke(dropDown.value);
  } else {
    handleRandomJoke();
  }
  h3Element.style.color = fontColors[randomIndex];
});
