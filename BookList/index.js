//Book Class: Represent a book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class: Handle UI Tasks
class UI {
    static displayBooks(){

        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <a href="#" class="btn btn-outline-danger btn-sm delete">X</a>
            </td>
        `
        list.appendChild(row);
    }

    static deleteBook (el) {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className} text-light`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form)
        
        //disappear alet after 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static clearFields () {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

//Store class: Handles storage
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}


//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

///Event: Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //prevent form auto submit
    e.preventDefault();

    //Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(!title || !author || !isbn){
        UI.showAlert('Please fill all fields', 'danger')
    }else{
        const book = new Book(title, author, isbn)
    
        //add book to list
        UI.addBookToList(book)

        //save book to localstorage
        Store.addBook(book) 

        // show sucess message
        UI.showAlert('Book added', 'success')

        //clear form inputs
        UI.clearFields()
    }
})

//Event: Delete books
document.querySelector('#book-list').addEventListener('click', (e) => {
    //remove book from ui
    UI.deleteBook(e.target)

    //remove book from the localstorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // show sucess message
    UI.showAlert('Book removed', 'success')
})
