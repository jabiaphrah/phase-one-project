document.getElementById('addBookForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get book details from the form
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const price = parseFloat(document.getElementById('bookPrice').value);
    const genre = document.getElementById('bookGenre').value;
    const condition = document.getElementById('bookCondition').value;
    const description = document.getElementById('bookDescription').value;

    // Create a new book object
    const newBook = {
        id: Date.now(),  // Generate a unique ID based on timestamp
        title: title,
        author: author,
        price: price,
        genre: genre,
        condition: condition,
        description: description,
        image: "assets/images/default.jpg"  // Placeholder for image
    };

    // Add the new book to the "database" (db.json)
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            data.books.push(newBook);  // Add the new book to the list of books

            // Update the db.json file (for mock purposes, we'll log this)
            console.log('New book added:', newBook);
            
            // Optionally, show a confirmation message
            alert('Book added successfully!');
            
            // Clear the form
            document.getElementById('addBookForm').reset();
        })
        .catch(error => console.error('Error adding book:', error));
});
