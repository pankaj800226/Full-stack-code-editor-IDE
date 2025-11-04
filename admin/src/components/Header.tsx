import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Menu as MenuIcon, X } from "lucide-react"; // ✅ Icons for toggle

const Header = () => {
    // MUI Profile Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const muiMenuOpen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Mobile menu toggle
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleMenu = () => setMobileOpen(!mobileOpen);

    const email = true;
    return (
        <header className="navbar">

            <motion.div
                className="navbar-container"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Logo */}
                <Link to="/" className="logo">
                    <span className="highlight">code</span>X
                </Link>

                {/* Desktop Navigation */}
                <nav className={`nav-links ${mobileOpen ? "active" : ""}`}>
                    <Link to="/courses" onClick={() => setMobileOpen(false)}>
                        Courses
                    </Link>
                </nav>

                {/* Mobile Menu Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    {mobileOpen ? <X size={28} /> : <MenuIcon size={28} />}
                </div>

                {/* Profile Dropdown (MUI) */}
                {
                    email ? (
                        <div className="profile-menu">
                            <Button
                                id="profile-button"
                                aria-controls={muiMenuOpen ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={muiMenuOpen ? "true" : undefined}
                                onClick={handleClick}
                            >
                                <p className="profile-avatar">N</p>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={muiMenuOpen}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby": "profile-button",
                                }}
                            >
                                <Link style={{ textDecoration: "none", color: "inherit" }} to="/profile">
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                </Link>

                                <Link style={{ textDecoration: "none", color: "inherit" }} to="/card">
                                    <MenuItem onClick={handleClose}>Quiz App</MenuItem>
                                </Link>

                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <Link to={'/login'}>Login</Link>
                    )
                }
            </motion.div>

        </header>
    );
};

export default Header;
