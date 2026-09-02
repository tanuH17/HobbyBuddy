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

function createPost(savedPost = true) {

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
    addPostToProfile(text, hobby, postType);

    if (savedPost){
    const savedPost = {
    text: text,
    hobby: hobby,
    postType: postType
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(savedPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    }
    input.value = "";
    hobbySelect.value = "";
    updatePostCount();
}
function updatePostCount() {

    const posts = document.querySelectorAll(".feed .post-card");

    document.getElementById("post-count").textContent = posts.length;

}
function openProfileEditor() {

    const editor = document.getElementById("profile-editor");

    editor.style.display = "block";
}
function saveProfile() {

    const nameInput = document.getElementById("profile-name-input");
    const bioInput = document.getElementById("profile-bio-input");

    const name = nameInput.value.trim();
    const bio = bioInput.value.trim();
    const hobbyCheckboxes = document.querySelectorAll(
    '.hobby-selection input[type="checkbox"]'
    );

    const selectedHobbies = [];

    hobbyCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
        selectedHobbies.push(checkbox.value);
    }
    });

    if (name === "") {
        alert("Please enter your name.");
        return;
    }
    if (selectedHobbies.length === 0) {
    alert("Please select at least one hobby.");
    return;
    }

    document.getElementById("profile-name").textContent = name;

    if (bio !== "") {
        document.getElementById("profile-bio").textContent = bio;
    }
    const profileHobbies = document.getElementById("profile-hobbies");

    profileHobbies.innerHTML = "";

    selectedHobbies.forEach(function (hobby) {

    const hobbyTag = document.createElement("span");

    hobbyTag.textContent = hobby;

    profileHobbies.appendChild(hobbyTag);

    });

    document.getElementById("hobby-count").textContent =
    selectedHobbies.length;
    localStorage.setItem("profileName", name);
    localStorage.setItem("profileBio", bio);
    localStorage.setItem(
    "profileHobbies",
    JSON.stringify(selectedHobbies)
    );
    document.getElementById("profile-editor").style.display = "none";

    nameInput.value = "";
    bioInput.value = "";
}
function loadProfile() {

    const savedName = localStorage.getItem("profileName");
    const savedBio = localStorage.getItem("profileBio");
    const savedHobbies = localStorage.getItem("profileHobbies");

    if (savedName) {
        document.getElementById("profile-name").textContent = savedName;
    }

    if (savedBio) {
        document.getElementById("profile-bio").textContent = savedBio;
    }

    if (savedHobbies) {

        const hobbies = JSON.parse(savedHobbies);

        const profileHobbies =
            document.getElementById("profile-hobbies");

        profileHobbies.innerHTML = "";

        hobbies.forEach(function (hobby) {

            const hobbyTag = document.createElement("span");

            hobbyTag.textContent = hobby;

            profileHobbies.appendChild(hobbyTag);

        });

        document.getElementById("hobby-count").textContent =
            hobbies.length;
    }
}

function addPostToProfile(text, hobby, postType) {

    const profilePosts = document.getElementById("profile-posts");

    const emptyMessage =
        profilePosts.querySelector(".empty-posts");

    if (emptyMessage) {
        emptyMessage.remove();
    }

    const profilePost = document.createElement("div");

    profilePost.classList.add("profile-post");

    const meta = document.createElement("div");
    meta.classList.add("profile-post-meta");

    meta.textContent = `${hobby} · ${postType}`;

    const postText = document.createElement("p");
    postText.classList.add("profile-post-text");

    postText.textContent = text;

    profilePost.appendChild(meta);
    profilePost.appendChild(postText);

    profilePosts.prepend(profilePost);
}
function loadSavedPosts() {

    const posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.forEach(function(post) {

        createPostFromSavedData(post);

    });
}
function createPostFromSavedData(post) {

    const feed = document.querySelector(".feed");

    const postCard = document.createElement("div");

    postCard.classList.add("post-card");

    const postMeta = document.createElement("div");
    postMeta.classList.add("post-meta");

    postMeta.textContent = `${post.hobby} · ${post.postType}`;

    const postText = document.createElement("p");
    postText.textContent = post.text;

    postCard.appendChild(postMeta);
    postCard.appendChild(postText);

    feed.appendChild(postCard);

    addPostToProfile(post.text, post.hobby, post.postType);
}

loadProfile();
loadSavedPosts();
updatePostCount();