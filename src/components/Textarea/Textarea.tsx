import { StyleSheet, TextInput, TextStyle } from 'react-native';
import * as React from "react";
import COLOR from '../../constant/color';

interface TextareaProps {
  onChange: (param: string) => void;
  placeholder?: string;
  isPass?: boolean;
  textareaStyle?: TextStyle;
}

const defaultProps = {
  onChange: () => {},
  placeholder: '',
  textareaStyle: {},
}

class Textarea extends React.PureComponent<TextareaProps, any> {
  render() {
    const props = {
      ...defaultProps,
      ...this.props,
    }

    return (
      <TextInput
        style={[styles.input, props.textareaStyle]}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        multiline = {true}
        numberOfLines = {4}
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 30,
    borderColor: COLOR.GREY,
    borderWidth: 1,
  },
})

export default Textarea