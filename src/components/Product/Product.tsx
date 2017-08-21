import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';

import { User, Price } from "../index";
import * as React from "react";
import PRODUCT_STATUS from '../../constant/product';
import COLOR from '../../constant/color';


export interface ProductProps {
  img: string;
  title: string;
  price: string;
  owner: string;
  details: string;
  onClick: () => void;
  isShowStatus?: boolean;
  status?: string;
}

class Product extends React.PureComponent<ProductProps, any> {
  render() {
    const isClose = this.props.status === PRODUCT_STATUS.CLOSE
    return (
      <TouchableOpacity style={styles.product} onPress={this.props.onClick}>
        <View style={styles.container}>
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
              {this.props.isShowStatus && (
                <View>
                  <Text>
                    {isClose ? '交易关闭' : '交易中'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View style={this.props.isShowStatus && isClose && styles.mask}></View>
      </TouchableOpacity>
    )
  }
}
export default Product

const styles = StyleSheet.create({
  product: {
    padding: 5,
    marginTop: 5,
    width: Dimensions.get('window').width,
  },
  container: {
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
  mask: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: COLOR.MASK,
    opacity: 0.51,
  }
})