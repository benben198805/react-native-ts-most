import * as React from 'react'
import { StyleSheet, View, Image, TextInput, ScrollView, Text } from 'react-native';
import { connect, DispatchProp } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { Button } from 'react-native-elements';


import * as D from '../../definitions';
import { userRegister } from '../../modules/user/actions';

interface HomePageProps extends DispatchProp<void> {
  products: D.Product[];
  userRegister: typeof userRegister;
  navigate: typeof NavigationActions.navigate;
}

interface IStateProps {
  username: string,
  password: string,
  confirm: string,
  errorText: string,
}

class HomeScreen extends React.PureComponent<HomePageProps, IStateProps> {
  static navigationOptions = {
    title: '注册',
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirm: '',
      errorText: '',
    }
  }

  handleRegister = () => {
    this.setState({ errorText: '' })
    if (this.state.confirm !== this.state.password) {
      this.setState({ errorText: '两次密码输入不一致' })
    } else {
      const params = {
        username: this.state.username,
        password: this.state.password,
      }
      this.props.userRegister(params);
    }
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        centerContent
      >
        <View style={styles.avator}>
          <Image
            style={styles.image}
            source={require('./avator.png')}
            resizeMode="contain"
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='用户名'
            onChangeText={(username) => this.setState({ username })}
          />
          <TextInput
            style={styles.input}
            placeholder='密码'
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
          <TextInput
            style={styles.input}
            placeholder='确认密码'
            secureTextEntry={true}
            onChangeText={(confirm) => this.setState({ confirm })}
          />
          {!!this.state.errorText && (<Text style={styles.error}>
            {this.state.errorText}
          </Text>)}
          <Button
            buttonStyle={styles.button}
            title="注册"
            onPress={this.handleRegister}
          />
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avator: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    flex: 0.6,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 150,
    height: 150,
  },
  input: {
    width: '100%',
    marginBottom: '10%',
    borderBottomColor: '#979797',
    borderBottomWidth: 1,
  },
  error: {
    color: '#F11',
    fontSize: 12,
  },
  button: {
    width: '100%',
  }
})

function mapStateToProps(state: D.RootState) {
  return {
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    userRegister: (params) => dispatch(userRegister(params)),
    navigate: (params) => dispatch(NavigationActions.navigate(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)