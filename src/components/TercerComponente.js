import React from "react";

export const TercerComponente = () => {
    return (
        <div class="cart-modal" id="cart-modal">
            <h2>Carrito de Compras</h2>
            <div id="cart-items"></div>
            <h3>Total: $<span id="cart-total">0</span></h3>
            <button class="btn btn-success" id="checkout">Proceder al Pago</button>
            <button class="btn btn-danger close-cart" id="close-cart">Cerrar</button>
        </div>
        );
}