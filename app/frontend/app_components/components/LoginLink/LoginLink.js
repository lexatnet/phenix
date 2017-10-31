import React, { Component, PropTypes } from 'react';
import { NavLink } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bem from 'utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';

const b = bem('main-menu');

export default class MainMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.constructor.name, 'render()', this.props, style, b, styleMap[b]);

    return (
      <div
        className={styleMap[b]}
        >
        {styleMap[b]}
	<NavLink to="/login">login</NavLink>
      </div>
    );
  }
}

MainMenu.propTypes = {};
