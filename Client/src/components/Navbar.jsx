import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Input } from 'antd';
import '../styles/NavBar.css';

const { Search } = Input;

const Navbar = ({ isAuthenticated, onLogout, onSearch }) => {
  return (
    <Menu mode="horizontal" className="custom-navbar">
    <Menu.Item key="logo" className='menu-item logo-item' style={{ margin: '0 auto 0 20px' }}>
        <img src="/images/logo.svg" alt="Logo" className="navbar-logo" />
      </Menu.Item>
      <Menu.Item key="home" className='menu-item'>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="favourites" className='menu-item'>
        <Link to="/favourites">Favourites</Link>
      </Menu.Item>

      

      {!isAuthenticated ? (
        <>
          <Menu.Item key="login" className='menu-item'>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="register" className='menu-item'>
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="logout" onClick={onLogout} className='menu-item'>
          Logout
        </Menu.Item>
      )}

      <Menu.Item key="search" style={{ marginLeft: 'auto' }}>
        <Search
          className='search-bar'
          placeholder="Search for books..."
          onSearch={(value) => {
            console.log('Search triggered with:', value); // Debug
            onSearch(value);
          }}
          enterButton
        />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;