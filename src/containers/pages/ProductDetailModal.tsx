import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { connect, DispatchProp } from 'react-redux';
import { find, get } from 'lodash'

import * as D from '../../definitions';
import { buyHomeProduct } from '../../modules/home/actions';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import COLOR from '../../constant/color';

interface ProductDetailProps extends DispatchProp<void> {
  products: D.Product[];
  buyHomeProduct: typeof buyHomeProduct;
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
      this.state = {
        product: find(props.products, { 'objectId': objectId })
      }
    }
  }

  handlePressCell = (objectId: string) => () => {
    this.props.buyHomeProduct({ objectId })
  }

  render() {
    const { objectId } = this.state.product
    return (
      <View style={styles.container}>
        {this.state.product && (<ProductDetail
          product={this.state.product}
          onClick={this.handlePressCell(objectId)}
        />)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
})

function mapStateToProps(state: D.RootState) {
  return {
    products: state.home.products,
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    buyHomeProduct: ({ objectId }) => dispatch(buyHomeProduct({ objectId })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailModal)