import * as React from 'react'
import {
  NavigationActions,
  TabNavigator,
} from 'react-navigation'
import { Image, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ProfileScreen from '../containers/pages/ProfileScreen'
import UploadProductModal from '../containers/pages/UploadProductModal'
import { homePages, ModalStackOptions } from './pages';
import COLOR from '../constant/color';
import { requireAuthentication } from "../containers/utils/AuthenticatedComponent";
import RegisterModal from '../containers/pages/RegisterModal'
import LoginModal from "../containers/pages/LoginModal";

const tabRouters = TabNavigator({
  home: {
    screen: homePages,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          style={styles.tabImage}
          resizeMode="center"
          source={require('../../assets/home.png')}
        />
      ),
    },
  },
  create: {
    screen: UploadProductModal,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          style={[styles.tabImage, styles.create]}
          resizeMode="center"
          source={require('../../assets/plus.png')}
        />
      ),
    },
  },
  profile: {
    screen: requireAuthentication(ProfileScreen),
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Image
          style={styles.tabImage}
          resizeMode="center"
          source={require('../../assets/person.png')}
        />
      ),
    },
  },
}, {
    initialRouteName: 'home',
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: COLOR.BLACK,
      activeBackgroundColor: COLOR.WHITE,
      inactiveTintColor: COLOR.BLACK,
      inactiveBackgroundColor: COLOR.YELLOW,
      showLabel: false,
    }
  })

const authModals = StackNavigator({
  Login: {
    screen: LoginModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  },
  Register: {
    screen: RegisterModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  }
})


const Route = StackNavigator({
  Main: {
    screen: tabRouters,
  },
  Auth: {
    screen: authModals,
  },
}, {
    initialRouteName: 'Main',
    headerMode: 'none',
  })


const styles = StyleSheet.create({
  tabImage: {
    height: 34,
    width: 34,
    resizeMode: 'contain',
    position: 'relative',
    top: 2.5,
  },
  create: {
    backgroundColor: COLOR.WHITE,
    borderRadius: 17,
  }
})

const initialRouterAction = NavigationActions.init()

const initialState = Route.router.getStateForAction(initialRouterAction, null)

export const reducer = (state = initialState, action) => {
  let nextState
  // Simply return the original `state` if `nextState` is null or undefined.
  switch (action.type) {

    default:
      nextState = Route.router.getStateForAction(action, state)
  }
  return nextState || state
}

export default Route