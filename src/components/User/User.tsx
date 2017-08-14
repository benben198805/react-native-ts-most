import { View, StyleSheet, Text, Image } from 'react-native';
import * as React from "react";

interface UserProps {
    name: string;
}

class User extends React.PureComponent<UserProps, any>{
    render() {
        return (
            <View style={styles.user}>
                <Image
                    style={styles.img}
                    source={require('./user.png') }
                    resizeMode="contain"
                />
                <Text style={styles.text}>{this.props.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    user: {
        flex: 1,
        flexDirection: 'row',
        height: 30,
    },
    img: {
        width: 25,
        height: 25,
    },
    text: {
        lineHeight: 25,
        color: 'darkgray',
    }
})

export default User