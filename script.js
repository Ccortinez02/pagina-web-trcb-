// Función para mostrar u ocultar un modal
function toggleModal(modalId, action) {
    // Mostrar u ocultar el fondo borroso
    document.getElementById("blur-background").classList.toggle("active", action === "show");

    // Mostrar u ocultar el modal especificado
    document.getElementById(modalId).style.display = action === "show" ? "block" : "none";
}

// Manejo de eventos para mostrar modales

document.getElementById("contacto-link").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    toggleModal("contacto-modal", "show");
});

// Manejo de eventos para cerrar modales
document.getElementById("cerrar-login-modal").addEventListener("click", function() {
    toggleModal("login-modal", "hide");
});

document.getElementById("cerrar-contacto-modal").addEventListener("click", function() {
    toggleModal("contacto-modal", "hide");
});

$(document).ready(function() {
    // Arreglo para almacenar los productos en el carrito
    let cart = [];

    // Función para agregar, eliminar o modificar la cantidad de productos en el carrito
    function updateCart(id, action, name, price) {
        let found = false;
        cart = cart.map(item => {
            if (item.id === id) {
                found = true;
                if (action === "increment") {
                    item.quantity++;
                } else if (action === "decrement" && item.quantity > 1) {
                    item.quantity--;
                }
                return item;
            }
            return item;
        });

        if (!found && action === "add") {
            cart.push({ id, name, price, quantity: 1 });
        } else if (action === "delete") {
            cart = cart.filter(item => item.id !== id);
        }

        updateCartCount();
        updateCartModal();
    }

    // Función para actualizar el contador del carrito en la barra de navegación
    function updateCartCount() {
        let totalCount = cart.reduce((total, item) => total + item.quantity, 0);
        $('#cart-count').text(totalCount);
    }

    // Función para actualizar y mostrar el contenido del carrito en el modal
    function updateCartModal() {
        let cartItems = $('#cart-items');
        let cartTotal = $('#cart-total');
        cartItems.empty();

        let total = 0;
        cart.forEach(item => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            let cartItem = $('<div>').addClass('cart-item');
            cartItem.append($('<p>').text(`${item.name} x ${item.quantity}`));
            let actions = $('<div>').addClass('cart-item-actions');
            actions.append($('<button>').addClass('btn btn-sm btn-info').text('+').attr('data-id', item.id).attr('data-action', 'increment'));
            actions.append($('<button>').addClass('btn btn-sm btn-warning').text('-').attr('data-id', item.id).attr('data-action', 'decrement'));
            actions.append($('<button>').addClass('btn btn-sm btn-danger').text('Eliminar').attr('data-id', item.id).attr('data-action', 'delete'));
            cartItem.append(actions);
            cartItems.append(cartItem);
        });

        cartTotal.text(total.toFixed(2));
        $('#cart-modal').show();
    }

    // Función para manejar clics en el botón Comprar en los productos
    $('.add-to-cart').click(function() {
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        updateCart(id, 'add', name, price);
    });

    // Función para manejar clics en el ícono del carrito en la barra de navegación
    $('#cart').click(function() {
        updateCartModal();
    });

    // Función para manejar clics en los botones dentro del modal del carrito
    $('#cart-items').on('click', '.btn', function() {
        let id = $(this).data('id');
        let action = $(this).data('action');
        updateCart(id, action);
    });

// Función para manejar clics en el botón "Proceder al Pago"
$('#checkout').click(function() {
    // Obtener el total del carrito
    let total = $('#cart-total').text();

    // Redirigir a la página de pasarela
    window.location.href = '/pages/pasarela.html';
});


    // Función para manejar clics en el botón "Cerrar" del modal del carrito
    $('#close-cart').click(function() {
        $('#cart-modal').hide();
    });

    // Función para inicializar el carrito al cargar la página
    function initCart() {
        let storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            cart = storedCart;
            updateCartCount();
        }
    }

    // Inicializar el carrito al cargar la página
    initCart();

    // Función para guardar el carrito en el almacenamiento local
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Guardar el carrito cada vez que se actualice
    $(window).on('beforeunload', function() {
        saveCart();
    });
});
$(document).ready(function() {
    let currentMode = ''; // Modo actual: 'crear' o 'editar'
    let currentId = ''; // ID del elemento actualmente seleccionado para editar

    const $publicacionesLista = $('#publicaciones-lista');
    const $usuariosLista = $('#usuarios-lista');
    const $publicacionForm = $('#publicacion-form');
    const $usuarioForm = $('#usuario-form');
    const $confirmModal = $('#confirm-modal');
    const $confirmMessage = $('#confirm-message');

    function cargarPublicaciones() {
        $.ajax({
            url: '/api/publicaciones',
            method: 'GET',
            success: function(response) {
                $publicacionesLista.empty();
                response.forEach(function(publicacion) {
                    $publicacionesLista.append(`<div data-id="${publicacion.id}">${publicacion.titulo}</div>`);
                });
            },
            error: function(error) {
                console.error('Error al cargar las publicaciones:', error);
            }
        });
    }

    function cargarUsuarios() {
        $.ajax({
            url: '/api/usuarios',
            method: 'GET',
            success: function(response) {
                $usuariosLista.empty();
                response.forEach(function(usuario) {
                    $usuariosLista.append(`<div data-id="${usuario.id}">${usuario.nombre} - ${usuario.email}</div>`);
                });
            },
            error: function(error) {
                console.error('Error al cargar los usuarios:', error);
            }
        });
    }

    function limpiarFormulario(formulario) {
        formulario.find('input[type="text"], input[type="email"], textarea').val('');
        currentMode = '';
        currentId = '';
    }

    cargarPublicaciones();
    cargarUsuarios();

    $('#publicaciones-link').on('click', function(event) {
        event.preventDefault();
        $('#publicaciones-section').show();
        $('#usuarios-section').hide();
    });

    $('#usuarios-link').on('click', function(event) {
        event.preventDefault();
        $('#usuarios-section').show();
        $('#publicaciones-section').hide();
    });

    // Manejadores de eventos para CRUD de Usuarios
    $('#usuarios-lista').on('click', 'div', function() {
        const id = $(this).attr('data-id');
        currentId = id;
        $('#editar-usuario-btn, #eliminar-usuario-btn').prop('disabled', false);
    });

    $('#crear-usuario-btn').on('click', function() {
        limpiarFormulario($usuarioForm);
        currentMode = 'crear';
        $('#editar-usuario-btn, #eliminar-usuario-btn').prop('disabled', true);
    });

    $('#editar-usuario-btn').on('click', function() {
        const id = currentId;
        if (id) {
            $.ajax({
                url: `/api/usuarios/${id}`,
                method: 'GET',
                success: function(response) {
                    $('#usuario-id').val(id);
                    $('#nombre').val(response.nombre);
                    $('#email').val(response.email);
                    currentMode = 'editar';
                },
                error: function(error) {
                    console.error('Error al cargar el usuario para editar:', error);
                }
            });
        }
    });

    $('#eliminar-usuario-btn').on('click', function() {
        const id = currentId;
        if (id) {
            $confirmMessage.text('¿Estás seguro de eliminar este usuario?');
            $confirmModal.modal('show');
        }
    });

    $('#confirmar-eliminar-btn').on('click', function() {
        const id = currentId;
        if (id) {
            $.ajax({
                url: `/api/usuarios/${id}`,
                method: 'DELETE',
                success: function(response) {
                    cargarUsuarios();
                    limpiarFormulario($usuarioForm);
                    $confirmModal.modal('hide');
                },
                error: function(error) {
                    console.error('Error al eliminar el usuario:', error);
                    $confirmModal.modal('hide');
                }
            });
        }
    });

    $('#cancelar-eliminar-btn').on('click', function() {
        $confirmModal.modal('hide');
    });

    // Manejador de evento para enviar formulario de usuario
    $usuarioForm.on('submit', function(event) {
        event.preventDefault();
        const nombre = $('#nombre').val();
        const email = $('#email').val();

        if (currentMode === 'crear') {
            $.ajax({
                url: '/api/usuarios',
                method: 'POST',
                data: { nombre: nombre, email: email },
                success: function(response) {
                    cargarUsuarios();
                    limpiarFormulario($usuarioForm);
                },
                error: function(error) {
                    console.error('Error al crear el usuario:', error);
                }
            });
        } else if (currentMode === 'editar') {
            const id = currentId;
            if (id) {
                $.ajax({
                    url: `/api/usuarios/${id}`,
                    method: 'PUT',
                    data: { nombre: nombre, email: email },
                    success: function(response) {
                        cargarUsuarios();
                        limpiarFormulario($usuarioForm);
                    },
                    error: function(error) {
                        console.error('Error al actualizar el usuario:', error);
                    }
                });
            }
        }
    });

});
$(document).ready(function() {
    // Arreglo para almacenar los productos en el carrito
    let cart = [];

    // Función para agregar un producto al carrito
    function addToCart(id, name, price) {
        // Verificar si el producto ya está en el carrito
        let found = false;
        for (let item of cart) {
            if (item.id === id) {
                item.quantity++;
                found = true;
                break;
            }
        }

        // Si el producto no está en el carrito, agregarlo
        if (!found) {
            cart.push({
                id: id,
                name: name,
                price: price,
                quantity: 1
            });
        }

        // Actualizar el contador del carrito en la barra de navegación
        updateCartCount();
        // Actualizar y mostrar el contenido del carrito en el modal
        updateCartModal();
    }

    // Función para actualizar el contador del carrito en la barra de navegación
    function updateCartCount() {
        let totalCount = 0;
        for (let item of cart) {
            totalCount += item.quantity;
        }
        $('#cart-count').text(totalCount);
    }

    // Función para actualizar y mostrar el contenido del carrito en el modal
    function updateCartModal() {
        let cartItems = $('#cart-items');
        let cartTotal = $('#cart-total');
        cartItems.empty();

        let total = 0;
        for (let item of cart) {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            let cartItem = $('<div>').addClass('cart-item');
            cartItem.append($('<p>').text(`${item.name} x ${item.quantity}`));
            let actions = $('<div>').addClass('cart-item-actions');
            actions.append($('<button>').addClass('btn btn-sm btn-info').text('+').attr('data-id', item.id).attr('data-action', 'increment'));
            actions.append($('<button>').addClass('btn btn-sm btn-warning').text('-').attr('data-id', item.id).attr('data-action', 'decrement'));
            actions.append($('<button>').addClass('btn btn-sm btn-danger').text('Eliminar').attr('data-id', item.id).attr('data-action', 'delete'));
            cartItem.append(actions);
            cartItems.append(cartItem);
        }

        cartTotal.text(total);
        $('#cart-modal').show();
    }

    // Función para manejar clics en el botón Comprar en los productos
    $('.add-to-cart').click(function() {
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        addToCart(id, name, price);
    });

    // Función para manejar clics en el ícono del carrito en la barra de navegación
    $('#cart').click(function() {
        updateCartModal();
    });

    // Función para manejar clics en los botones dentro del modal del carrito
    $('#cart-items').on('click', '.btn', function() {
        let id = $(this).data('id');
        let action = $(this).data('action');

        if (action === 'increment') {
            for (let item of cart) {
                if (item.id === id) {
                    item.quantity++;
                    break;
                }
            }
        } else if (action === 'decrement') {
            for (let item of cart) {
                if (item.id === id) {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        // Si la cantidad es 1, eliminar el producto del carrito
                        cart = cart.filter(item => item.id !== id);
                    }
                    break;
                }
            }
        } else if (action === 'delete') {
            // Eliminar el producto del carrito
            cart = cart.filter(item => item.id !== id);
        }

        // Actualizar y mostrar el contenido actualizado del carrito en el modal
        updateCartCount();
        updateCartModal();
    });

    // Función para manejar clics en el botón "Proceder al Pago"
    $('#checkout').click(function() {
        // Aquí puedes agregar la lógica para proceder al pago
        alert('Proceder al pago: Total $' + $('#cart-total').text());
    });

    // Función para manejar clics en el botón "Cerrar" del modal del carrito
    $('#close-cart').click(function() {
        $('#cart-modal').hide();
    });

    // Función para inicializar el carrito al cargar la página (opcional si se desea persistencia del carrito)
    function initCart() {
        let storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            cart = storedCart;
            updateCartCount();
        }
    }

    // Inicializar el carrito al cargar la página
    initCart();

    // Función para guardar el carrito en el almacenamiento local (opcional si se desea persistencia del carrito)
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Guardar el carrito cada vez que se actualice
    $(window).on('beforeunload', function() {
        saveCart();
    });
});


