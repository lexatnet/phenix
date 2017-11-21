import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { routerActions } from 'react-router-redux';
import {Field, reduxForm} from 'redux-form';
import {get} from 'lodash';
import bem from 'utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import {loginFormSubmit} from 'actions/form';

const b = bem('login-form');

const validate = (values) => {
  const errors = {};

  const fieldNamesMap = {
    login: 'Login',
    password: 'Password'
  };

  // Required validation
  for (let field of [
    'login',
    'password',
  ]) {
    if (!values[field]) {
      errors[field] = [fieldNamesMap[field], 'is required.'].join(' ');
    }
  }

  return errors;
};

export class LoginForm extends Component {

  constructor(props) {
    super(props);
  }

  getSubmitHandler() {
    const {
      csrf,
      handleSubmit,
      onSubmit
    } = this.props;
    return handleSubmit((data) => {onSubmit({csrf, ...data})});
  }

  render() {
    const {
      submitting
    } = this.props;

    const field = b.e('field');
    const fieldLabel = b.e('field-label');
    const eLogin = b.e('login');
    const ePassword = b.e('password');
    const eSubmit = b.e('submit');
    const eErrors = b.e('errors');
    return (
      <div className={b}>
        <h4 className={b.e('title')}>{'Login'}</h4>
        {(true) && (
          <form onSubmit={this.getSubmitHandler()}>
            {/*{error.value && <div className={eErrors}>{error.value}</div>}*/}
            <div className={field}>
              <label className={fieldLabel} htmlFor={eLogin}>{'Login'}</label>
              {eLogin.touched && eLogin.error && <div className={eErrors}>{eLogin.error}</div>}
              <Field
                component="input"
                className={eLogin}
                type={'text'}
                name={'login'}
                id={eLogin}
                placeholder={'login'}/>
            </div>
            <div className={field}>
              <label className={fieldLabel} htmlFor={ePassword}>{'Password'}</label>
              {ePassword.touched && ePassword.error && <div className={eErrors}>{ePassword.error}</div>}
              <Field
                component="input"
                className={ePassword}
                type="password"
                name={'password'}
                id={ePassword}/>
            </div>
            <button
              className={eSubmit}
              type="submit"
              disabled={submitting}>
            {'Submit'}
            </button>
          </form>
        )}
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  csrf: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    csrf: get(state, 'form.login.csrf.value')
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      onSubmit: loginFormSubmit,
      ...routerActions
    },
    dispatch
  );
}

const connectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default reduxForm(
  {
    form: 'login',
    validate,
  }
)(connectedLoginForm);
