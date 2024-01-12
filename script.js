const myLibrary = [];

function Book(title, author, numPages, hasRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.hasRead = hasRead;
}

function addBookToLibrary() {
    title = "apple";
    author = "author";
    numPages = 5;
    hasRead = false;
    
    myLibrary.push(new Book(title, author, numPages, hasRead));
}

addBookToLibrary();
addBookToLibrary();

console.log(myLibrary);