// Function to fetch registered users from localStorage
function fetchRegisteredUsers() {
    let lista_usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return lista_usuarios;
}

// Function to populate the user table
function populateUserTable() {
    let lista_usuarios = fetchRegisteredUsers();
    let tableBody = document.getElementById('tabla-usuarios').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear existing rows

    for (let usuario of lista_usuarios) {
        let row = document.createElement('tr');

        let usernameCell = document.createElement('td');
        usernameCell.textContent = usuario.username;
        row.appendChild(usernameCell);

        let passwordCell = document.createElement('td');
        passwordCell.textContent = '********'; // Hide the password for security
        row.appendChild(passwordCell);

        let actionsCell = document.createElement('td');
        actionsCell.innerHTML = `
            <div class="btn-group">
                <button class="btn btn-warning btn-sm" onclick="updateUser('${usuario.username}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${usuario.username}')">Eliminar</button>
            </div>
        `;
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    }
}

// Function to register a new user
function registerNewUser(username, password) {
    let lista_usuarios = fetchRegisteredUsers();

    if (lista_usuarios.some(user => user.username === username)) {
        alert('El usuario ya existe. Por favor, elige otro nombre de usuario.');
        return;
    }

    let fechaRegistro = new Date().toLocaleDateString('es-ES');

    lista_usuarios.push({ username, password, fechaRegistro, historialCompras: [] });

    localStorage.setItem('usuarios', JSON.stringify(lista_usuarios));

    alert('Usuario registrado con éxito.');

    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    populateUserTable(); // Update table

    // Close the registration modal after successful registration
    document.getElementById('register-modal').style.display = 'none';
}

// Event listener to show registration modal
document.getElementById('show-register-modal').addEventListener('click', () => {
    document.getElementById('register-modal').style.display = 'block';
});

// Event listener to close registration modal
document.getElementById('close-register-modal').addEventListener('click', () => {
    document.getElementById('register-modal').style.display = 'none';
});

// Event listener for registration form submission
document.getElementById('register-form').addEventListener('submit', (event) => {
    event.preventDefault();
    let username = document.getElementById('register-username').value.trim();
    let password = document.getElementById('register-password').value.trim();
    registerNewUser(username, password);
});

// Function to delete a user
function deleteUser(username) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        let lista_usuarios = fetchRegisteredUsers();
        lista_usuarios = lista_usuarios.filter(user => user.username !== username);
        localStorage.setItem('usuarios', JSON.stringify(lista_usuarios));
        populateUserTable();
    }
}

// Function to handle user update (not implemented here)
function updateUser(username) {
    alert(`Implementar lógica para actualizar usuario: ${username}`);
}

// Call populateUserTable on page load
window.addEventListener('load', populateUserTable);


