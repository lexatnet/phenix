import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'connected-react-router';
import bem from 'utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import classNames from 'classnames';
import LogoutForm from 'components/LogoutForm/LogoutForm';
import {get} from 'lodash';

const b = bem('main-menu');

export class MainMenu extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.constructor.name, 'render()', this.props, style, b, styleMap[b]);

    const {
      user
    } = this.props;

    const isLoggedIn = (get(user, 'id')) ? (true) : (false);
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
          <a className="navbar-brand" href="#">App</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            >
            <ul
              className={navClasses}
              >
              <li
                className={navItemClasses}
                >
                <NavLink className="nav-link" to="/">home</NavLink>
              </li>
              {isLoggedIn ? (
                <li
                  className={navItemClasses}
                  >
                  <LogoutForm />
                </li>
              ):(
                <li
                  className={navItemClasses}
                  >
                  <NavLink className="nav-link" to="/login">login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

MainMenu.propTypes = {
  user: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
  return {
    user: get(state, 'user')
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      ...routerActions
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainMenu);


