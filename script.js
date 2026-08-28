function showHobby(hobbyName, hobbyIcon, hobbyLevel, hobbyDescription) {

    const modal = document.getElementById("hobby-modal");

    document.getElementById("modal-icon").textContent = hobbyIcon;
    document.getElementById("modal-title").textContent = hobbyName;
    document.getElementById("modal-level").textContent = hobbyLevel;
    document.getElementById("modal-description").textContent = hobbyDescription;

    modal.style.display = "flex";
}


function closeHobby() {

    const modal = document.getElementById("hobby-modal");

    modal.style.display = "none";
}

const searchInput = document.getElementById("hobby-search");
const hobbyCards = document.querySelectorAll(".hobby-card");
const filterButtons = document.querySelectorAll(".filter-button");

let selectedCategory = "all";


function filterHobbies() {

    const searchText = searchInput.value.toLowerCase();
    
     let visibleCards = 0;

    hobbyCards.forEach(function (card) {


        const hobbyName = card.querySelector("h3").textContent.toLowerCase();
        const hobbyCategory = card.dataset.category;

        const matchesSearch = hobbyName.includes(searchText);
        const matchesCategory =
            selectedCategory === "all" ||
            hobbyCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    
    });
    const noResults = document.getElementById("no-results");

    if (visibleCards === 0) {
    noResults.style.display = "block";
    } else {
    noResults.style.display = "none";
    }

}


searchInput.addEventListener("input", filterHobbies);


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedCategory = button.dataset.category;

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterHobbies();

    });

});