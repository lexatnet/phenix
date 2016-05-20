import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bem from 'utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import Page from 'components/Page/Page';

const b = bem('home-page');

export default class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.constructor.name, 'render()', this.props, style);

    return (
      <Page>
        <div
          className={styleMap[b]}
          >
          <div className={styleMap[b.e('login-form')]}>
            Home
          </div>
        </div>
      </Page>
    );
  }
}

HomePage.propTypes = {};
