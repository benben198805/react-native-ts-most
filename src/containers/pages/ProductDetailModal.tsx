import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux';
import { find } from 'lodash'

import * as D from '../../definitions';
import { getHomeProducts } from '../../modules/home/actions';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

interface ProductDetailProps extends DispatchProp<void> {
  product: D.Product | null;
  getHomeProducts: typeof getHomeProducts;
}

class ProductDetailModal extends React.PureComponent<ProductDetailProps, any> {
  static navigationOptions = {
    title: '商品详情',
  }

  handlePressCell = () => {
    console.log(123123)
  }

  render() {
    return (
      <View style={styles.container}>
        <ProductDetail
          product={this.props.product}
          onClick={this.handlePressCell}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

function mapStateToProps(state: D.RootState) {
  return {
    product: find(state.home.products, 'objectId', state.home.current.objectId),
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    getHomeProducts: () => dispatch(getHomeProducts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailModal)