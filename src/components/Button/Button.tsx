import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as React from "react";
import COLOR from '../../constant/color';

interface ButtonProps {
  onPress: () => void;
  text: string;
}

const defaultProps = {
  onPress: () => { },
  text: '',
}

class Button extends React.PureComponent<ButtonProps, any> {
  render() {
    const props = {
      ...defaultProps,
      ...this.props,
    }

    return (
      <TouchableOpacity
        style={styles.button}
        onPress={props.onPress}
      >
        <Text style={styles.text}>{props.text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.YELLOW,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  text: {
    color: COLOR.BLACK,
  }
})

export default Button