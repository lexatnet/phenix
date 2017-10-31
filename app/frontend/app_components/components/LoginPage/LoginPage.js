import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import bem from '../../utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import LoginForm from '../LoginForm/LoginForm';
import Page from '../Page/Page';

const b = bem('login-page');

export default class LoginPage extends Component {

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
            <LoginForm />
          </div>
        </div>
      </Page>
    );
  }
}

LoginPage.propTypes = {};
