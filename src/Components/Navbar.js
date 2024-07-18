import React, { useState } from 'react';
import { Link } from 'react-scroll';
import styles from "./Navbar.module.css";

const Navbar = () => {
    const [NavbarOpen, setNavbarOpen] = useState(false);
    const Links = [
        { id: 1, link: 'Inicio' },
        { id: 2, link: 'SobreNosotros' },
        { id: 3, link: 'NuestrosProdcutos' },
        { id: 4, link: 'Contacto' },
    ];
    return (
        <div className={styles.Navbar}>
            <p>The Real Cap Store</p>
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

