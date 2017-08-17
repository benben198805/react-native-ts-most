import { StackNavigator } from "react-navigation";
import HomeScreen from '../containers/pages/HomeScreen'
import ProductDetailModal from '../containers/pages/ProductDetailModal'

const pages = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: ProductDetailModal }
});
export default pages