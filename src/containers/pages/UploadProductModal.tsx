import * as React from 'react'
import { StyleSheet, View, Image, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { connect, DispatchProp } from 'react-redux';
import { NavigationActions } from 'react-navigation'
import { ImagePicker } from 'expo';

import * as D from '../../definitions';
import COLOR from '../../constant/color';
import { Input, Button, Textarea } from "../../components/index";
import { uploadProduct } from "../../modules/product/actions";

interface UploadProductProps extends DispatchProp<void> {
  uploadProduct: typeof uploadProduct;
  navigate: typeof NavigationActions.navigate;
}

interface IStateProps {
  name: string,
  price: string,
  description: string,
  img: string,
}

class UploadProductModal extends React.PureComponent<UploadProductProps, IStateProps> {
  static navigationOptions = {
    title: '发布宝贝',
  }

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: '',
      img: '',
    }
  }


  handleOpenPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.cancelled) {
      this.setState({ img: result.uri });
    }
  };

  handleUploadProduct = () => {
    this.props.uploadProduct(this.state)
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        centerContent
      >
        <TouchableHighlight style={styles.avator} onPress={this.handleOpenPicker}>
          {
            !this.state.img
              ? (<Image
                style={styles.image}
                source={require('../../../assets/arrow_up_upload.png')}
                resizeMode="contain"
              />) :
              (<Image
                style={styles.uploadImage}
                source={{uri: this.state.img}}
                resizeMode="contain"
              />)
          }
        </TouchableHighlight>
        <View style={styles.form}>
          <Input
            inputStyle={styles.input}
            placeholder='商品名称'
            onChange={(name) => this.setState({ name })}
          />
          <Input
            inputStyle={styles.input}
            placeholder='价格￥'
            onChange={(price) => this.setState({ price })}
          />
          <Textarea
            textareaStyle={styles.textarea}
            placeholder='添加描述...'
            onChange={(description) => this.setState({ description })}
          />
          <Button
            onPress={this.handleUploadProduct}
            text='开始出售'
          />
        </View>
      </ScrollView>
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
  avator: {
    flex: 0.3,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.GREY,
    marginBottom: '10%',
  },
  form: {
    flex: 0.7,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  uploadImage: {
    width: '100%',
    height: 150,
  },
  image: {
    width: 150,
    height: 150,
  },
  input: {
    marginBottom: '10%',
  },
  textarea: {
    marginBottom: '10%',
    height: 100,
  },
  error: {
    color: COLOR.ERROR,
    fontSize: 12,
  },
})

function mapStateToProps(state: D.RootState) {
  return {
  };
}

function mapDispatchToProps(dispatch: (actions: {}) => void) {
  return {
    uploadProduct: (params) => dispatch(uploadProduct(params)),
    navigate: (params) => dispatch(NavigationActions.navigate(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadProductModal)