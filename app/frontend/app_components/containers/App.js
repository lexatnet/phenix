import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { routerActions } from 'react-router-redux';
import io from 'socket.io-client';
let socket = io('http://localhost:3000', { path:'/app/socket.io' });
import { getCSRFToken } from 'actions/api'


class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {} = this.props;
    const classes = classnames('show');

    const CHILD_FROM_ROUTE = React.Children.map(
      this.props.children,
      child => React.cloneElement(child, { ...this.props }, child.props.children)
    );

    return (
      <div className={classes}>
          {CHILD_FROM_ROUTE}
      </div>
    );
  }

  componentWillMount() { }

  componentDidMount() {
    console.log(this.constructor.name, 'componentDidMount()');
    this.props.getCSRFToken();
    socket.emit('client:sendMessage', { bla: 'bla' });
  }
}

App.propTypes = {
  user:PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  let team =  ownProps.params.team || state.team;
  return {
    user:  state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({
    getCSRFToken
  }, routerActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
