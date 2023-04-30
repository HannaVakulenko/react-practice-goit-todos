import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';

export const Header = ({ title }) => {
  return <header className="HeaderStyled">Todo List</header>;
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
