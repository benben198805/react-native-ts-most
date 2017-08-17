import { View, StyleSheet, Text, TextStyle } from 'react-native';
import * as React from "react";

interface PriceProps {
  price: string;
}

class Price extends React.PureComponent<PriceProps, any> {
  render() {
    return (
      <View>
        <Text style={styles.price}>&yen; {this.props.price}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  price: {
    height: 30,
    textAlign: 'left',
    color: '#e1a536',
    paddingLeft: 5,
  } as TextStyle
})

export default Price