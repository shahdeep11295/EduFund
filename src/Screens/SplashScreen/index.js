import React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Image, StatusBar, Animated } from 'react-native';
import { scale, moderateScale, verticalScale } from '../../components/Scale';
import AsyncStorage from '@react-native-community/async-storage';

class ImageLoader extends React.Component {
    state = {
        opacity: new Animated.Value(0),
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }

    render() {
        return (
            <Animated.Image
                onLoad={this.onLoad}
                {...this.props}
                style={[
                    {
                        opacity: this.state.opacity,
                        transform: [
                            {
                                scale: this.state.opacity.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.85, 1],
                                })
                            }
                        ]
                    },
                    this.props.style,
                ]}
            />
        )
    }
}

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        console.log("start");
        const logged = await AsyncStorage.getItem('logged');
        console.log("logged",logged);
        
        setTimeout(() => {
            console.log("splash_Screen");
            this.props.navigation.navigate(logged !== '1' ? 'UserStack' : 'HomeStack');
        }, 5000);
    }

    render() {
        return (
                <View style={styles.container}>
                    <ImageLoader
                        style={{ width: scale(298), height: scale(200), marginBottom: "70%" }}
                        source={require("../../assets/logo.jpg")}
                        resizeMode="cover"
                    />
                    <View style={{ alignItems: "center", marginBottom: "10%" }}>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={{ fontSize: scale(14), color: '#707070', fontFamily: "Roboto-Regular" }}>Powered By</Text>
                        </View>
                        <Text style={{ color: "#707070", fontSize: scale(14), fontFamily: "Roboto-Regular", marginTop: verticalScale(8) }}>Version 1.0</Text>
                    </View>

                </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
})

export default SplashScreen;