import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bem from 'utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import MainMenu from 'components/MainMenu/MainMenu.js';
import classNames from 'classnames';

const b = bem('page');

export default class Page extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.constructor.name, 'render()', this.props, style);
    const bClasses = classNames(styleMap[b]);
    return (
      <div
        className={bClasses}
        >
        <div
          className={
            classNames(
              styleMap[b.e('main-menu')],
              'container-fluid'
            )
          }
          >
          <MainMenu />
        </div>
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {};
