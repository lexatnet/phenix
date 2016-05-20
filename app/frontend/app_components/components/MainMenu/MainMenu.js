import React, { Component, PropTypes } from 'react';
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
    console.log(this.constructor.name, 'render()', this.props, style);

    return (
      <div
        className={styleMap[b]}
        >
				MainMenu()
			</div>
    );
  }
}

MainMenu.propTypes = {};
