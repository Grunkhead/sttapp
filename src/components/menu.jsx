import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const sidebarContent = {
    open: {
        opacity: 1,
        x: 0,
    },
    closed: {
        opacity: 0,
        x: "-100%",
    }
}

const sidebar = {
    open: {
        background: "var(--primary-dark)",
    },
    closed: {
        background: "none",
    },
}

function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    function toggle() {
        setIsOpen(!isOpen);
    }

    return (
        <motion.nav animate={isOpen ? "open" : "closed"} variants={sidebar}>
            <button onClick={toggle}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24">
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d={
                        !isOpen
                        ? "M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"
                        : "M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                    } />
                </svg>
            </button>
            <motion.div animate={isOpen ? "open" : "closed"} variants={sidebarContent}>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">Over ons</Link>
                    </li>
                </ul>
            </motion.div>
        </motion.nav>
    );
}

export default Menu;