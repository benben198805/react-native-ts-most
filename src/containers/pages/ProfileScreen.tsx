import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { connect, DispatchProp } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'

import * as D from '../../definitions'
import { userLogin } from '../../modules/user/actions'
import COLOR from '../../constant/color';

export type ProfileProps<S> = DispatchProp<S> & {
  user: D.User
}

class ProfileScreen extends React.Component<ProfileProps<object>, object> {
  render() {
    return (
      <View style={styles.container}>
         <Button
          title="Login"
          onPress={() => this.props.dispatch(userLogin({
              username: 'admin',
              password: 'admin',
            }))
          }
        />
        <Text>Profile .... {this.props.user.name ? `This is ${this.props.user.name}` : null} !</Text>
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.dispatch(NavigationActions.navigate({ routeName: 'home' }))
          }}
        />
        <Button
          title="Go Back"
          onPress={() => {
            this.props.dispatch(NavigationActions.back())
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default connect(
  state => ({
    user: state.user,
  })
)(ProfileScreen)