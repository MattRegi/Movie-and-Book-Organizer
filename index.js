
//Forms for input
const bookForm = document.getElementById('book-form');
const movieForm = document.getElementById('movie-form');

//Book input variables
const titleBookInput = document.querySelector('#book-title');
const authorBookInput = document.querySelector('#book-author');
const descBookInput = document.querySelector('#book-description');
const statusBookInput = document.querySelector('#book-status');

//Movie input variables
const titleMovieInput = document.querySelector('#movie-title');
const directorMovieInput = document.querySelector('#movie-director');
const descMovieInput = document.querySelector('#movie-description');
const statusMovieInput = document.querySelector('#movie-status');

//HTML sections to edit
const bookList = document.querySelector('#book-list');
const movieList = document.querySelector('#movie-list');


//Array Declaration
let bookLibrary = [];
let movieLibrary = [];


//Controls which items are displayed. Hides the others
function onScreenDisplay(displayCheck) {
    let bookForm = document.querySelector("#book-form");
    let movieForm = document.querySelector("#movie-form");
    let bookList = document.querySelector("#book-list");
    let movieList = document.querySelector("#movie-list");

    switch (displayCheck) {
        case "#book-form":
            bookForm.style.display = "flex"
            movieForm.style.display = "none";
            bookList.style.display = "none";
            movieList.style.display = "none";
            break;
        case "#movie-form":
            bookForm.style.display = "none"
            movieForm.style.display = "flex";
            bookList.style.display = "none";
            movieList.style.display = "none";
            break;
        case "#book-list":
            bookForm.style.display = "none"
            movieForm.style.display = "none";
            bookList.style.display = "flex";
            movieList.style.display = "none";
            break;
        case "#movie-list":
            bookForm.style.display = "none"
            movieForm.style.display = "none";
            bookList.style.display = "none";
            movieList.style.display = "flex";
            break;
        default:
            break;            
    }
}

//Activates View Book List button
function bookFormDisplay() {
    let displayCheck = "#book-form";
    onScreenDisplay(displayCheck);
}

//Activates View Movie List button
function movieFormDisplay() {
    let displayCheck ="#movie-form";
    onScreenDisplay(displayCheck);
}

//Constructor for movie information
function Movie(title, director, description, status) {
    this.title = title;
    this.director = director;
    this.description= description;
    this.status = status;
}

//Constructor for book information
function Book(title, author, description, status) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.status = status;
}

//Creates a new movie
function addMovieToLibrary() {
    const newMovie = new Movie(titleMovieInput.value, directorMovieInput.value,
        descMovieInput.value, statusMovieInput.value);
        console.log("New Movie: ", newMovie);
    movieLibrary.push(newMovie);
    localStorage.setItem('movieLibrary', JSON.stringify(movieLibrary));
}

//Creates a new book
function addBookToLibrary() {
    const newBook = new Book(titleBookInput.value, authorBookInput.value,
        descBookInput.value, statusBookInput.value);
    bookLibrary.push(newBook);
    localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary));
}

