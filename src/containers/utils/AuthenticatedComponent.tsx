import React, {ComponentType} from 'react';
import {connect, DispatchProp} from 'react-redux';
import { NavigationActions } from 'react-navigation'
import {View} from "react-native";
import * as D from '../../definitions'

export type AuthProps<S> = DispatchProp<S> & {
  user: D.User
}

export function requireAuthentication(Component:ComponentType):ComponentType {

  class AuthenticatedComponent extends React.Component<AuthProps<object>, object>{
    componentWillMount() {
      this.checkAuth();
    }
    componentWillUpdate() {
      // TODO There is a bug, not sure can be execute for each render
      this.checkAuth();
    }
    checkAuth() {
      if (this.props.user.username == '') {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'login' }))
      }
    }
    render() {

      if(this.props.user.username != ''){
        return <Component {...this.props}/>;
      }else{
        return (<View></View>);
      }
    }
  }
  const mapStateToProps = (state,props) => ({
    user: state.user
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
