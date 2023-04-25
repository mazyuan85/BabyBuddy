import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Container, Divider } from '@mui/material';
import * as userService from "../../utilities/users-service"
import ChildCareIcon from '@mui/icons-material/ChildCare';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import NavBarDrawer from '../NavBarDrawer/NavBarDrawer';
import { isTokenValid } from '../../utilities/users-service';

export default function NavBar({user, setUser}) {
  const navigate = useNavigate();
  const [isSessionValid, setIsSessionValid] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [loginMenuAnchorEl, setLoginMenuAnchorEl] = React.useState(null);
  const isLoginMenuOpen = Boolean(loginMenuAnchorEl);

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (!isTokenValid() && isSessionValid) {
        setIsSessionValid(false);
        setUser(null);
      } else if (isTokenValid() && !isSessionValid) {
        setIsSessionValid(true);
      }
    };
    const intervalId = setInterval(checkTokenValidity, 30 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [isSessionValid, setUser]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = (callback) => {
    setMobileMoreAnchorEl(null);
    if (typeof callback === "function") {
      callback();
    }
  };

  const handleMenuClose = (callback) => {
    setAnchorEl(null);
    if (typeof callback === "function") {
      callback();
    }
  };

  const handleLoginMenuOpen = (event) => {
    setLoginMenuAnchorEl(event.currentTarget);
  };

  const handleLoginMenuClose = (callback) => {
    setLoginMenuAnchorEl(null);
    if (callback) {
      callback();
    }
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = async () => {
    handleMenuClose();
    handleMobileMenuClose();
    userService.logOut();
    setUser(null);
    navigate("/");
  };

  const loggedInMenuId = 'logged-in-menu';
  const renderLoggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={loggedInMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem key="my-babies" onClick={() => handleMenuClose(() => navigate("/main/mybabies"))}>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="logged-in-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ChildCareIcon />
          </IconButton>
          <p>My Babies</p>
      </MenuItem>
      <Divider key="divider1"/>
      <MenuItem key="log-out" onClick={handleLogOut}>
        <IconButton
          size="large"
          aria-label="logout"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const loginMenuId = "login-menu";
  const renderLoginMenu = (
    <Menu
      anchorEl={loginMenuAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={loginMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isLoginMenuOpen}
      onClose={() => handleLoginMenuClose()}
    >
      <MenuItem
        key="log-in"
        onClick={() => handleLoginMenuClose(() => navigate("/users/login"))}
      >
        <IconButton
          size="large"
          aria-label="login"
          color="inherit"
        >
          <LoginIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
      <Divider key="divider2"/>
      <MenuItem
        key="signup"
        onClick={() => handleLoginMenuClose(() => navigate("/users/signup"))}
      >
        <IconButton
          size="large"
          aria-label="signup"
          color="inherit"
        >
          <HowToRegIcon />
        </IconButton>
        <p>Sign Up</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      { user ? ([
      <MenuItem key="my-account" onClick={() => handleMobileMenuClose(() => navigate("/main/mybabies"))}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="logged-in-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ChildCareIcon />
        </IconButton>
        <p>My Babies</p>
      </MenuItem>,
      <Divider key="divider3"/>,
      <MenuItem key="logout" onClick={handleLogOut}>
        <IconButton
          size="large"
          aria-label="logout"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>

      ]) : ([
      <MenuItem 
        key="login"
        onClick={() => handleMobileMenuClose(() => navigate("/users/login"))}
      >
        <IconButton
          size="small"
          aria-label="login"
          color="inherit"
        >
          <LoginIcon />
        </IconButton>
        Login
      </MenuItem>,
      <Divider key="divider4"/>,
      <MenuItem
        key="register"
        onClick={() => handleMobileMenuClose(() => navigate("/users/signup"))}
      >
        <IconButton
          size="small"
          aria-label="signup"
          color="inherit"
        >
          <HowToRegIcon />
        </IconButton>
        Sign Up
      </MenuItem>

      ])}
    </Menu>
  );

  return (
    <Container maxWidth="xl" disableGutters>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          { user ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <Link to={user ? "/main" : "/"}>
          <img src="/images/logo_nav.png" height="65" alt="BabyBuddy Logo"/>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={loggedInMenuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle fontSize="large"/>
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-controls={loginMenuId}
                  aria-haspopup="true"
                  onClick={handleLoginMenuOpen}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              </>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderLoginMenu}
      {renderLoggedInMenu}
      <NavBarDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </Box>
    </Container>
  );
}