//Displays the movies information to the user
function displayMovies() {
    let displayCheck = "#movie-list";
    onScreenDisplay(displayCheck);

    movieList.innerHTML = '';

    if (movieLibrary.length === 0) {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        const empty = document.createElement('h3');
        empty.textContent = "You haven't saved any movies yet! Click \"Add Movie\" to get started!"
        movieDiv.append(empty);
        movieList.append(movieDiv);
        return;
    }

    //Sorts movieLibrary by title aphabetically
    movieLibrary.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    
    //Creates movie HTML elements
    movieLibrary.forEach((movie, index) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const title = document.createElement('h3');
        title.textContent = movie.title;

        const director = document.createElement('p');
        director.textContent = `By ${movie.director}`;

        const description = document.createElement('p');
        description.textContent = movie.description;
        description.classList.add('description');

        const status = document.createElement('p');
        status.classList.add('status');

        switch (movie.status) {
            case 'watched':
                status.textContent = 'Watched';
                status.style.color = 'green';
                break;
            case 'to-be-watched':
                status.textContent = 'To Be Watched';
                status.style.color = 'red';
                break;
            case 'wishlist':
                status.textContent = 'Wishlist';
                status.style.color = 'blue'
                break;
            default:
                break;
        }

        // Delete Button for each Movie Entry
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            movieLibrary.splice(index, 1);
            localStorage.setItem('movieLibrary', JSON.stringify(movieLibrary));
            displayMovies();
        })

        // Edit Button for each Movie Entry
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            titleMovieInput.value = movie.title;
            directorMovieInput.value = movie.director;
            descMovieInput.value = movie.description;
            statusMovieInput.value = movie.status;

            // Remove the current movie from the library
            movieLibrary.splice(index, 1);
            localStorage.setItem('movieLibrary', JSON.stringify(movieLibrary));
            movieFormDisplay(); //Sends user back to movie form for edit
        })
       
        movieDiv.append(title, director, description, status, editBtn, deleteBtn);
        movieList.appendChild(movieDiv);
    })
}

//Displays the books information to user.
function displayBooks() {
    let displayCheck = "#book-list";
    onScreenDisplay(displayCheck);

    bookList.innerHTML = '';

    //gives user instructions if no books are saved yet.
    if (bookLibrary.length === 0) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        const empty = document.createElement('h3');
        empty.textContent = "You haven't saved any books yet! Click \"Add Book\" to get started!"
        bookDiv.append(empty);
        bookList.append(bookDiv);
        return;
    }
    
    //Sorts bookLibrary by title aphabetically
    bookLibrary.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    
    //Creates book HTML elements
    bookLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        

        const title = document.createElement('h3');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = `By ${book.author}`;

        const description = document.createElement('p');
        description.textContent = book.description;
        description.classList.add('description');

        const status = document.createElement('p');
        status.classList.add('status');

        switch (book.status) {
            case 'read':
                status.textContent = 'read';
                status.style.color = 'green';
                break;
            case 'reading':
                status.textContent = 'reading';
                status.style.color = 'orange';
                break;
            case 'to-be-read':
                status.textContent = 'to be read';
                status.style.color = 'red'
                break;
            default:
                break;
        }

        // Delete Button for each Book Entry
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            bookLibrary.splice(index, 1);
            localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary));
            displayBooks();
        })

        // Edit Button for each Movie Entry
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            titleBookInput.value = book.title;
            authorBookInput.value = book.author;
            descBookInput.value = book.description;
            statusBookInput.value = book.status;

            // Remove the current book from the library
            bookLibrary.splice(index, 1);
            localStorage.setItem('bookLibrary', JSON.stringify(bookLibrary));
            bookFormDisplay(); //Sends user back to book form for edit
        })
       
        bookDiv.append(title, author, description, status, editBtn, deleteBtn);
        bookList.appendChild(bookDiv);
    })
}

//Add Book Form Submit
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    bookForm.reset();
});

//Add Movie Form Submit
movieForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addMovieToLibrary();
    movieForm.reset();
});


//Checks for local storage of books and movies
if (localStorage.getItem('bookLibrary')) {
    bookLibrary = JSON.parse(localStorage.getItem('bookLibrary'));
}
if (localStorage.getItem('movieLibrary')) {
    movieLibrary = JSON.parse(localStorage.getItem('movieLibrary'));
}


// Nav bar is listed as a column for intro screen. This flips it to a top nav bar.
// Only triggers on first button clicked.
document.querySelectorAll("button").forEach(button => {
    button.addEventListener('click', () => {
    let navFlip = document.querySelector("#nav-bar");
    navFlip.style.flexDirection = "row";
    navFlip.style.width = "75%";
    navFlip.style.height = "auto";
}, { once: true });
});
