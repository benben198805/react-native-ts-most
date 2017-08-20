import { StyleSheet, TouchableHighlight, Text } from 'react-native';
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
      <TouchableHighlight
        style={styles.button}
        onPress={props.onPress}
      >
        <Text>{props.text}</Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.YELLOW,
    color: COLOR.BLACK,
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
})

export default Button