import { StyleSheet, TextInput, TextStyle } from 'react-native';
import * as React from "react";
import COLOR from '../../constant/color';

interface InputProps {
  onChange: (param: string) => void;
  placeholder?: string;
  isPass?: boolean;
  inputStyle?: TextStyle;
}

const defaultProps = {
  onChange: () => {},
  placeholder: '',
  isPass: false,
  inputStyle: {},
}

class Input extends React.PureComponent<InputProps, any> {
  render() {
    const props = {
      ...defaultProps,
      ...this.props,
    }

    return (
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholder={props.placeholder}
        secureTextEntry={props.isPass}
        onChangeText={props.onChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomColor: COLOR.GREY,
    borderBottomWidth: 1,
  },
})

export default Input