import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import { User, Price } from "../index";
import * as React from "react";

export interface ProductDetailProps {
  img: string;
  title: string;
  price: string;
  owner: string;
  details: string;
  onClick: () => void;
}

class ProductDetail extends React.PureComponent<ProductDetailProps, any> {
  render() {
    return (
      <View style={styles.productDetail}>
        <View style={styles.image}>
          <Image
            style={styles.productImg}
            source={{ uri: this.props.img }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productBrief}>
          <View style={styles.left}>
            <Text>{this.props.title}</Text>
          </View>
          <View style={styles.left}>
            <Price price={this.props.price} />
            <User name={this.props.owner} />
          </View>
        </View>
      </View>
    )
  }
}
export default ProductDetail

const styles = StyleSheet.create({
  productDetail: {
    marginTop: 20,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  image: {
    flex: 0.4,
    marginLeft: 30,
  },
  productBrief: {
    flex: 0.5,
  },
  productImg: {
    height: 100,
    width: 100,
  },
  left: {
    flex: 1,
    marginLeft: '10%',
  },
}
)