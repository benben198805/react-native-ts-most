import * as React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { connect, DispatchProp } from 'react-redux';
import { NavigationActions } from 'react-navigation'


import * as D from '../../definitions';
import { getHomeProducts } from '../../modules/home/actions';
import { Product } from '../../components';
import COLOR from '../../constant/color';

interface HomePageProps extends DispatchProp<void> {
  products: D.Product[];
  getHomeProducts: typeof getHomeProducts;
  navigate: typeof NavigationActions.navigate;
}

class HomeScreen extends React.PureComponent<HomePageProps, any> {
  static navigationOptions = {
    title: '精选',
  }
  componentDidMount() {
    this.props.getHomeProducts();
  }

  handlePressCell = (item: D.Product) => () => {
    const { objectId } = item;
    this.props.navigate({
      routeName: 'Detail',
      params: {
        objectId,
        bePurchased: true,
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
          data={this.props.products}
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
    products: state.home.products,
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    getHomeProducts: () => dispatch(getHomeProducts()),
    navigate: (params) => dispatch(NavigationActions.navigate(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)