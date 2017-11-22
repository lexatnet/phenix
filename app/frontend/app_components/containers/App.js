import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { routerActions } from 'react-router-redux';
import io from 'socket.io-client';
let socket = io('http://localhost:3000', { path: '/app/socket.io' });
import { getCSRFToken, getCurrentUser } from 'actions/api';
import {get} from 'lodash'

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props;
    const classes = classnames('app');

    const CHILD_FROM_ROUTE = React.Children.map(
      this.props.children,
      (child) => React.cloneElement(
        child,
        {
          ...this.props
        },
        child.props.children)
    );

    return (
      <div className={classes}>
          {CHILD_FROM_ROUTE}
      </div>
    );
  }

  componentWillUpdate(nextProps) {
    const {
      push,
      redirect
    } = nextProps;

    console.log('App.componentWillUpdate()',this.props, nextProps);

    if (this._redirect != redirect) {
      push(redirect);
      this._redirect = redirect;
    }
  }

  componentWillMount() { }

  componentDidMount() {
    this.props.getCSRFToken();
    this.props.getCurrentUser();
    socket.emit('client:sendMessage', { bla: 'bla' });
  }
}

App.propTypes = {
  getCSRFToken: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  push: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    redirect: get(state, 'app.redirect')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({
    getCSRFToken,
    getCurrentUser
  }, routerActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
