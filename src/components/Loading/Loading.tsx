
import * as React from "react";
import { StyleSheet, View, ActivityIndicator, ViewStyle, Dimensions } from 'react-native';

import COLOR from '../../constant/color';
import * as D from '../../definitions';
import { connect } from 'react-redux';

interface LoadingProps {
  loading: boolean;
}

class Loading extends React.PureComponent<LoadingProps, any> {
  render() {
    return (
      this.props.loading && <View
        style={styles.loading}
      >
        <View style={styles.loadingContent}>
          <ActivityIndicator
            color={COLOR.WHITE}
            style={[{ transform: [{ scale: 1.5 }] }] as ViewStyle}
            size="large"
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  loadingContent: {
    alignItems: 'center',
    backgroundColor: COLOR.BLACK,
    borderRadius: 5,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    opacity: 0.85,
    width: Dimensions.get('window').width,
  },
})


const mapStateToProps = (state: D.RootState) => ({
  loading: state.app.loading,
})

export default connect(mapStateToProps, {})(Loading)