import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import COLOR from '../../constant/color';

class OthersScreen extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Others Screen!</Text>
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.dispatch(NavigationActions.navigate({ routeName: 'home' }))
          }}
        />
        <Button
          title="go back"
          onPress={() => {
            this.props.dispatch(NavigationActions.back())
          }}
        />
        <Button
            title="go login"
            onPress={() => {
              this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
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

export default connect()(OthersScreen)