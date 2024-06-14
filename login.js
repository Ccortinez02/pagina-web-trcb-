// Function to register a new user
function registerNewUser(username, password) {
    // Get the list of users from localStorage
    let lista_usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Check if the username already exists
    if (lista_usuarios.some(user => user.username === username)) {
        alert('El usuario ya existe. Por favor, elige otro nombre de usuario.');
        return;
    }

    // Add the new user to the list
    lista_usuarios.push({ username, password });

    // Save the updated list of users to localStorage
    localStorage.setItem('usuarios', JSON.stringify(lista_usuarios));

    alert('Usuario registrado con éxito.');

    // Clear the registration form fields
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';

    // Close the registration modal
    document.getElementById('register-modal').style.display = 'none';
}

// Function to handle user login
function handleUserLogin(username, password) {
    // Get the list of users from localStorage
    let lista_usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Check if the user exists and the password is correct
    let user = lista_usuarios.find(user => user.username === username && user.password === password);

    if (user) {
        // Redirect to respective page based on user role or username
        if (username === 'admin') {
            window.location.href = '/pages/admin.html'; // Redirect admin user
        } else {
            window.location.href = '/pages/usuario.html'; // Redirect regular user
        }
    } else {
        // Display an error message if the credentials are incorrect
        alert('Usuario o contraseña incorrectos.');
    }
}

// Event listener for the login form submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    handleUserLogin(username, password);
});

// Event listener for the registration form submission
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    registerNewUser(username, password);
});

// Show registration modal
document.getElementById('show-register-modal').addEventListener('click', function () {
    document.getElementById('register-modal').style.display = 'block';
});

// Close registration modal
document.getElementById('close-register-modal').addEventListener('click', function () {
    document.getElementById('register-modal').style.display = 'none';
});

