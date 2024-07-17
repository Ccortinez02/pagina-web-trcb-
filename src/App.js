
import './App.css';
import './styles.css'
import { PrimerComponente } from './components/PrimerComponente';
import { SegundoComponente } from './components/SegundoComponente';
import { TercerComponente } from './components/TercerComponente';

function App() {
    return (

<div className="App">
<header>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#"><img src="/src/img/TheRealCap(1)img.png"/></a>
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
    </header>
    <PrimerComponente></PrimerComponente>,
    <SegundoComponente></SegundoComponente>,
    <TercerComponente></TercerComponente>
        </div>
    )
}

export default App;