var library = function () {
    let myLibrary = [];

    const bookContainer = document.getElementById('bookContainer');

    function _getBookIndex(event) {
        let index = parseInt(event.target.id.split('-')[1]);
        return index;
    }

    function _cardInnerHTML(title, author, numPages, readvar, index) {
        let html = `
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

        return html;
    }

    function _render() {
        bookContainer.innerHTML = '';

        for (let i = 0; i < myLibrary.length; i++) {
            const readvar = (myLibrary[i].hasRead) ? 'Read' : 'Unread';

            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.innerHTML = _cardInnerHTML(
                myLibrary[i].title,
                myLibrary[i].author,
                myLibrary[i].numPages,
                readvar,
                i
            );
            bookContainer.appendChild(card);
        }
    }

    function addBookToLibrary() {
        title = document.getElementById('bookTitle').value;
        author = document.getElementById('bookAuthor').value;
        numPages = parseInt(document.getElementById('bookNumPages').value);
        hasRead = document.getElementById('bookHasRead').checked;

        myLibrary.push({ title, author, numPages, hasRead });
        _render();
    }

    function removeBookFromLibrary(event) {
        myLibrary[_getBookIndex(event)] = myLibrary[myLibrary.length - 1];
        myLibrary.pop();
        _render();
    }

    function changeReadStatus(event) {
        myLibrary[_getBookIndex(event)].hasRead = !myLibrary[_getBookIndex(event)].hasRead;
        _render();
    }

    return { addBookToLibrary, removeBookFromLibrary, changeReadStatus };
};

var form = (function () {
    const dialog = document.querySelector("dialog");
    const addBookBtn = document.getElementById('addBookBtn');
    const formCancel = document.getElementById('formCancel');
    const bookSubmit = document.getElementById('bookSubmit');
    const bookContainer = document.getElementById('bookContainer');

    const { addBookToLibrary, removeBookFromLibrary, changeReadStatus } = library();

    function displayForm() {
        dialog.showModal();
    }

    function hideForm() {
        dialog.close();
        document.getElementById('addBookForm').reset();
    }

    addBookBtn.addEventListener('click', displayForm);
    formCancel.addEventListener('click', hideForm);
    bookSubmit.addEventListener('click', () => {
        addBookToLibrary();
        hideForm();
    });
    bookContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('read')) {
            changeReadStatus(event);
        }
        if (event.target.classList.contains('remove')) {
            removeBookFromLibrary(event);
        }
    })
})();