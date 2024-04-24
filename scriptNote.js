class Note {
    constructor(title, description,id){
        this.title = title;
        this.description = description;
        this.id = id;
    }
}

const notes = [];

function addNote(){
    const title = document.getElementById("note-title").value;
    const description = document.getElementById("note-description").value;
    const id = incrementCounter();
    // const id = Math.random().toString(36).substring(7);
    const note = new Note(title, description, id);
    notes.push(note);
    saveNotesToLocalStorage();
    displayNote();
    clearForm();
}

incrementCounter = (function(){
    let counter = 0;
    return function(){
        counter += 1;
        return counter;
    }
})

function saveNote(id){
    const note = notes.find((n) => n.id === id);
    note.title = document.getElementById("note-title").value;
    note.description = document.getElementById("note-description").value;
    saveNotesToLocalStorage();
    displayNote();
    clearForm();
}

function clearForm() {
    document.getElementById("note-title").value = "";
    document.getElementById("note-description").value = "";
    document.getElementById("saveButton").onclick = addNote;
}

function displayNote(){
    const list = document.getElementById("notes-list");
    list.innerHTML = "";
    for (const note of notes) {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = note.title;
        //add edit on click
        list.appendChild(li);
    }
}

function saveNotesToLocalStorage(){
    localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
    const notesData = JSON.parse(localStorage.getItem("notes"));
    if (notesData){
        notes.push(...notesData);
    }
}

document.getElementById("note-form").addEventListener("submit", (e) => {
    e.preventDefault();
    addNote();
});

loadNotes();
displayNote();