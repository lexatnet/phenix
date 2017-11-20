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

export const fields = ['csrf', 'login', 'password', 'error'];

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

  render() {
    const {
      fields: {
        csrf,
        login,
        password,
        error
      },
      handleSubmit,
      onSubmit,
      submitting
    } = this.props;

    const field = b.e('field');
    const fieldLabel = b.e('field-label');
    const eCSRF = b.e('csrf');
    const eLogin = b.e('login');
    const ePassword = b.e('password');
    return (
      <div className={b}>
        <h4 className={b.e('title')}>{'Login'}</h4>
        {(true) && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*{error.value && <div className={b.e('errors')}>{error.value}</div>}*/}
            <Field
              component="input"
              className={eCSRF}
              type={'hidden'}
              name={'csrf'}
              id={eCSRF}
              value={csrf.value}
              />
            <div className={field}>
              <label className={fieldLabel} htmlFor={eLogin}>{'Login'}</label>
              {eLogin.touched && eLogin.error && <div className={b.e('errors')}>{eLogin.error}</div>}
              <Field
                component="input"
                className={eLogin}
                type={'text'}
                name={'login'}
                id={eLogin}
                placeholder={'login'}
                {...login}/>
            </div>
            <div className={field}>
              <label className={fieldLabel} htmlFor={ePassword}>{'Password'}</label>
              {ePassword.touched && ePassword.error && <div className={b.e('errors')}>{ePassword.error}</div>}
              <Field
                component="input"
                className={ePassword}
                type="password"
                name={'password'}
                id={ePassword}
                {...password}/>
            </div>
            <button
              className={b.e('submit')}
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
  fields: PropTypes.object.isRequired, // TODO: Specify structure
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    fields: {
      csrf: {
        value: get(state, 'form.login.csrf.value')
      }
    }
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
    fields,
    validate,
  }
)(connectedLoginForm);
