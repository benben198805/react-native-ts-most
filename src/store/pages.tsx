import * as React from 'react'
import { StackNavigator } from "react-navigation";
import HomeScreen from '../containers/pages/HomeScreen'
import ProductDetailModal from '../containers/pages/ProductDetailModal'
import RegisterModal from '../containers/pages/RegisterModal'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import COLOR from '../constant/color';

const ModalStackOptions = ({ navigation }) => {
  let { goBack } = navigation;
  const headerLeft = (
    <TouchableOpacity
      onPress={() => { goBack() }}
    >
      <Ionicons
        name={'ios-close'}
        size={34}
        style={{ color: COLOR.BLACK, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
  const tabBarVisible = false
  return { headerLeft, tabBarVisible }
};

const homePages = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: {
    screen: ProductDetailModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  },
  Register: {
    screen: RegisterModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  }
}, {
    mode: 'modal',
  });

export {
  homePages,
  ModalStackOptions
}