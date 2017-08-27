import React, { ComponentType } from 'react';
import { connect, DispatchProp } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { View } from "react-native";

import * as D from '../../definitions'
import { isEqual, includes } from 'lodash'

export type AuthProps<S> = DispatchProp<S> & {
  user: D.User,
  app: D.App,
  nav: any,
  navigate: typeof NavigationActions.navigate,
}

export function requireAuthentication(Component: ComponentType): ComponentType {

  class AuthenticatedComponent extends React.Component<AuthProps<object>, object>{
    // componentWillMount() {
    //   this.goToLoginPage();
    // }
    componentWillReceiveProps(nextProps) {
      const nextRouterIndex = this.getRouterTabIndex(nextProps.nav)
      const authRouterIndexs = [1, 2]
      if (!this.isStatePropsSame(nextProps)
        && !nextProps.user.username
        && nextProps.nav.routes[nextRouterIndex].routes.length <= 2
        && this.props.nav.index == 0
        && includes(authRouterIndexs, nextRouterIndex)) {
        this.goToLoginPage();
      };
    }
    isStatePropsSame(nextProps) {
      return isEqual(this.props.nav, nextProps.nav)
        && isEqual(this.props.user, nextProps.user)
        && isEqual(this.props.app, nextProps.app);
    }
    getRouterTabIndex(routerProps) {
      return routerProps.index;
    }
    goToLoginPage() {
      this.props.navigate({
        routeName: 'Login',
      })
    }
    render() {
      if (this.props.user.username != '') {
        return <Component {...this.props} />;
      } else {
        return (<View></View>);
      }
    }
  }
  const mapStateToProps = (state, props) => ({
    user: state.user,
    app: state.app,
    nav: state.nav,
  });

  function mapDispatchToProps(dispatch: (actions: {}) => void) {
    return {
      navigate: (params) => dispatch(NavigationActions.navigate(params)),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
}
