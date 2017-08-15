import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

import * as React from "react";

import { User, Price } from "../index";
import * as D from '../../definitions';
import { Button } from 'react-native-elements';


export interface ProductDetailProps {
  product: D.Product;
  onClick: () => void;
}

class ProductDetail extends React.PureComponent<ProductDetailProps, any> {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.productImage}>
          <Image
            style={styles.image}
            source={{ uri: this.props.product.img }}
            resizeMode='contain'
          />
        </View>
        <View style={styles.productBrief}>
          <View style={styles.left}>
            <Text style={styles.productTitle}>{this.props.product.name}</Text>
          </View>
          <View style={styles.left}>
            <Price price={this.props.product.price} />
            <User name={this.props.product.owner.username} />
          </View>
        </View>
        <View style={styles.productDesc}>
          <Text>
            {this.props.product.description}
          </Text>
          <Button title="立即购买" onPress={this.props.onClick} />
        </View>
      </View>
    )
  }
}
export default ProductDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
  },
  productImage: {
    flex: 0.4,
    alignItems: 'center',
  },
  image: {
    width: 225,
    height: 225,
  },
  productBrief: {
    flex: 0.3,
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  left: {
    flex: 0.5,
  },
  productTitle: {
    textAlign: 'left',
    fontSize: 18,
  },
  productDesc: {
    flex: 0.3,
    paddingTop: 20,
    paddingLeft: '10%',
    paddingRight: '10%',
    justifyContent: 'space-around',
  },
}
)