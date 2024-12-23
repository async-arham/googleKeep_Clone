const addBtn = document.querySelector("#add-btn");
const noteCont = document.querySelector("#note-cont");
const watermark = document.querySelector("#watermark");

const updateLSData = () => {
    const notes = [];
    document.querySelectorAll(".note").forEach((textarea) => {
        if (textarea.value.trim() !== "") {
            notes.push(textarea.value);
        }
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    checkWatermarkVisibility();
};

const checkWatermarkVisibility = () => {
    if (document.querySelectorAll(".each-card").length === 0) {
        watermark.style.display = "block";
    } else {
        watermark.style.display = "none";
    }
};

const addNewNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("each-card", "fade-in");

    const htmlData = `
<div class="main ${text ? "" : "none"}">${text}</div>
<textarea class="note ${text ? "none" : ""}" spellcheck="false" placeholder="Take a note...">${text}</textarea>
<div class="actions">
    <span id="edit"><img src="assets/edit.svg" alt="Edit"></span>
    <span id="del"><img src="assets/delete.svg" alt="Delete"></span>
</div>
`;

    note.innerHTML = htmlData;
    noteCont.appendChild(note);

    const editBtn = note.querySelector("#edit");
    const delBtn = note.querySelector("#del");
    const mainDiv = note.querySelector(".main");
    const textarea = note.querySelector(".note");

    delBtn.addEventListener("click", () => {
        Swal.fire({
            title: "Are you sure?",
            text: "This note will be deleted permanently!",
            icon: "warning",
            iconColor: "#fbbc04",
            background: "#202124",
            color: "white",
            showCancelButton: true,
            confirmButtonColor: "#fbbc04",
            cancelButtonColor: "transparent",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                note.classList.add("fade-out");
                setTimeout(() => {
                    note.remove();
                    updateLSData();
                }, 500);
            }
        });
    });

    editBtn.addEventListener("click", () => {
        mainDiv.classList.toggle("none");
        textarea.classList.toggle("none");
        textarea.focus();
    });

    textarea.addEventListener("input", (event) => {
        mainDiv.textContent = event.target.value;
        updateLSData();
    });

    checkWatermarkVisibility();
};

const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
savedNotes.forEach((note) => addNewNote(note));

addBtn.addEventListener("click", () => addNewNote());

checkWatermarkVisibility();
