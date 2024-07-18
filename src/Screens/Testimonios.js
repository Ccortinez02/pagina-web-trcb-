import React from 'react'

const Testimonios = () => {
    return (
        <div>
            <section id="testimonios" class="container">
            <h2 class="text-center">Lo que dicen nuestros clientes</h2>
            <div class="card-columns">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Juan Pérez</h4>
                        <h6 class="card-subtitle mb-2 text-muted">Santiago</h6>
                        <p class="card-text">¡Excelente calidad y servicio! Recomendado al 100%.</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">María Gómez</h4>
                        <h6 class="card-subtitle mb-2 text-muted">Valparaíso</h6>
                        <p class="card-text">Me encantó el diseño de los gorros. Muy cómodos.</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Pedro Sánchez</h4>
                        <h6 class="card-subtitle mb-2 text-muted">Concepción</h6>
                        <p class="card-text">Gran variedad de productos y a buen precio.</p>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}

export default Testimonios
