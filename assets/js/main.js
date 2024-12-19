document.addEventListener('DOMContentLoaded', function () {
    const addBookForm = document.getElementById('addBookForm');
    const bookList = document.getElementById('bookList');
    const searchBar = document.getElementById('searchBar');
    const genreFilter = document.getElementById('genreFilter');
    const addBookModal = new bootstrap.Modal(document.getElementById('addBookModal'));

    let allBooks = []; // To store all books for filtering

    // Fetch existing books from db.json
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => {
            allBooks = books; // Save books in the allBooks array
            displayBooks(allBooks); // Display all books
        })
        .catch(error => console.error('Error fetching books:', error));

    // Handle search and filter functionality
    searchBar.addEventListener('input', filterBooks);
    genreFilter.addEventListener('change', filterBooks);

    addBookForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        const price = document.getElementById('bookPrice').value;
        const image = document.getElementById('bookImage').value;
        const genre = document.getElementById('bookGenre').value;
        const condition = document.getElementById('bookCondition').value;
        const description = document.getElementById('bookDescription').value;

        const newBook = {
            title,
            author,
            price,
            image,
            genre,
            condition,
            description
        };

        // Add the new book to the UI
        addBookToUI(newBook);

        // Send the new book to the server (update db.json)
        updateDB(newBook);

        // Clear the form fields
        addBookForm.reset();
        // Close the modal
        addBookModal.hide();
    });

    function addBookToUI(book) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('col-md-3', 'mb-4');
        bookCard.innerHTML = `
            <div class="card">
                <img src="${book.image}" class="card-img-top" alt="${book.title}">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author}</p>
                    <p class="card-text">${book.price} Ksh</p>
                    <p class="card-text">Condition: ${book.condition}</p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#bookDetailsModal" 
                            onclick="showBookDetails(${book.id})" id="viewDetailsBtn-${book.id}">View Details</button>
                </div>
            </div>
        `;
        bookList.appendChild(bookCard);
    }

    function showBookDetails(bookId) {
        // Fetch the book details from the server
        fetch(`http://localhost:3000/books/${bookId}`)
            .then(response => response.json())
            .then(book => {
                // Populate the modal with book details
                document.getElementById('bookDetailsModalLabel').innerText = book.title;
                document.getElementById('bookTitle').innerText = book.title;
                document.getElementById('bookAuthor').innerText = book.author;
                document.getElementById('bookDescription').innerText = book.description;
                document.getElementById('bookPrice').innerText = book.price;
                document.getElementById('bookCondition').innerText = book.condition;
                document.getElementById('bookImage').src = book.image;

                // Optionally, add 'Add to Cart' functionality here
                document.getElementById('addToCartBtn').onclick = function() {
                    // Handle add to cart logic here
                    console.log('Added to cart:', book);
                };
            })
            .catch(error => {
                console.error('Error fetching book details:', error);
            });
    }

    function updateDB(book) {
        fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(book),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Book added successfully:', data);
        })
        .catch(error => {
            console.error('Error adding book:', error);
        });
    }

    // Function to filter and display books based on search and genre
    function filterBooks() {
        const searchQuery = searchBar.value.toLowerCase();
        const selectedGenre = genreFilter.value.toLowerCase();

        // Filter books based on search query and genre
        const filteredBooks = allBooks.filter(book => {
            const titleMatch = book.title.toLowerCase().includes(searchQuery);
            const genreMatch = selectedGenre === '' || book.genre.toLowerCase() === selectedGenre;

            return titleMatch && genreMatch;
        });

        // Display filtered books
        displayBooks(filteredBooks);
    }

    // Function to display books in the UI
    function displayBooks(books) {
        bookList.innerHTML = ''; // Clear existing book list

        // Add each book to the UI
        books.forEach(book => addBookToUI(book));
    }
});
