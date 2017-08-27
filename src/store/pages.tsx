import * as React from 'react'
import { StackNavigator } from "react-navigation";
import HomeScreen from '../containers/pages/HomeScreen'
import ProductDetailModal from '../containers/pages/ProductDetailModal'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import COLOR from '../constant/color';
import RegisterModal from '../containers/pages/RegisterModal';
import LoginModal from "../containers/pages/LoginModal";
import ProfileScreen from '../containers/pages/ProfileScreen';
import UploadProductModal from '../containers/pages/UploadProductModal';
import BoughtProductScreen from '../containers/pages/BoughtProductScreen';
import OwnProductScreen from '../containers/pages/OwnProductScreen';

import { requireAuthentication } from "../containers/utils/AuthenticatedComponent";

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
}, {
    mode: 'modal',
  });


const uploadPages = StackNavigator({
  Upload: { screen: requireAuthentication(UploadProductModal) },
  Login: {
    screen: LoginModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  },
  Register: {
    screen: RegisterModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  }
}, {
    mode: 'modal',
  });


const profilePages = StackNavigator({
  Profile: { screen: requireAuthentication(ProfileScreen) },
  Detail: {
    screen: ProductDetailModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  },
  Login: {
    screen: LoginModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  },
  Register: {
    screen: RegisterModal,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  },
  BoughtProduct: {
    screen: BoughtProductScreen,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  },
  OwnProduct: {
    screen: OwnProductScreen,
    navigationOptions: ({ navigation }) => ModalStackOptions({ navigation }),
  }
}, {
    mode: 'modal',
  });


export {
  homePages,
  uploadPages,
  profilePages,
  ModalStackOptions
}