(function () {
    // Elements
    const searchButton = document.getElementById("search");
    const addButton = document.getElementById("add");
    const factBox = document.querySelector(".fact");
    const favoritesElement = document.querySelector(".favorites .list");

    // State
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let currentFact = "";

    // Search for facts
    searchButton.addEventListener("click", async () => {
        const response = await fetch("https://uselessfacts.jsph.pl/random.json?language=en");
        const result = await response.json();
        addButton.style.display = "inline";
        factBox.innerHTML = currentFact = result.text;
    });

    // Add facts to favorites
    addButton.addEventListener("click", () => {
        addButton.style.display = "none";
        addFavorite(currentFact);
        renderFavorites();
    });

    function addFavorite(text) {
        favorites.push(text);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    function removeFavorite(text) {
        favorites = favorites.filter((item) => item !== text);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // Display favorites
    function renderFavorites() {
        favoritesElement.innerHTML = "";

        for (favorite of favorites) {
            const item = document.createElement("div");
            item.className = "item";
            item.innerHTML = favorite;

            item.addEventListener("click", function (e) {
                removeFavorite(e.target.innerText);
                renderFavorites();
            });

            favoritesElement.appendChild(item);
        }
    }

    // Initial load
    renderFavorites();
})();
