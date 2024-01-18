class Library {
    #myLibrary;
    #bookContainer;

    constructor() {
        this.#myLibrary = [];
        this.#bookContainer = document.getElementById('bookContainer');
    }

    #getBookIndex(event) {
        // Extract the index from the event target's ID
        const index = parseInt(event.target.id.split('-')[1]);
        return index;
    }

    #cardInnerHTML(title, author, numPages, readvar, index) {
        // Generate the HTML for a book card
        return `
            <div class="info">
                <h1>${title}</h1>
                <h2>${author}</h2>
                <h3>${numPages} pages</h3>
                <hr>
            </div>
            <div class="buttons">
                <button type="button" class="read" id="read-${index}" value="${readvar}">${readvar}</button>
                <button type="button" class="remove" id="remove-${index}">Remove</button>
            </div>
        `;
    }

    #render() {
        // Clear and re-render the book container
        this.#bookContainer.innerHTML = '';

        for (let i = 0; i < this.#myLibrary.length; i++) {
            const { title, author, numPages, hasRead } = this.#myLibrary[i];
            const readvar = hasRead ? 'Read' : 'Unread';

            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.innerHTML = this.#cardInnerHTML(title, author, numPages, readvar, i);
            this.#bookContainer.appendChild(card);
        }
    }

    addBookToLibrary(title, author, numPages, hasRead) {
        // Add a book to the library and re-render
        this.#myLibrary.push({ title, author, numPages, hasRead });
        this.#render();
    }

    removeBookFromLibrary(event) {
        // Remove a book from the library and re-render
        const index = this.#getBookIndex(event);
        this.#myLibrary[index] = this.#myLibrary[this.#myLibrary.length - 1];
        this.#myLibrary.pop();
        this.#render();
    }

    changeReadStatus(event) {
        // Toggle the read status of a book and re-render
        const index = this.#getBookIndex(event);
        this.#myLibrary[index].hasRead = !this.#myLibrary[index].hasRead;
        this.#render();
    }
}

// Immediately invoked function expression (IIFE) for form handling
(function () {
    const dialog = document.querySelector("dialog");
    const addBookBtn = document.getElementById('addBookBtn');
    const formCancel = document.getElementById('formCancel');
    const bookSubmit = document.getElementById('bookSubmit');
    const bookContainer = document.getElementById('bookContainer');

    const lib = new Library();

    function displayForm() {
        // Show the form dialog
        dialog.showModal();
    }

    function hideForm() {
        // Close the form dialog and reset the form
        dialog.close();
        document.getElementById('addBookForm').reset();
    }

    function handleBookSubmit() {
        // Handle book submission from the form
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const numPages = parseInt(document.getElementById('bookNumPages').value);
        const hasRead = document.getElementById('bookHasRead').checked;

        lib.addBookToLibrary(title, author, numPages, hasRead);
        hideForm();
    }

    // Event listeners
    addBookBtn.addEventListener('click', displayForm);
    formCancel.addEventListener('click', hideForm);
    bookSubmit.addEventListener('click', handleBookSubmit);
    bookContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('read')) {
            lib.changeReadStatus(event);
        }
        if (event.target.classList.contains('remove')) {
            lib.removeBookFromLibrary(event);
        }
    });
})();
