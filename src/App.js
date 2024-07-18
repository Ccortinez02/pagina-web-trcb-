import logo from "./logo.svg";
import "./App.js";
import Home from "./Screens/Home";
import Carrusel from "./Screens/Carrusel";
import Clients from "./Screens/Clients";
import Contact from "./Screens/Contact";
import Products from "./Screens/Products";
import Navbar from './Components/Navbar.js';



function App() {
    return (
        <div className="App">
            <Navbar/>
            <Home/>
            <Carrusel/>
            <Products/>
            <Clients/>
            <Contact/>
        </div>
    )
}

export default App;