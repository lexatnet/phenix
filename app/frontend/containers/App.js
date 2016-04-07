import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { routerActions } from 'react-router-redux'

class App extends Component {

  constructor(props){
    super(props)
  }

  render() {
    const {} = this.props
    const classes = classnames('show')

    const CHILD_FROM_ROUTE = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {...this.props }, child.props.children)
    })

    return (
      <div className={classes}>
          {CHILD_FROM_ROUTE}
      </div>
    )
  }
  componentWillMount() { }

  componentDidMount() {}
}

App.propTypes = {
  user:PropTypes.object.isRequired,
}

function mapStateToProps(state, ownProps) {
  let team =  ownProps.params.team || state.team
  return {
    user:  state.user//TODO: get user info from Methode... I'm doing this
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({ }, routerActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
