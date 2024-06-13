// Función para mostrar el cuadro modal de inicio de sesión
function mostrarLoginModal() {
    // Mostrar el fondo borroso
    document.getElementById("blur-background").classList.add("active");

    // Mostrar el cuadro modal de inicio de sesión
    document.getElementById("login-modal").style.display = "block";
}

// Función para ocultar el cuadro modal de inicio de sesión
function ocultarLoginModal() {
    // Ocultar el fondo borroso
    document.getElementById("blur-background").classList.remove("active");

    // Ocultar el cuadro modal de inicio de sesión
    document.getElementById("login-modal").style.display = "none";
}

// Función para mostrar el cuadro modal de contacto
function mostrarContactoModal() {
    // Mostrar el fondo borroso
    document.getElementById("blur-background").classList.add("active");

    // Mostrar el cuadro modal de contacto
    document.getElementById("contacto-modal").style.display = "block";
}

// Función para ocultar el cuadro modal de contacto
function ocultarContactoModal() {
    // Ocultar el fondo borroso
    document.getElementById("blur-background").classList.remove("active");

    // Ocultar el cuadro modal de contacto
    document.getElementById("contacto-modal").style.display = "none";
}

// Evento de clic en el enlace "Iniciar Sesión"
document.getElementById("iniciar-sesion").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarLoginModal();
});

// Evento de clic en el enlace "Contacto"
document.getElementById("contacto-link").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    mostrarContactoModal();
});

// Evento de clic en el botón "Cerrar" del cuadro modal de inicio de sesión
document.getElementById("cerrar-login-modal").addEventListener("click", function() {
    ocultarLoginModal();
});

// Evento de clic en el botón "Cerrar" del cuadro modal de contacto
document.getElementById("cerrar-contacto-modal").addEventListener("click", function() {
    ocultarContactoModal();
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

