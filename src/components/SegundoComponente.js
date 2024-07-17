import React from "react";

export const SegundoComponente = () => {
    return (
        <section id="productos" class="container">
            <h2 class="text-center">Nuestros Productos</h2>
            <div class="row">
                <div class="col-sm-4">
                    <div class="card">
                        <img class="card-img-top"
                            src="/public/img/Imagen de WhatsApp 2024-01-07 a las 21.57.59_831aa0cf.jpg"
                            alt="Gorro Deportivo" />
                        <div class="card-body">
                            <h4 class="card-title">Gorro Deportivo</h4>
                            <p class="card-text">Ideal para actividades al aire libre. <br />Precio: $19.990</p>
                            <button class="btn btn-primary add-to-cart" data-id="1" data-name="Gorro Deportivo"
                                data-price="19990">Comprar</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                        <img class="card-img-top"
                            src="/public/img/Imagen de WhatsApp 2024-01-07 a las 21.58.00_c4af29e8.jpg"
                            alt="Gorro Casual" />
                        <div class="card-body">
                            <h4 class="card-title">Gorro Casual</h4>
                            <p class="card-text">Perfecto para el uso diario. <br />Precio: $19.990</p>
                            <button class="btn btn-primary add-to-cart" data-id="2" data-name="Gorro Casual"
                                data-price="19990">Comprar</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                        <img class="card-img-top"
                            src="/public/img/Imagen de WhatsApp 2024-01-07 a las 21.58.01_494d9180.jpg"
                            alt="Gorro de Invierno" />
                        <div class="card-body">
                            <h4 class="card-title">Gorro de Invierno</h4>
                            <p class="card-text">Mantén tu cabeza abrigada en invierno. <br />Precio: $19.990</p>
                            <button class="btn btn-primary add-to-cart" data-id="3" data-name="Gorro de Invierno"
                                data-price="19990">Comprar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}