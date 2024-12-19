document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');  // Add a message element to display login status

    // Register new user
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        const newUser = {
            email,
            password
        };

        // Send the new user data to the server (add to db.json)
        registerUser(newUser);

        // Clear the form fields
        registerForm.reset();
        // Close the modal
        const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
        registerModal.hide();
    });

    // Login user
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Authenticate user
        loginUser(email, password);
    });

    function registerUser(user) {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            console.log('User registered successfully:', data);
        })
        .catch(error => {
            console.error('Error registering user:', error);
        });
    }

    function loginUser(email, password) {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    displayLoginMessage('Login successful!', 'success');
                    // You can add redirect or additional logic here
                } else {
                    displayLoginMessage('Invalid login details', 'danger');
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
                displayLoginMessage('An error occurred. Please try again later.', 'danger');
            });
    }

    function displayLoginMessage(message, type) {
        if (loginMessage) {
            loginMessage.textContent = message;
            loginMessage.className = `alert alert-${type}`;
            loginMessage.style.display = 'block';
        }
    }

    // For testing: display all users
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => console.log(user));
        })
        .catch(error => console.error('Error fetching users:', error));
});
