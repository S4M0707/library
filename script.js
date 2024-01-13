let myLibrary = [];

function Book(title, author, numPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
}

function getEventIndex(event) {
    let index = parseInt(event.target.id.split('-')[1]);
    return index;
}

function addBookToLibrary() {
    title = document.getElementById('bookTitle').value;
    author = document.getElementById('bookAuthor').value;
    numPages = parseInt(document.getElementById('bookNumPages').value);
    hasRead = document.getElementById('bookHasRead').checked;

    myLibrary.push(new Book(title, author, numPages, hasRead));
}

function removeBookFromLibrary(index) {
    myLibrary[index] = myLibrary[myLibrary.length - 1];
    myLibrary.pop();
}

function changeReadStatus(index) {
    myLibrary[index].hasRead = !myLibrary[index].hasRead;
}

function displayBook() {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';

    for (let i = 0; i < myLibrary.length; i++) {
        const readvar = (myLibrary[i].hasRead) ? 'Read' : 'Unread';
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.innerHTML = `
            <div class="info">
                <h1>${myLibrary[i].title}</h1>
                <h2>${myLibrary[i].author}</h2>
                <h3>${myLibrary[i].numPages} pages</h3>
                <hr>
            </div>
            <div class="buttons">
                <button type="button" class="read" id="read-${i}" value="${readvar}">${readvar}</button>
                <button type="button" class="remove" id="remove-${i}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <title>delete-outline</title>
                        <path
                            d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                    </svg>
                </button>
            </div>
        `;
        bookContainer.appendChild(card);

        card.querySelector('.remove').addEventListener('click', (event) => {
            removeBookFromLibrary(getEventIndex(event));
            displayBook();
        });
        card.querySelector('.read').addEventListener('click', (event) => {
            changeReadStatus(getEventIndex(event));
            displayBook();
        });
    }
}

const dialog = document.querySelector("dialog");

function displayForm() {
    dialog.showModal();
}

function hideForm() {
    dialog.close();
    document.getElementById('addBookForm').reset();
}

const addBookBtn = document.getElementById('addBookBtn');
addBookBtn.addEventListener('click', displayForm);

const formCancel = document.getElementById('formCancel');
const bookSubmit = document.getElementById('bookSubmit');

formCancel.addEventListener('click', hideForm);
bookSubmit.addEventListener('click', () => {
    addBookToLibrary();
    displayBook();
    hideForm();
});