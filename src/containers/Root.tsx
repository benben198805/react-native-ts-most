import * as React from 'react'
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
} from 'react-navigation'

import Route from '../store/Router'
import { View, StyleSheet } from 'react-native';
import { Loading } from "../components/index";

const Root = (props) => (
  <View style={styles.container}>
    <Route
      navigation={addNavigationHelpers({
        dispatch: props.dispatch,
        state: props.nav,
      })}
    />
    <Loading />
  </View>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = (state) => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(Root)
