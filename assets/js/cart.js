// cart.js

// Retrieve cart items from localStorage (or initialize as an empty array if not present)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items on the page
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItemsContainer.innerHTML = '';  // Clear current cart items

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = `
            <div class="d-flex justify-content-between mb-3">
                <div>${item.title} - $${item.price}</div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItem;
        totalPrice += item.price;
    });

    // Update total price display
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to add an item to the cart
function addToCart(bookId) {
    // Fetch the book details from the server
    fetch(`http://localhost:4000/books/${bookId}`)
        .then(response => response.json())
        .then(book => {
            // Check if the book is already in the cart
            const existingBook = cart.find(item => item.id === book.id);
            if (existingBook) {
                alert('This book is already in your cart.');
            } else {
                cart.push(book); // Add the book to the cart array
                localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
                renderCart(); // Re-render the cart
                alert('Book added to cart!');
            }
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
        });
}

// Function to remove an item from the cart
function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId); // Remove book from cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    renderCart(); // Re-render the cart
}

// Function to handle checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to checkout...');
        // Redirect to a checkout page or payment gateway, if implemented
    }
}

// Event listener for the "View Cart" button
document.addEventListener('DOMContentLoaded', function () {
    const viewCartButton = document.querySelector('.view-cart-btn');
    if (viewCartButton) {
        viewCartButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
            } else {
                renderCart(); // Render the cart when clicking on "View Cart"
                // You can show the cart modal here if you are using modals
            }
        });
    }
});

// Initialize and render the cart when the page loads
renderCart();
