import React, { useState } from 'react';
import { Link } from 'react-scroll';
import styles from "./Navbar.module.css";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
    const [NavbarOpen, SetNavbarOpen] = useState(false);
    const Links = [
        { id: 1, link: 'Inicio' },
        { id: 2, link: 'SobreNosotros' },
        { id: 3, link: 'NuestrosProdcutos' },
        { id: 4, link: 'Contacto' },
    ];
    return (
        <div className={NavbarOpen === true ? styles.Navbar : styles.NavbarOpen}>
            <p>The Real Cap Store</p>
            <AiOutlineMenu onClick={() => SetNavbarOpen(!NavbarOpen)} size={25}/>
            {!NavbarOpen && <AiOutlineClose/>} 
            {
                NavbarOpen &&
                <ul>
                    {Links.map((x) => (
                        <div>
                            <Link>{x.link === "SobreNosotros" ? "Sobre Nosotros" : x.link}</Link>
                        </div>
                    ))}
                </ul>
            }
        </div>
    )
}

export default Navbar

