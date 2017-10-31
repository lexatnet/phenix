import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
    return (
      <Page>
        <div
          className={styleMap[b]}
          >
          Home
        </div>
      </Page>
    );
  }
}

HomePage.propTypes = {};
