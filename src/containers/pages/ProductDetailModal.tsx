import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux';
import { find, get } from 'lodash'

import * as D from '../../definitions';
import { getHomeProducts } from '../../modules/home/actions';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

interface ProductDetailProps extends DispatchProp<void> {
  products: D.Product[];
  getHomeProducts: typeof getHomeProducts;
}

interface IOwnState {
  product: D.Product | null
}

class ProductDetailModal extends React.PureComponent<ProductDetailProps, IOwnState> {
  static navigationOptions = {
    title: '商品详情',
  }

  constructor(props) {
    super(props);

    const { params } = props.navigation.state;
    const objectId = get(params, 'objectId')
    if (objectId) {
      console.log('objectId', objectId)
      console.log('products', props.products)
      this.state = {
        product: find(props.products, { 'objectId': objectId })
      }
      console.log(this.state.product)
    }
  }

  handlePressCell = () => {
    console.log(123123)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.product && (<ProductDetail
          product={this.state.product}
          onClick={this.handlePressCell}
        />)}
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
    products: state.home.products,
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    getHomeProducts: () => dispatch(getHomeProducts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailModal)