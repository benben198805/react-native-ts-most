import * as React from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'

import { connect, DispatchProp } from 'react-redux'
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { userLogout } from '../../modules/user/actions';

import * as D from '../../definitions'
import COLOR from '../../constant/color';

export type ProfileProps<S> = DispatchProp<S> & {
  user: D.User
}

class ProfileScreen extends React.Component<ProfileProps<object>, object> {
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.avatar}>
              <Image style={styles.avatarImage} source={require('../../../assets/16pic_3491556_b.png')} />
              <Text style={styles.avatarName}>{this.props.user.username ? `${this.props.user.username}` : '未登录'} !</Text>
          </View>
          <Button
              buttonStyle={styles.button}
              title="已买宝贝"
              onPress={() => {
                  this.props.dispatch(NavigationActions.navigate({ routeName: 'BoughtProduct' }))
              }}
          />
        <Button
            buttonStyle={styles.button}
          title="出售宝贝"
          onPress={() => {
            this.props.dispatch(NavigationActions.navigate({ routeName: 'OwnProduct' }))
          }}
        />
        <Button
            buttonStyle={styles.button}
          title="退出登录"
          onPress={() => {
            this.props.dispatch(userLogout(this.props.user.sessionToken));
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
    avatar:{
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20,
        marginBottom:10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarImage:{
      flex:1,
      width:100, height:100
    },
    avatarName:{
        flex:1
    },
    button:{
      width:"80%",
        height:30,
        marginBottom:20,
        backgroundColor:"#FAE05E"
    }
})

export default connect(
  state => ({
    user: state.user,
  })
)(ProfileScreen)