import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bem from 'utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import classNames from 'classnames';

const b = bem('main-menu');

export default class MainMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.constructor.name, 'render()', this.props, style, b, styleMap[b]);
    const navClasses = classNames(
      styleMap[b.e('nav')],
      'navbar-nav'
    );
    const navbarClasses = classNames(
      styleMap[b.e('navbar')],
      'navbar',
      'navbar-expand-lg',
      'navbar-dark',
      'bg-dark'
    );
    const navItemClasses = classNames(
      styleMap[b.e('item')],
      'nav-item'
    );

    return (
      <div className={classNames(styleMap[b])}>
        <nav className={navbarClasses}>
          <a class="navbar-brand" href="#">App</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
            >
            <ul
              className={navClasses}
              >
              <li
                className={navItemClasses}
                >
                <NavLink class="nav-link" to="/">home</NavLink>
              </li>
              <li
                className={navItemClasses}
                >
                <NavLink class="nav-link" to="/login">login</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

MainMenu.propTypes = {};
