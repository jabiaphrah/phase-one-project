document.addEventListener('DOMContentLoaded', () => {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const shippingForm = document.getElementById('shippingForm');

    // Example of cart data stored in localStorage (it should be added to cart during shopping)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to display cart items
    function displayCartItems() {
        checkoutItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemCard = `
                <div class="row mb-3">
                    <div class="col-md-8">
                        <h5>${item.title}</h5>
                        <p>${item.author}</p>
                        <p>Price: Ksh ${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div class="col-md-4">
                        <p>Total: Ksh ${item.price * item.quantity}</p>
                    </div>
                </div>
            `;
            checkoutItemsContainer.innerHTML += itemCard;
            total += item.price * item.quantity;
        });

        // Update total price
        totalPriceElement.textContent = total.toFixed(2);
    }

    // Display cart items when page loads
    displayCartItems();

    // Handle form submission for shipping
    shippingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        if (name && address && paymentMethod) {
            alert(`Order Placed!\nName: ${name}\nAddress: ${address}\nPayment Method: ${paymentMethod}\nTotal: Ksh ${totalPriceElement.textContent}`);
            // Optionally, clear the cart after placing an order
            localStorage.removeItem('cart');
            // Optionally, redirect to a thank you page
            // window.location.href = 'thank-you.html';
        } else {
            alert('Please fill out all fields.');
        }
    });
});
