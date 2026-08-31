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

function toggleLike(button, originalCount) {

    const count = button.querySelector("span");

    const isLiked = button.classList.contains("liked");

    if (isLiked) {

        button.classList.remove("liked");
        button.firstChild.textContent = "♡ ";
        count.textContent = originalCount;

    } else {

        button.classList.add("liked");
        button.firstChild.textContent = "♥ ";
        count.textContent = originalCount + 1;

    }
}

function createPost() {

    const input = document.getElementById("post-input");
    const hobbySelect = document.getElementById("post-hobby");

    const text = input.value.trim();
    const hobby = hobbySelect.value;
    const postType = document.querySelector(
    'input[name="post-type"]:checked'
    ).value;
    

    if (text === "") {
        alert("Please write something before publishing.");
        return;
    }

    if (hobby === "") {
        alert("Please select a hobby.");
        return;
    }

    const feed = document.querySelector(".feed");

    const post = document.createElement("article");
    post.classList.add("post-card");

    post.innerHTML = `
        <div class="post-header">

            <div class="user-avatar">Y</div>

            <div class="user-info">
                <h3>You</h3>
                <span>${hobby} · ${postType}</span>
            </div>

        </div>

        <p class="post-text"></p>

        <div class="post-actions">

            <button 
                class="like-button"
                onclick="toggleLike(this, 0)"
            >
                ♡ <span>0</span>
            </button>

            <button>💬 0</button>

            <button>↗ Share</button>

        </div>
    `;
    post.querySelector(".post-text").textContent = text;

    feed.prepend(post);

    input.value = "";
    hobbySelect.value = "";
}