import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as React from "react";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { MenuIcon, X } from "lucide-react";



const Header = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Mobile menu toggle
    const [mobileOpen, setMobileOpen] = useState(false);
    const toggleMenu = () => setMobileOpen(!mobileOpen);
    const navigate = useNavigate()

    const email = localStorage.getItem('EMAIL')

    const logOut = () => {
        localStorage.clear()
        navigate('/login')
    }
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
                    <span className="highlight">Code</span>X
                </Link>

                {/* Desktop Navigation */}
                <nav className={`nav-links ${mobileOpen ? "active" : ""}`}>
                    <Link to="/resume" onClick={() => setMobileOpen(false)}>
                        Resume
                    </Link>

                    <Link to="/newProject" onClick={() => setMobileOpen(false)}>
                        CodePen
                    </Link>
                </nav>

                {/* Mobile Menu Icon */}
                <div className="menu-icon" onClick={toggleMenu}>
                    {mobileOpen ? <X size={28} /> : <MenuIcon size={28} />}
                </div>

                {/* Profile Dropdown (MUI) */}
                {
                    email ? (
                        <React.Fragment>
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}>
                                            {email.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                slotProps={{
                                    paper: {
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >

                                <Link to={'/profile'}>
                                    <MenuItem onClick={handleClose}>
                                        My account
                                    </MenuItem>
                                </Link>
                                <Divider />

                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={logOut}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    ) : (
                        <Link to={'/login'}>Login</Link>
                    )
                }
            </motion.div>

        </header>
    );
};

export default Header;
