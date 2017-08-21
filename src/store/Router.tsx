import * as React from 'react'
import {
  NavigationActions,
  TabNavigator,
} from 'react-navigation'
import { Image, StyleSheet } from 'react-native';


import OthersScreen from '../containers/pages/OthersScreen'
import ProfileScreen from '../containers/pages/ProfileScreen'
import { homePages } from './pages';
import COLOR from '../constant/color';

const Route = TabNavigator({
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
  others: {
    screen: OthersScreen,
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
    screen: ProfileScreen,
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