import React, { useState } from 'react';
import { Link } from 'react-scroll';
import styles from "./Navbar.module.css";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navbar = () => {
    const [NavbarOpen, SetNavbarOpen] = useState(false);
    const Links = [
        { id: 1, link: 'Inicio' },
        { id: 2, link: 'SobreNosotros' },
        { id: 3, link: 'NuestrosProductos' },
        { id: 4, link: 'Contacto' },
    ];
    return (
        <div className={NavbarOpen === true ? styles.Navbar : styles.NavbarOpen}>
            {!NavbarOpen && <p className={styles.logo}>The Real Cap Store</p>}
            {!NavbarOpen ? (
                <AiOutlineMenu onClick={() => SetNavbarOpen(!NavbarOpen)} color='#4a4564' size={25} />
            ) : (
                <AiOutlineClose onClick={() => SetNavbarOpen(!NavbarOpen)} color='#f1f1f1' size={25} />
            )}
            {
                NavbarOpen && (
                    <ul>
                        {Links.map((x) => (
                            <div>
                                <Link
                                onClick={() => SetNavbarOpen(false)}
                                to={x.link}
                                smooth
                                duration={500}
                                className={styles.Navlink}
                                >{x.link === "SobreNosotros" ? "Sobre Nosotros" : x.link}</Link>
                            </div>
                        ))}
                        
                    </ul>
                )
            }
        </div>
    )
}

export default Navbar

