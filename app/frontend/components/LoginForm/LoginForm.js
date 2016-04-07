import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import bem from '../../utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import {loginFormSubmit} from '../actions/form';

const b = bem('login-form');

export const fields = ['login', 'password',];

const b = bem('bg-share-via-email-form');

const validate = values => {
  const errors = {};

  const fieldNamesMap = {
    from: 'Login',
    to: 'Password',
  };

  // Required validation
  for (let field of['login',
    'password',
    ]) {
    if (!values[field]) {
      errors[field] = [fieldNamesMap[field], 'is required.'].join(' ');
    }
  }
  return errors;
};

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.constructor.name, 'render()', this.props, style);

    const {
      fields: {
				login,
				password,
      },
      handleSubmit,
      submitting,
    } = this.props;

    const field = b.e('field');
    const fieldLabel = b.e('field-label');
    const eLogin = b.e('login');
    const ePassword = b.e('password');
    return (
      <div className={b}>
        <h4 className={b.e('title')}>{(success.value) || 'Share via e-mail'}</h4>
        {(!success.value) && (
          <form onSubmit={handleSubmit}>
            {error.value && <div className={b.e('errors')}>{error.value}</div>}
            <div className={field}>
              <label className={fieldLabel} for={eLogin}>{'Login'}</label>
              {to.touched && to.error && <div className={b.e('errors')}>{to.error}</div>}
              <input
                className={eLogin}
                type={'text'}
                name={eLogin}
                id={eLogin}
                placeholder={'login'}
                {...login}
                />
            </div>
            <div className={field}>
              <label className={fieldLabel} for={ePassword}>{'Password'}</label>
              {from.touched && from.error && <div className={b.e('errors')}>{from.error}</div>}
              <input
                className={ePassword}
                type="password"
                name={ePassword}
                id={ePassword}
                {...from}
              />
            </div>
            <input className={b.e('submit')} type="submit" value={'Send'} disabled={submitting}/>
          </form>
        )}
      </div>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired, // TODO: Specify structure
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    Object.assign(
      {
        onSubmit: loginFormSubmit,
      },
      routerActions
    ),
    dispatch
  );
}

export default reduxForm(
  {
    form: 'shareViaEmailForm',
    fields,
    validate,
  },
  mapStateToProps,
  mapDispatchToProps
)(BGShareViaEmailForm);
