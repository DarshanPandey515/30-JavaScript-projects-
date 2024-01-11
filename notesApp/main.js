const createBtn = document.getElementById('create-note');
const notesContainer = document.getElementById('notes');
let notes = document.querySelectorAll('.input-box');

function showNotes() {
    notesContainer.innerHTML = localStorage.getItem('notes');
}
showNotes();



function showCountdownAlert(message, seconds) {
    const alertMessage = document.getElementById('message');
    alertMessage.textContent = message;
    alertMessage.style.display = 'block';

    const countdownInterval = setInterval(() => {
        seconds--;
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            alertMessage.style.display = 'none';
        } else {
            alertMessage.textContent = `${message} - ${seconds}`;
        }
    }, 1000);
}




function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');
    inputBox.className = 'input-box';
    inputBox.setAttribute("contenteditable", "true");
    img.src = '/notesApp/images/delete.svg';
    notesContainer.appendChild(inputBox).appendChild(img);

    const message = 'successfully created note.'
    const time = 3;
    showCountdownAlert(message,time);

    updateStorage();
})


notesContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
        const message = 'successfully deleted note.'
        const time = 3;
        showCountdownAlert(message,time);
    } else if (e.target.tagName === 'P') {
        notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = function () {
                updateStorage();
            }
        })
    }
})


document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
})