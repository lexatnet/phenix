import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { routerActions } from 'react-router-redux';
import {reduxForm} from 'redux-form';
import {get} from 'lodash';
import bem from 'utility/BEM.js';
import style from './style.scss';
import styleMap from './style.scss.json';
import {logoutFormSubmit} from 'actions/form';

const b = bem('logout-form');


export class LogoutForm extends Component {

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

    const eSubmit = b.e('submit');
    return (
      <div className={b}>
        <form onSubmit={this.getSubmitHandler()}>
            <button
              className={eSubmit}
              type="submit"
              disabled={submitting}>
            {'Logout'}
            </button>
          </form>
      </div>
    );
  }
}

LogoutForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  csrf: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    csrf: get(state, 'csrf.value')
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return bindActionCreators(
    {
      onSubmit: logoutFormSubmit,
      ...routerActions
    },
    dispatch
  );
}

const connectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutForm);

export default reduxForm(
  {
    form: 'login'
  }
)(connectedLoginForm);
