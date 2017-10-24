import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bem from 'utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import MainMenu from 'components/MainMenu/MainMenu.js';

const b = bem('page');

export default class Page extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.constructor.name, 'render()', this.props, style);

    return (
      <div
        className={styleMap[b]}
        >
        <div
          className={styleMap[b.e('main-menu')]}
          >
          <MainMenu />
        </div>
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {};
