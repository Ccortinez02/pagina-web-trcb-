import React from 'react'

const Encabezado = () => {
    return (
        
        <div>
            <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#"></a>
                        </div>
                        <ul class="nav navbar-nav">
                            <li><a href="/src/pages/catalogo.html">Catálogo</a></li>
                            <li><a href="#" id="contacto-link">Contacto</a></li>
                            <li><a href="#sobre-nosotros">Nosotros</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="/src/pages/login.html" id="iniciar-sesion"><span
                                class="glyphicon glyphicon-log-in"></span>
                                Iniciar Sesión</a></li>
                            <li><a href="#" class="cart-icon" id="cart"><span class="glyphicon glyphicon-shopping-cart"></span>
                                Carrito (<span id="cart-count">0</span>)</a></li>
                        </ul>
                    </div>
                </nav>
        </div>
    )
}

export default Encabezado