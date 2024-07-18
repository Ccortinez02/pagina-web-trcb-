import React from 'react'

const Contacto = () => {
    return (
        <div>
            <div id="contacto-modal" class="modal">
            <div class="modal-content" style="top: 30%;">
                <span id="cerrar-contacto-modal" class="close">&times;</span>
                <h2>Contacto</h2>
                <p>Ingrese su correo y lo contactaremos lo mas pronto posible</p><input type="email"
                    placeholder="sucorreo@email.com"/>
                <button type="submit" style="padding: 1px;">Enviar</button>
            </div>
        </div>
        </div>
    )
}

export default Contacto
