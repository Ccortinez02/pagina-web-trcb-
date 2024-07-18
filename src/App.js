
import './styles.css'
import { Carrusel} from './Screens/Carrusel';
import { Productos} from './Screens/Productos';
import Encabezado from './Screens/Encabezado';
import SobreNosotros from './Screens/SobreNosotros'



function App() {
    return (

        <div className="App">
            <Encabezado></Encabezado>
            <Carrusel></Carrusel>
            <Productos></Productos>
            <SobreNosotros></SobreNosotros>
        </div>
    )
}

export default App;