import * as React from 'react'
import { StyleSheet, View, FlatList} from 'react-native'
import { connect, DispatchProp } from 'react-redux';
import { Button } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'


import * as D from '../../definitions';
import { getHomeProducts } from '../../modules/home/actions';
import { Product } from '../../components';

interface HomePageProps extends DispatchProp<void> {
  products: D.Product[];
  getHomeProducts: typeof getHomeProducts;
}

class HomeScreen extends React.PureComponent<HomePageProps, any> {
  static navigationOptions = {
    title: '精选',
  }
  componentDidMount() {
    this.props.getHomeProducts();
  }

  handlePressCell = (item: D.Product) => () => {
    console.log(123123, item)
  }

  keyExtractor = (item: D.Product) => item.objectId

  renderItem = ({ item, index }: { item: D.Product, index: number }) => {
    console.log(item)
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
        <Button
          title="Go to Others"
          onPress={() => {
            this.props.dispatch(NavigationActions.navigate({ routeName: 'others' }))
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#000'
  }
})

function mapStateToProps(state: D.RootState) {
  console.log(state)
  return {
    products: state.home.products,
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    getHomeProducts: () => dispatch(getHomeProducts()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)