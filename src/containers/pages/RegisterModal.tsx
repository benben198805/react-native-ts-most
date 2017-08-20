import * as React from 'react'
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { connect, DispatchProp } from 'react-redux';
import { NavigationActions } from 'react-navigation'


import * as D from '../../definitions';
import { userRegister } from '../../modules/user/actions';
import COLOR from '../../constant/color';
import { Input, Button } from "../../components/index";

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
          <Input
            inputStyle={styles.input}
            placeholder='用户名'
            onChange={(username) => this.setState({ username })}
          />
          <Input
            inputStyle={styles.input}
            placeholder='密码'
            isPass={true}
            onChange={(password) => this.setState({ password })}
          />
          <Input
            inputStyle={styles.input}
            placeholder='确认密码'
            isPass={true}
            onChange={(confirm) => this.setState({ confirm })}
          />
          {!!this.state.errorText && (<Text style={styles.error}>
            {this.state.errorText}
          </Text>)}
          <Button
            onPress={this.handleRegister}
            text='注册'
          />
        </View>
      </ScrollView>
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
    marginBottom: '10%',
  },
  error: {
    color: COLOR.ERROR,
    fontSize: 12,
  },
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