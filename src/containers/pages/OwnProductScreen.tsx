import * as React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect, DispatchProp } from 'react-redux';
import { NavigationActions } from 'react-navigation'


import * as D from '../../definitions';
import { Product } from '../../components';
import COLOR from '../../constant/color';
import { getOwnProduct } from '../../modules/product/actions';

interface OwnProductPageProps extends DispatchProp<void> {
  ownProducts: D.Product[];
  user: D.User;
  getOwnProduct: typeof getOwnProduct;
  navigate: typeof NavigationActions.navigate;
}

class OwnProductScreen extends React.PureComponent<OwnProductPageProps, any> {
  static navigationOptions = {
    title: '已买宝贝',
  }
  componentDidMount() {
    this.props.getOwnProduct(this.props.user);
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
        onClick={()=>{}}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.ownProducts}
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
    ownProducts: state.product.ownProducts,
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    getOwnProduct: (params) => dispatch(getOwnProduct(params)),
    navigate: (params) => dispatch(NavigationActions.navigate(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProductScreen)