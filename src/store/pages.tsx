import { StackNavigator } from "react-navigation";
import HomeScreen from '../containers/pages/HomeScreen'


const pages = StackNavigator({
  Home: { screen: HomeScreen },
});
export default pages