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