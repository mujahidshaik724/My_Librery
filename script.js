document.getElementById('add-book-btn').addEventListener('click', showForm);
document.getElementById('book-form').addEventListener('submit', addBook);
document.getElementById('cancel').addEventListener('click', resetForm);

let library = [];
let editIndex = null;

function Book(name, pages, read) {
    this.name = name;
    this.pages = pages;
    this.read = read;
}

function showForm() {
    document.getElementById('book-form').style.display = 'block';
    document.getElementById('add-book-btn').style.display = 'none';
}

function addBook(event) {
    event.preventDefault();

    const bookName = document.getElementById('book-name').value;
    const bookPages = document.getElementById('book-pages').value;
    const bookRead = document.getElementById('book-read').checked;

    if (editIndex !== null) {
        library[editIndex] = new Book(bookName, bookPages, bookRead);
        displayBooks();
        editIndex = null;
    } else {
        const newBook = new Book(bookName, bookPages, bookRead);
        library.push(newBook);
        displayBook(newBook);
    }
    resetForm();
}

function displayBook(book) {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';

    const bookDetails = document.createElement('div');
    bookDetails.innerHTML = `Book Name: <strong>${book.name}</strong><br>Pages: ${book.pages}<br>Read: ${book.read ? 'Yes' : 'No'}`;
    bookCard.appendChild(bookDetails);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className="edit-btn";
    editButton.addEventListener('click', () => {
        document.getElementById('book-name').value = book.name;
        document.getElementById('book-pages').value = book.pages;
        document.getElementById('book-read').checked = book.read;
        document.getElementById('book-form').style.display = 'block';
        document.getElementById('add-book-btn').style.display = 'none';
        editIndex = library.indexOf(book);
    });
    buttonContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className="delete-btn";
    deleteButton.addEventListener('click', () => {
        const index = library.indexOf(book);
        if (index !== -1) {
            library.splice(index, 1);
            bookCard.remove();
        }
    });
    buttonContainer.appendChild(deleteButton);

    bookCard.appendChild(buttonContainer);
    document.getElementById('book-list').appendChild(bookCard);
}

function displayBooks() {
    document.getElementById('book-list').innerHTML = '';
    library.forEach(displayBook);
}

function resetForm() {
    document.getElementById('book-form').style.display = 'none';
    document.getElementById('add-book-btn').style.display = 'block';
    document.getElementById('book-name').value = '';
    document.getElementById('book-pages').value = '';
    document.getElementById('book-read').checked = false;
}
