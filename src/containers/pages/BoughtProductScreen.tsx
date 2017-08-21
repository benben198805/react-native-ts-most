import * as React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect, DispatchProp } from 'react-redux';
import { NavigationActions } from 'react-navigation'


import * as D from '../../definitions';
import { Product } from '../../components';
import COLOR from '../../constant/color';
import { getBoughtProduct } from '../../modules/product/actions';

interface BoughtProductPageProps extends DispatchProp<void> {
  boughtProducts: D.Product[];
  user: D.User;
  getBoughtProduct: typeof getBoughtProduct;
  navigate: typeof NavigationActions.navigate;
}

class BoughtProductScreen extends React.PureComponent<BoughtProductPageProps, any> {
  static navigationOptions = {
    title: '已买宝贝',
  }
  componentDidMount() {
    this.props.getBoughtProduct(this.props.user);
  }

  handlePressCell = (item: D.Product) => () => {
    const { objectId } = item;
    this.props.navigate({
      routeName: 'Detail',
      params: { 
        objectId,
       },
    })
  }

  keyExtractor = (item: D.Product) => item.objectId

  renderItem = ({ item, index }: { item: D.Product, index: number }) => {
    return (
      <Product
        img={item.img}
        title={item.name}
        price={item.price}
        owner={item.owner.username}
        details={item.description}
        onClick={this.handlePressCell(item)}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.boughtProducts}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  text: {
    flex: 1,
    color: COLOR.BLACK
  }
})

function mapStateToProps(state: D.RootState) {
  return {
    user: state.user,
    boughtProducts: state.product.boughtProducts,
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    getBoughtProduct: (params) => dispatch(getBoughtProduct(params)),
    navigate: (params) => dispatch(NavigationActions.navigate(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoughtProductScreen)