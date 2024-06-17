// Arreglo para simular los productos en el carrito (puedes adaptarlo a tu lógica real)
// Inicialización del carrito con productos vacíos
let cart = [];

// Función para agregar productos al carrito
function addToCart(id, name, price, quantity) {
    // Verificar si el producto ya está en el carrito
    let found = cart.find(item => item.id === id);

    if (found) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        found.quantity += quantity;
    } else {
        // Si el producto no está en el carrito, agregarlo
        cart.push({ id, name, price, quantity });
    }

    // Actualizar el contador del carrito y el modal
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

// Manejo de eventos para agregar productos al carrito desde la página
$('.add-to-cart').click(function () {
    let id = $(this).data('id');
    let name = $(this).data('name');
    let price = parseFloat($(this).data('price'));
    addToCart(id, name, price, 1); // Agregar 1 unidad del producto al carrito
});

// Función para manejar clics en los botones dentro del modal del carrito
$('#cart-items').on('click', '.btn', function () {
    let id = $(this).data('id');
    let action = $(this).data('action');
    if (action === 'increment') {
        addToCart(id, null, null, 1); // Incrementar la cantidad del producto en 1
    } else if (action === 'decrement') {
        let item = cart.find(item => item.id === id);
        if (item && item.quantity > 1) {
            addToCart(id, null, null, -1); // Decrementar la cantidad del producto en 1
        }
    } else if (action === 'delete') {
        cart = cart.filter(item => item.id !== id); // Eliminar el producto del carrito
        updateCartCount();
        updateCartModal();
    }
});

// Función para manejar clics en el botón "Proceder al Pago"
$('#checkout').click(function () {
    alert('Proceder al pago: Total $' + $('#cart-total').text());
    window.location.href = '/pages/pasarela.html'; // Redirigir a la página de pasarela de compras
});


// Función para actualizar el resumen del carrito
function updateCartSummary() {
    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        let cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `<p>${item.name} x ${item.quantity}</p>`;
        cartItems.appendChild(cartItem);
    });

    totalAmount.textContent = total.toFixed(2);
}

// Función para generar y mostrar el voucher o boleta electrónica
function generateVoucher() {
    const voucherModal = document.getElementById('voucher-modal');
    const voucherDetails = document.getElementById('voucher-details');
    const closeModalButton = document.getElementById('cerrar-voucher-modal');

    // Lógica para generar el contenido del voucher (puedes personalizar esto según tus necesidades)
    let voucherContent = '<h3>Detalles del Voucher</h3>';
    voucherContent += `<p>Total de la compra: $${document.getElementById('total-amount').textContent}</p>`;
    voucherContent += '<p>Fecha de compra: ' + new Date().toLocaleDateString() + '</p>';
    voucherDetails.innerHTML = voucherContent;

    // Mostrar el modal
    voucherModal.style.display = 'block';

    // Cerrar modal al hacer clic en el botón de cerrar
    closeModalButton.addEventListener('click', function () {
        voucherModal.style.display = 'none';
    });

    // Cerrar modal si se hace clic fuera del contenido del modal
    window.addEventListener('click', function (event) {
        if (event.target == voucherModal) {
            voucherModal.style.display = 'none';
        }
    });
}

// Función principal para inicializar la página de pasarela de compras
function initCheckoutPage() {
    updateCartSummary();

    const checkoutButton = document.getElementById('checkout-button');
    checkoutButton.addEventListener('click', function () {
        generateVoucher();
    });
}

// Inicializar la página de pasarela de compras al cargar el documento
document.addEventListener('DOMContentLoaded', function () {
    initCheckoutPage();
});
