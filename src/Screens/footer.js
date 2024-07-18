import React from 'react'

const footer = () => {
    return (
        <div>
            <footer class="footer-dark">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 col-md-3">
                    <h3>Contacto</h3>
                    <p>Email: <a href="mailto:contacto@therealcapbrand.cl">contacto@therealcapbrand.cl</a></p>
                    <p>Teléfono: <a href="tel:+56912345678">+56 9 1234 5678</a></p>
                </div>
                <div class="col-sm-6 col-md-3">
                    <h3>Ubicación</h3>
                    <p>Avenida Siempre Viva 123, Santiago, Chile</p>
                </div>
                <div class="col-sm-6 col-md-3">
                    <h3>Síguenos</h3>
                    <a href="#"><i class="fa fa-facebook"></i> Facebook</a><br/>
                    <a href="#"><i class="fa fa-twitter"></i> Twitter</a><br/>
                    <a href="#"><i class="fa fa-instagram"></i> Instagram</a>
                </div>
            </div>
            <p class="rights">© 2024 TheRealCapBrand. Todos los derechos reservados. <br/>
                <a href="#">Términos y Condiciones</a> | <a href="#">Nuestras Políticas</a>
            </p>
        </div>
    </footer>
        </div>
    )
}

export default footer
