import React from "react";

export const PrimerComponente = () => {
    return (
        <section id="banner">
            <div id="bannerCarousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#bannerCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#bannerCarousel" data-slide-to="1"></li>
                    <li data-target="#bannerCarousel" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="item active">
                        <img src="/src/img/desktop-wavy-chain-stitch-1920x750.png" alt="Gorros de Moda 1"/>
                    </div>
                    <div class="item">
                        <img src={require=("/src/img/desktop-color-pack-2-1920x750.png")} alt="Gorros de Moda 2"/>
                    </div>
                </div>
                <a class="left carousel-control" href="#bannerCarousel" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                    <span class="sr-only">Anterior</span>
                </a>
                <a class="right carousel-control" href="#bannerCarousel" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                    <span class="sr-only">Siguiente</span>
                </a>
            </div>
        </section>
        );
}