// Sample filteredBooks data (you can replace this with actual data)
const filteredBooks = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A novel about the American dream and the disillusionment that follows.',
        price: 500,
        condition: 'Used',
    },
    {
        id: 2,
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel exploring the dangers of totalitarianism.',
        price: 400,
        condition: 'New',
    },
    // Add more books here
];

// Function to render books dynamically
function renderBooks(filteredBooks) {
    const booksList = document.getElementById('bookList');
    booksList.innerHTML = '';  // Clear current book list

    filteredBooks.forEach(book => {
        const bookCard = `
            <div class="col-md-3 mb-4">
                <div class="card">
                    <img src="assets/images/default.jpg" class="card-img-top" alt="${book.title}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.description}</p>
                        <p><strong>Price:</strong> Ksh ${book.price}</p>
                        <p><strong>Condition:</strong> ${book.condition}</p>
                        <button class="btn btn-info" onclick="viewDetails(${book.id})">View Details</button>
                    </div>
                </div>
            </div>
        `;
        booksList.innerHTML += bookCard;
    });
}

// Function to display book details in the modal
function viewDetails(bookId) {
    const book = filteredBooks.find(item => item.id === bookId);

    // Populate modal with book details
    document.getElementById('bookTitle').textContent = `Title: ${book.title}`;
    document.getElementById('bookAuthor').textContent = `Author: ${book.author}`;
    document.getElementById('bookDescription').textContent = `Description: ${book.description}`;
    document.getElementById('bookPrice').textContent = book.price;
    document.getElementById('bookCondition').textContent = book.condition;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('bookDetailsModal'));
    modal.show();
}

// Initial render of books
renderBooks(filteredBooks);
